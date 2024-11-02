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
import { useQuizCreateMutation } from "../../queries";
import { toast } from "react-toastify";

interface BodyProps {
  register: UseFormRegister<QuizForm>;
  handleSubmit: UseFormHandleSubmit<QuizForm, undefined>;
  errors: FieldErrors<QuizForm>;
  control: Control<QuizForm, any>;
  successCallback: () => void;
  setOpen: (open: boolean) => void;
}

export const QuizManagementModalUpsertBody: React.FC<BodyProps> = ({
  register,
  handleSubmit,
  errors,
  control,
  successCallback,
  setOpen,
}) => {
  const { data } = useEventQuery();

  const SelectOptions = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => (
      <option value={item.id} key={item.id}>
        {item.title}
      </option>
    ));
  }, [data]);

  const { isPending, mutateAsync } = useQuizCreateMutation();
  const onSubmit = async (values: QuizForm) => {
    console.log(values);
    return;
    await mutateAsync(values);
    successCallback();
    toast.info("Create quiz successfully!");
    setOpen(false);
  };

  return (
    <div>
      <form
        className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-y-2">
          <div className="block">Event</div>
          <Select
            id={register("event").name}
            {...register("event")}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select event
            </option>
            {SelectOptions}
          </Select>
          {errors.event?.message && (
            <span className="text-red-600 text-sm">{`${errors.event.message}`}</span>
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
          {errors.answers?.message && (
            <span className="text-red-600 text-sm">{`${errors.answers.message}`}</span>
          )}
        </div>

        <div className="w-full flex justify-end">
          <Button type="submit" disabled={isPending}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};