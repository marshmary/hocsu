import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import normalizeText from "normalize-text";
import { toast } from "react-toastify";
import { db } from "~/utils/firebase/firebase-config";

const collectionName = "quizzes";
const collectionRef = collection(db, collectionName);
const emptyFilterResult: QuizFilterResult = {
  pageCount: 0,
  data: [],
};

export const createQuiz = async (quiz: QuizForm) => {
  const res = await addDoc(collectionRef, {
    ...quiz,
    createdAt: Date.now(),
  });
  return res;
};

export const updateQuiz = async (quiz: QuizForm) => {
  if (!quiz.id) {
    toast.warning("Quiz not found!");
    return null;
  }

  const docRef = doc(db, collectionName, quiz.id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    toast.warning("Quiz not found!");
    return null;
  }

  await updateDoc(docRef, {
    question: quiz.question,
    event: quiz.event,
    answers: quiz.answers,
  });
};

export const deleteQuiz = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    toast.warning("Quiz not found!");
    return;
  }

  await deleteDoc(docRef);
};

export const getQuizzes = async (filter: QuizFilter) => {
  let q = query(collectionRef);

  if (filter.eventId) {
    q = query(q, where("event", "==", filter.eventId));
  }

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return emptyFilterResult;
  }

  let pageCount = Math.ceil(snapshot.size / filter.limit);
  let data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as unknown as Quiz[];

  if (filter.searchKey) {
    data = data.filter((item) =>
      normalizeText(item.question).includes(
        normalizeText(filter.searchKey || "")
      )
    );

    pageCount = Math.ceil(data.length / filter.limit);
  }

  // const eventIds = Array.from(
  //   new Set(data.map((quiz) => quiz.event).filter(Boolean))
  // );
  // const eventsSnapshot = await getDocs(
  //   query(collection(db, "events"), where(documentId(), "in", eventIds))
  // );
  // const eventsMap = eventsSnapshot.docs.reduce((acc, eventDoc) => {
  //   acc[eventDoc.id] = {
  //     ...(eventDoc.data() as HistoryEvent),
  //   };
  //   return acc;
  // }, {} as Record<string, HistoryEvent>);

  // data = data.map((quiz) => ({
  //   ...quiz,
  //   eventObj: quiz.event ? eventsMap[quiz.event] || null : null,
  // }));

  data = data.slice(
    (filter.page - 1) * filter.limit,
    (filter.page - 1) * filter.limit + filter.limit
  );

  return {
    pageCount,
    data,
  };
};
