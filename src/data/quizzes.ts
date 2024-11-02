import { addDoc, collection, getDocs, query } from "firebase/firestore";
import normalizeText from "normalize-text";
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

export const getQuizzes = async (filter: QuizFilter) => {
  let q = query(collectionRef);

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return emptyFilterResult;
  }

  let pageCount = Math.ceil(snapshot.size / filter.limit);
  let data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as unknown as QuizForm[];

  if (filter.searchKey) {
    data = data.filter((item) =>
      normalizeText(item.question).includes(
        normalizeText(filter.searchKey || "")
      )
    );

    pageCount = Math.ceil(data.length / filter.limit);
  }

  data = data.slice(
    (filter.page - 1) * filter.limit,
    (filter.page - 1) * filter.limit + filter.limit
  );

  return {
    pageCount,
    data,
  };
};
