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

interface QuizFilter {
  page: number;
  limit: number;
  searchKey?: string;
}

interface QuizFilterResult {
  pageCount: number;
  data: QuizForm[];
}
