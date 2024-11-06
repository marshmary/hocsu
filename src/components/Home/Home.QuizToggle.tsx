import {
  faClipboardQuestion,
  faImage,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip } from "flowbite-react";
import Icon from "../Icon";

interface Props {
  isQuizShowing: boolean;
  toggleQuiz: () => void;
}

export const HomeQuizToggle: React.FC<Props> = ({
  isQuizShowing,
  toggleQuiz,
}) => {
  return (
    <div className="fixed bottom-24 right-[34px] z-20">
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
