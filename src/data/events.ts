import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    query,
    limit,
    startAt,
    orderBy,
    startAfter,
    where,
    Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import normalizeText from "normalize-text";
import { db, storage } from "~/utils/firebase/firebase-config";

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
