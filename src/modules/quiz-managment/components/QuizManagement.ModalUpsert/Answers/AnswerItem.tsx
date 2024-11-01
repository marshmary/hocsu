import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@mantine/core";
import { Button, TextInput, Tooltip } from "flowbite-react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<QuizForm>;
  index: number;
  name: "answers";
  isDeleteDisabled: boolean;
  item: Answer;
  deleteAnswer: (item: Answer) => void;
}

export const AnswerItem: React.FC<Props> = ({
  register,
  index,
  name,
  isDeleteDisabled,
  item,
  deleteAnswer,
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Tooltip content="Mark this as correct answer">
        <Switch size="lg" />
      </Tooltip>
      <TextInput
        id={register(`${name}.${index}.answer`).name}
        {...register(`${name}.${index}.answer`)}
        placeholder="Enter answer"
        className="flex-1"
      />
      <Tooltip content="Remove answer">
        <Button
          className="bg-red-600 hover:!bg-red-900"
          disabled={isDeleteDisabled}
          onClick={() => deleteAnswer(item)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </Tooltip>
    </div>
  );
};
