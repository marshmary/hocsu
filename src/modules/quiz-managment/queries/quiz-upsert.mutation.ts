import { useMutation } from "@tanstack/react-query";
import { createQuiz, updateQuiz } from "~/data/quizzes";

export const useQuizUpsertMutation = (isEdit: boolean) => {
  return useMutation({
    mutationKey: ["quiz-upsert"],
    mutationFn: (quiz: QuizForm) => {
      return isEdit ? updateQuiz(quiz) : createQuiz(quiz);
    },
  });
};
