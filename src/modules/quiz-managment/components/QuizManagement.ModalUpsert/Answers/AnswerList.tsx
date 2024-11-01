import { Button } from "flowbite-react";
import { useCallback, useMemo, useState } from "react";
import { AnswerItem } from "./AnswerItem";
import { UseFormRegister } from "react-hook-form";
import { defaultAnswerItem } from "~/modules/quiz-managment/config";
import uuid from "react-uuid";
import { ModalDeleteAnswer } from "./ModalDeleteAnswer";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  value: Answer[];
  onChange: (...event: any[]) => void;
  register: UseFormRegister<QuizForm>;
  name: "answers";
}

export const AnswerList: React.FC<Props> = ({
  value,
  onChange,
  register,
  name,
}) => {
  const isAddDisabled = useMemo(() => value.length > 5, [value]);
  const isDeleteDisabled = useMemo(() => value.length < 2, [value]);
  const addNewAnswer = useCallback(() => {
    onChange([...value, { ...defaultAnswerItem, id: uuid() }]);
  }, [value, onChange]);
  const deleteAnswer = useCallback(
    (id: string) => {
      onChange(value.filter((item) => item.id !== id));
    },
    [value, onChange]
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Answer | null>(null);
  const onDeleteAnswerClick = (answer: Answer) => {
    setSelected(answer);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={addNewAnswer} disabled={isAddDisabled}>
          Add new answer
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {value.map((item, index) => (
          <AnswerItem
            key={item.id}
            register={register}
            index={index}
            name={name}
            isDeleteDisabled={isDeleteDisabled}
            item={item}
            deleteAnswer={onDeleteAnswerClick}
          />
        ))}
      </div>

      <ModalDeleteAnswer
        open={open}
        setOpen={setOpen}
        selected={selected}
        successCallback={deleteAnswer}
      />
    </div>
  );
};
