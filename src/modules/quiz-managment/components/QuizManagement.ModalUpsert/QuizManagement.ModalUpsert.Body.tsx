import { Button, Select, Textarea } from "flowbite-react";
import { useMemo } from "react";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { useEventQuery } from "~/modules/event-management/queries";
import { ControlledAnswerList } from "./Answers/ControlledAnswerList";

interface BodyProps {
  register: UseFormRegister<QuizForm>;
  handleSubmit: UseFormHandleSubmit<QuizForm, undefined>;
  errors: FieldErrors<QuizForm>;
  control: Control<QuizForm, any>;
}

export const QuizManagementModalUpsertBody: React.FC<BodyProps> = ({
  register,
  handleSubmit,
  errors,
  control,
}) => {
  const { data } = useEventQuery();

  const SelectOptions = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => (
      <option value={item.id} key={item.id}>
        {item.time}
      </option>
    ));
  }, [data]);

  const onSubmit = () => {};
  return (
    <div>
      <form
        className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-y-2">
          <div className="block">Time</div>
          <Select
            id={register("time").name}
            {...register("time")}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select time
            </option>
            {SelectOptions}
          </Select>
          {errors.time?.message && (
            <span className="text-red-600 text-sm">{`${errors.time.message}`}</span>
          )}
        </div>

        <div className="grid gap-y-2">
          <div className="block">Question</div>
          <Textarea
            rows={4}
            placeholder="Enter question"
            id={register("question").name}
            {...register("question")}
          />
          {errors.question?.message && (
            <span className="text-red-600 text-sm">{`${errors.question.message}`}</span>
          )}
        </div>

        <div className="grid gap-y-2">
          <div className="block">Answers</div>
          <ControlledAnswerList control={control} register={register} />
        </div>

        <div className="w-full flex justify-end">
          <Button type="submit" disabled={false}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
