import uuid from "react-uuid";

export const defaultAnswerItem = {
  answer: "",
  id: uuid(),
};
export const defaultAnswerList: Answer[] = [defaultAnswerItem];
export const defaultAnswerName = "answers";
