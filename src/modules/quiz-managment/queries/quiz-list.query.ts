import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "~/data/quizzes";

export const useQuizListQuery = (filter: QuizFilter) => {
  return useQuery({
    queryKey: ["quiz-list", filter],
    queryFn: () => {
      return getQuizzes(filter);
    },
  });
};
