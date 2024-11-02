import { useMutation } from "@tanstack/react-query";
import { deleteQuiz } from "~/data/quizzes";

export const useQuizDeleteMutation = () => {
  return useMutation({
    mutationKey: ["quiz-delete"],
    mutationFn: (id: string) => {
      return deleteQuiz(id);
    },
  });
};
