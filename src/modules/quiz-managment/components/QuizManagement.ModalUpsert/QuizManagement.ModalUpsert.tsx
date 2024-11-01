import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import Modal from "~/components/Modal/Modal";
import yup from "~/utils/yup-config";
import { QuizManagementModalUpsertBody } from "./QuizManagement.ModalUpsert.Body";

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
  const defaultValues = useMemo(() => ({}), []);

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
        />
      }
      hasFooter={false}
      handleDecline={handleDecline}
    />
  );
};

const schema = yup.object().shape({
  title: yup.string().required("Please enter value for Title!"),
  from: yup
    .string()
    .required("Please enter value for From!")
    .dateFormat("Please enter value with valid date format"),
  to: yup
    .string()
    .required("Please enter value for To!")
    .dateFormat("Please enter value with valid date format"),
  content: yup.string().required("Please enter value for Content!"),
  imageFiles: yup.mixed().nullable(true),
});
