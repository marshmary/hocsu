import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Modal from "~/components/Modal/Modal";
import yup from "~/utils/yup-config";
import { defaultAnswerList } from "../../config";
import { QuizManagementModalUpsertBody } from "./QuizManagement.ModalUpsert.Body";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  successCallback: () => void;
  selectedItem: Quiz | null;
}

const defaultValues = {
  event: "",
  question: "",
  answers: defaultAnswerList,
};

export const QuizManagementModalUpsert: React.FC<Props> = ({
  open,
  setOpen,
  successCallback,
  selectedItem,
}) => {
  const isEdit = useMemo(() => !!selectedItem, [selectedItem]);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<QuizForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset({
      event: selectedItem?.event || "",
      question: selectedItem?.question || "",
      answers: selectedItem?.answers || defaultAnswerList,
    });
  }, [selectedItem]);

  const handleDecline = () => {};

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header={isEdit ? "Edit quiz" : "New quiz"}
      body={
        <QuizManagementModalUpsertBody
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
          successCallback={successCallback}
          setOpen={setOpen}
          handleDecline={handleDecline}
          isEdit={isEdit}
          selectedItem={selectedItem}
        />
      }
      hasFooter={false}
      handleDecline={handleDecline}
    />
  );
};

const schema = yup.object().shape({
  event: yup.string().required("Please select an Event!"),
  question: yup.string().required("Please enter value for Question!"),
  answers: yup
    .array()
    .test(
      "answer-value-not-null",
      "Please enter value for answer!",
      (answers) => {
        if (!answers) return false;
        return !answers.find((each) => !each?.answer);
      }
    )
    .test(
      "at-least-one-correct-answer",
      "Please mark at least 1 answer as correct answer!",
      (answers) => {
        if (!answers) return false;
        const correctAnswer = answers.find((each) => each?.isCorrect);
        if (!correctAnswer) {
          return false;
        }
        return true;
      }
    ),
});
