import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import Modal from "~/components/Modal/Modal";
import yup from "~/utils/yup-config";
import { QuizManagementModalUpsertBody } from "./QuizManagement.ModalUpsert.Body";
import { defaultAnswerList } from "../../config";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  successCallback: () => void;
}

export const QuizManagementModalUpsert: React.FC<Props> = ({
  open,
  setOpen,
  successCallback,
}) => {
  const defaultValues: QuizForm = useMemo(
    () => ({
      event: "",
      question: "",
      answers: defaultAnswerList,
    }),
    []
  );

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

  const handleDecline = () => {
    reset(defaultValues);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header="New quiz"
      body={
        <QuizManagementModalUpsertBody
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
          successCallback={successCallback}
          setOpen={setOpen}
          handleDecline={handleDecline}
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
