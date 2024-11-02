interface Answer {
  id: string;
  answer: string;
  isCorrect?: boolean;
}

interface QuizForm {
  question: string;
  event: string;
  answers: Answer[];
}
