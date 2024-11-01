interface Answer {
  id: string;
  answer: string;
  isCorrect?: boolean;
}

interface QuizForm {
  question: string;
  time: string;
  answers: Answer[];
}
