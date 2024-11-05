import {
    collection,
    getDocs,
    addDoc,
    query,
    limit,
    orderBy,
    where,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "~/utils/firebase/firebase-config";

// Get collection
const collectionName = "timelines";
const collectionRef = collection(db, collectionName);

export const recommendTimelines: (
    keyword: string
) => Promise<DbTimeline[]> = async (keyword: string) => {
    keyword = keyword.trim();

    var q = query(collectionRef, orderBy("title", "desc"), limit(20));
    if (keyword && keyword !== "") {
        q = query(q, where("title", ">=", keyword));
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    // The return data is freaking urgly, so we have to re-format it to human readable format.
    var timelines = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    })) as DbTimeline[];

    return timelines;
};

export const getTimeline: (value: string) => Promise<TimeLine | null> = async (
    value: string
) => {
    value = value.trim();
    var q = query(collectionRef, where("title", "==", value));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }

    var timelines = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    })) as DbTimeline[];

    return timelines[0].title;
};

export const createTimeline = async (value: string) => {
    console.log("DEBUG: creating timeline...");
    const timelineUpload: TimelineCreate = {
        title: value,
    };

    // New document
    const res = await addDoc(collectionRef, timelineUpload);

    return res;
};

export const listTimelines: () => Promise<TimeLine[]> = async () => {
    const data = await getDocs(collectionRef);

    // Re-format data
    return data.docs
        .map((doc) => doc.data().title)
        .sort((a, b) => Number.parseInt(a) - Number.parseInt(b)) as TimeLine[];
};

export const deleteTimeline = async (value: string) => {
    var q = query(collectionRef, where("title", "==", value));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }

    var timeline = (
        snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })) as DbTimeline[]
    )[0];

    const docRef = doc(db, collectionName, timeline.id);
    await deleteDoc(docRef);
};
