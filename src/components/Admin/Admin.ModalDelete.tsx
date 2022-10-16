import { FunctionComponent } from "react";
import Modal from "../Modal/Modal";

interface ModalDeleteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalDelete: FunctionComponent<ModalDeleteProps> = ({
    open,
    setOpen,
}) => {
    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header="Delete an event"
            body={
                <div>
                    Are you sure you want to delete this event? Data will be
                    permanently removed. This action cannot be undone.
                </div>
            }
        />
    );
};

export default ModalDelete;
