import { useQuery } from "@tanstack/react-query";
import { listAllHistoryEvents } from "~/data/events";

export const useEventQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return listAllHistoryEvents();
    },
  });
};
