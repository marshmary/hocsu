import { Button, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SelectEvent } from "~/modules/event-management/queries/components";
import { isEmptyObject } from "~/utils/helpers";

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<QuizFilter>>;
}

interface QuizForm {
  searchKey: string;
  eventId: string;
}

const defaultValues: Partial<QuizFilter> = {
  searchKey: "",
  eventId: "",
};

export const QuizManagementFilter: React.FC<Props> = ({ setFilter }) => {
  const { handleSubmit, register, reset, control, getValues } =
    useForm<QuizForm>({
      mode: "onChange",
      defaultValues,
    });

  const handleReset = () => {
    const values = getValues();
    if (isEmptyObject(values)) {
      return;
    }
    reset(defaultValues);
    setFilter((prev) => ({ ...prev, ...defaultValues }));
  };

  const handleApply = (values: QuizForm) => {
    if (isEmptyObject(values)) {
      return;
    }
    setFilter((prev) => ({ ...prev, ...values }));
  };

  return (
    <div className="w-full h-auto flex gap-10 flex-wrap">
      <div>
        <div className="mb-2 font-medium">Title:</div>
        <TextInput
          type="text"
          placeholder="Enter an event name"
          {...register("searchKey")}
        />
      </div>
      <div>
        <div className="mb-2 font-medium">Event:</div>
        <SelectEvent
          className="max-w-48"
          id={register("eventId").name}
          {...register("eventId")}
        />
      </div>

      <div className="flex items-end justify-end gap-3 w-full sm:w-auto">
        <Button onClick={handleSubmit(handleApply)}>Apply</Button>
        <Button color="light" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
