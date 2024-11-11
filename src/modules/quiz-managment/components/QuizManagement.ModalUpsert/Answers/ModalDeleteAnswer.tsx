import { toast } from "react-toastify";
import AppModal from "~/components/Modal/Modal";

interface ModalDeleteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: Answer | null;
  successCallback: (id: string) => void;
}

export const ModalDeleteAnswer: React.FC<ModalDeleteProps> = ({
  open,
  setOpen,
  selected,
  successCallback,
}) => {
  const handleAccept = async () => {
    if (selected) {
      setOpen(false);
      successCallback(selected.id);
    }
  };
  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      header="Delete an event"
      body={
        <div className="px-5">
          Are you sure you want to delete "
          {selected && selected.answer ? (
            <span className="font-semibold">{selected.answer}</span>
          ) : (
            this
          )}
          " answer? Data will be permanently removed. This action cannot be
          undone.
        </div>
      }
      handleAccept={handleAccept}
      acceptTitle="Delete"
      declineTitle="Cancel"
    />
  );
};
