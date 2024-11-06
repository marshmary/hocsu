import { useMemo } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//@ts-ignore
import Quiz from "react-quiz-component";
import { useQuizzesByEventIdsQuery } from "~/modules/quiz-managment/queries";
import Icon from "../Icon";
import Loading from "../Loading/Loading";
import PageLoadAnimation from "../Loading/PageLoadAnimation";

interface Props {
  events: HistoryEvent[] | null;
}

export const HomeQuiz: React.FC<Props> = ({ events }) => {
  const { data, isFetching } = useQuizzesByEventIdsQuery(
    (events || []).map((each) => each.id)
  );

  const quiz = useMemo(
    () => ({
      nrOfQuestions: data?.length,
      questions: (data || []).map((each) => {
        let correctAnswer: number[] | string = each.answers
          .map((answer, index) => (answer.isCorrect ? index + 1 : -1))
          .filter((index) => index !== -1);

        if (correctAnswer.length === 1) {
          correctAnswer = `${correctAnswer.pop()}`;
        }

        return {
          question: each.question,
          questionType: "text",
          answerSelectionType:
            typeof correctAnswer === "string" ? "single" : "multiple",
          answers: each.answers.map((a) => a.answer),
          correctAnswer,
          point: "10",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
        };
      }),
    }),
    [data]
  );

  return (
    <div className="overflow-y-auto w-full h-full flex justify-center">
      <div className="w-full flex justify-center my-auto">
        {isFetching ? (
          <Loading />
        ) : !!data?.length ? (
          <PageLoadAnimation>
            <Quiz quiz={quiz} />
          </PageLoadAnimation>
        ) : (
          <PageLoadAnimation>
            <span>
              <Icon icon={faInfoCircle} className="text-sky-600" /> There is no
              quiz available!
            </span>
          </PageLoadAnimation>
        )}
      </div>
    </div>
  );
};
