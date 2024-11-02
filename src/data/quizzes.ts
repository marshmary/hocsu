import { addDoc, collection } from "firebase/firestore";
import { db } from "~/utils/firebase/firebase-config";

const collectionName = "quizzes";
const collectionRef = collection(db, collectionName);

export const createQuiz = async (quiz: QuizForm) => {
  const res = await addDoc(collectionRef, quiz);
  return res;
};
