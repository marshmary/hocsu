import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { deleteEvent } from "~/data/events";
import Modal from "../Modal/Modal";

interface ModalDeleteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selected: HistoryEvent | undefined;
    successCallback: () => void;
}

const ModalDelete: FunctionComponent<ModalDeleteProps> = ({
    open,
    setOpen,
    selected,
    successCallback,
}) => {
    const handleAccept = async () => {
        if (selected) {
            try {
                await deleteEvent(selected.id);

                setOpen(false);
                successCallback();
                toast.info("Delete event successfully!");
            } catch {
                toast.warn("Fail to delete event!");
            }
        }
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header="Delete an event"
            body={
                <div className="px-5">
                    Are you sure you want to delete "
                    {selected && selected.title ? (
                        <span className="font-semibold">{selected.title}</span>
                    ) : (
                        this
                    )}
                    " event? Data will be permanently removed. This action
                    cannot be undone.
                </div>
            }
            handleAccept={handleAccept}
            acceptTitle="Delete"
            declineTitle="Cancel"
        />
    );
};

export default ModalDelete;
