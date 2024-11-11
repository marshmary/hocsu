interface Answer {
  id: string;
  answer: string;
  isCorrect?: boolean;
}

interface QuizForm {
  id?: string;
  question: string;
  event: string;
  answers: Answer[];
}

interface Quiz extends QuizForm {
  id: string;
  eventObj: HistoryEvent | null;
  eventTitle?: string;
}

interface QuizFilter {
  page: number;
  limit: number;
  searchKey?: string;
  eventId?: string;
}

interface QuizFilterResult {
  pageCount: number;
  data: Quiz[];
}
