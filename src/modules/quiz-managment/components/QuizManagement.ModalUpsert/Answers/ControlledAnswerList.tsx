import { Control, Controller, UseFormRegister } from "react-hook-form";
import { AnswerList } from "./AnswerList";
import {
  defaultAnswerList,
  defaultAnswerName,
} from "~/modules/quiz-managment/config";

interface Props {
  control: Control<QuizForm, any>;
  register: UseFormRegister<QuizForm>;
}

export const ControlledAnswerList: React.FC<Props> = ({
  control,
  register,
}) => {
  return (
    <Controller
      name={defaultAnswerName}
      defaultValue={defaultAnswerList}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <AnswerList
            value={field.value}
            onChange={field.onChange}
            register={register}
            name={defaultAnswerName}
          />
        );
      }}
    />
  );
};
