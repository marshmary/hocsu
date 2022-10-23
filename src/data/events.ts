import {
    collection,
    getDocs,
    addDoc,
    query,
    limit,
    orderBy,
    where,
    Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import normalizeText from "normalize-text";
import uuid from "react-uuid";
import { db, storage } from "~/utils/firebase/firebase-config";
import { createTimeline, getTimeline } from "./timelines";

// Get collection
const collectionRef = collection(db, "events");

const emptyFilterResult: AdminFilterResult = {
    totalPages: 0,
    events: [],
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
        q = query(
            q,
            where("from", "<=", Timestamp.fromDate(new Date(filter.to)))
        );
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
            if (
                normalizeText(event.title).includes(
                    normalizeText(filter.title!)
                )
            )
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
    var imageUrls = [];
    if (historyEvent.images) {
        for (const image of historyEvent.images) {
            const imgRef = ref(
                storage,
                `${uuid()}.${image.name.substring(
                    image.name.lastIndexOf(".") + 1,
                    image.name.length
                )}`
            );
            try {
                const snapshot = await uploadBytes(imgRef, image);
                const uploadUrl = await getDownloadURL(snapshot.ref);
                imageUrls.push(uploadUrl);
            } catch {}
        }
    }

    const historyEventUpload: HistoryEventCreate = {
        content: historyEvent.content,
        from: Timestamp.fromDate(new Date(historyEvent.from)),
        images: imageUrls,
        time: `${historyEvent.from} - ${historyEvent.to}`,
        timeline: historyEvent.timeline,
        title: historyEvent.title,
    };

    var existedTimeline = await getTimeline(historyEvent.timeline);
    if (!existedTimeline) {
        createTimeline(historyEvent.timeline);
    }

    // New document
    const res = await addDoc(collectionRef, historyEventUpload);

    return res;
};
