import {
  faClipboardQuestion,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip } from "flowbite-react";
import Icon from "../Icon";
import "./Home.QuizToggle.css";

interface Props {
  isTimelineShowing: boolean;
  quizToggleRef: React.MutableRefObject<null>;
  isQuizShowing: boolean;
  toggleQuiz: () => void;
}

export const HomeQuizToggle: React.FC<Props> = ({
  isTimelineShowing,
  quizToggleRef,
  isQuizShowing,
  toggleQuiz,
}) => {
  return (
    <div className={`fixed bottom-24 toggle-btn ${isTimelineShowing ? "show" : ""} z-20`} ref={quizToggleRef}>
      <Tooltip
        content={isQuizShowing ? "Show Carousel" : "Show Quizzes"}
        placement="left"
      >
        <Button
          className="rounded-full w-10 h-10 drop-shadow-2xl"
          onClick={toggleQuiz}
        >
          <Icon icon={isQuizShowing ? faImage : faClipboardQuestion} />
        </Button>
      </Tooltip>
    </div>
  );
};
