import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "~/data/quizzes";

export const useQuizCreateMutation = () => {
  return useMutation({
    mutationKey: ["quiz-create"],
    mutationFn: (quiz: QuizForm) => {
      return createQuiz(quiz);
    },
  });
};
