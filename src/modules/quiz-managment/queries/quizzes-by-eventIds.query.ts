import { useQuery } from "@tanstack/react-query";
import { getQuizzesByEventIds } from "~/data/quizzes";

export const useQuizzesByEventIdsQuery = (eventIds: string[] | null) => {
  return useQuery({
    queryKey: ["quizzes-by-event-ids", eventIds],
    queryFn: () => {
      if (!eventIds?.length) {
        return [];
      }
      return getQuizzesByEventIds(eventIds);
    },
    enabled: !!eventIds?.length,
  });
};
