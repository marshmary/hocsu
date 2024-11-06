import {
  collection,
  getDocs,
  addDoc,
  query,
  limit,
  orderBy,
  where,
  Timestamp,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import normalizeText from "normalize-text";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { db, storage } from "~/utils/firebase/firebase-config";
import { createTimeline, deleteTimeline, getTimeline } from "./timelines";

// Get collection
const collectionName = "events";
const collectionRef = collection(db, collectionName);

const emptyFilterResult: AdminFilterResult = {
  totalPages: 0,
  events: [],
};

export const listAllHistoryEvents = async () => {
  var q = query(collectionRef, orderBy("from", "desc"), limit(10000));

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return emptyFilterResult;
  }
  var events = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as HistoryEvent[];

  return events;
};

export const getHistoryEvents: (
  filter: AdminPageFilter
) => Promise<AdminFilterResult> = async (filter: AdminPageFilter) => {
  var q = query(collectionRef, orderBy("from", "desc"), limit(10000));

  if (filter.from) {
    q = query(
      q,
      where("from", ">=", Timestamp.fromDate(new Date(filter.from)))
    );
  }
  if (filter.to) {
    q = query(q, where("from", "<=", Timestamp.fromDate(new Date(filter.to))));
  }

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return emptyFilterResult;
  }

  var totalPages = Math.ceil(snapshot.size / filter.limit);
  // The return data is freaking urgly, so we have to re-format it to human readable format.
  var events = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as HistoryEvent[];

  // Firestore does not support multiple range query then we need to do this locally
  if (filter.title) {
    events = events.filter((event) => {
      if (normalizeText(event.title).includes(normalizeText(filter.title!)))
        return event;
    });

    totalPages = Math.ceil(events.length / filter.limit);
  }
  events = events.slice(
    (filter.page - 1) * filter.limit,
    (filter.page - 1) * filter.limit + filter.limit
  );

  return {
    totalPages: totalPages,
    events: events,
  };
};

export const createEvent = async (historyEvent: HistoryEventCreateForm) => {
  // Upload image
  var imageUrls: Image[] = [];
  if (historyEvent.images) {
    for (const image of historyEvent.images) {
      const key = `${uuid()}.${image.rawImage.name.substring(
        image.rawImage.name.lastIndexOf(".") + 1,
        image.rawImage.name.length
      )}`;

      const uploadUrl = await uploadStorageObject(image.rawImage, key);
      if (uploadUrl) {
        imageUrls.push({
          url: uploadUrl,
          key: key,
          source: image.source,
        });
      }
    }
  }

  const historyEventUpload: HistoryEventCreate = {
    content: historyEvent.content,
    from: Timestamp.fromDate(new Date(historyEvent.from)),
    images: imageUrls,
    time: `${historyEvent.from} - ${historyEvent.to}`,
    timeline: new Date(historyEvent.from).getFullYear().toString(),
    title: historyEvent.title,
  };

  var existedTimeline = await getTimeline(historyEventUpload.timeline);
  if (!existedTimeline) {
    createTimeline(historyEventUpload.timeline);
  }

  // New document
  const res = await addDoc(collectionRef, historyEventUpload);

  return res;
  // return;
};

export const deleteEvent = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    toast.warning("Event not found!");
    return;
  }

  var event = snapshot.data() as HistoryEvent;

  if (event.images) {
    for (const image of event.images) {
      await deleteStorageObject(image);
    }
  }

  // Timeline is duplicated in event collection & timeline colelction
  var eventsInTimeline = await listEventsByTimeline(event.timeline);
  if (eventsInTimeline && eventsInTimeline.length === 1) {
    await deleteTimeline(event.timeline);
  }

  await deleteDoc(docRef);
};

export const listEventsByTimeline = async (timeline: string) => {
  const q = query(collectionRef, where("timeline", "==", timeline));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as HistoryEvent[];
};

export const getEventById = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return null;
  }

  var event = snapshot.data() as HistoryEvent;
  return event;
};

export const updateEvent = async (historyEvent: HistoryEventEditForm) => {
  // Upload new images
  var imageUrls: Image[] = [];
  if (historyEvent.imageFiles) {
    for (const image of historyEvent.imageFiles) {
      const key = `${uuid()}.${image.rawImage.name.substring(
        image.rawImage.name.lastIndexOf(".") + 1,
        image.rawImage.name.length
      )}`;

      const uploadUrl = await uploadStorageObject(image.rawImage, key);
      if (uploadUrl) {
        imageUrls.push({
          url: uploadUrl,
          key: key,
          source: image.source,
        });
      }
    }
  }

  // Remove deleted images
  const existedEvent = await getEventById(historyEvent.id);
  if (existedEvent && existedEvent.images.length > 0) {
    var removed: Image[] = [];
    for (const img of existedEvent?.images!) {
      if (
        existedEvent?.images.some((x) => x.key === img.key) &&
        !historyEvent.images.some((x: Image) => x.key === img.key)
      ) {
        removed.push(img);
      }
    }

    for (const img of removed) {
      await deleteStorageObject(img);
    }
  }

  // Update doc
  const docRef = doc(db, collectionName, historyEvent.id);
  const timeline = new Date(historyEvent.from).getFullYear().toString();

  // Add new timeline & remove old timeline if any
  var existedTimeline = await getTimeline(timeline);
  if (!existedTimeline) {
    await createTimeline(timeline);

    // Timeline is duplicated in event collection & timeline colelction
    var eventsInTimeline = await listEventsByTimeline(existedEvent?.timeline!);
    if (eventsInTimeline && eventsInTimeline.length < 2) {
      await deleteTimeline(existedEvent?.timeline!);
    }
  }

  await updateDoc(docRef, {
    content: historyEvent.content,
    from: Timestamp.fromDate(new Date(historyEvent.from)),
    images: [...historyEvent.images, ...imageUrls],
    time: `${historyEvent.from} - ${historyEvent.to}`,
    timeline: timeline,
    title: historyEvent.title,
  });
};

const uploadStorageObject: (
  image: File,
  name: string
) => Promise<string | null> = async (image: File, name: string) => {
  const imgRef = ref(storage, name);
  try {
    const snapshot = await uploadBytes(imgRef, image);
    const uploadUrl = await getDownloadURL(snapshot.ref);
    return uploadUrl;
  } catch {
    return null;
  }
};

const deleteStorageObject = async (img: Image) => {
  const storage = getStorage();
  const desertRef = ref(storage, img.key);

  // Delete the file
  await deleteObject(desertRef);
};
