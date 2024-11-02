import { toast } from "react-toastify";
import AppModal from "~/components/Modal/Modal";
import { useQuizDeleteMutation } from "../../queries";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItem: Quiz | undefined | null;
  successCallback: () => void;
}

export const QuizManagementModalDetele: React.FC<Props> = ({
  open,
  setOpen,
  selectedItem,
  successCallback,
}) => {
  const { mutate } = useQuizDeleteMutation();

  const handleAccept = async () => {
    if (!selectedItem) {
      return;
    }

    mutate(selectedItem.id, {
      onSuccess: () => {
        successCallback();
        toast.info("Delete event successfully!");
        setOpen(false);
      },
      onError: () => {
        toast.warn("Fail to delete event!");
      },
    });
  };

  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      header="Delete an event"
      body={
        <div className="px-5">
          Are you sure you want to delete "
          {selectedItem && selectedItem.question ? (
            <span className="font-semibold">{selectedItem.question}</span>
          ) : (
            this
          )}
          " event? Data will be permanently removed. This action cannot be
          undone.
        </div>
      }
      handleAccept={handleAccept}
      acceptTitle="Delete"
      declineTitle="Cancel"
    />
  );
};
