import { Button, Textarea, TextInput } from "flowbite-react";
import { FunctionComponent } from "react";
import Modal from "../Modal/Modal";

interface ModalCreateProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalCreate: FunctionComponent<ModalCreateProps> = ({
    open,
    setOpen,
}) => {
    const modalCreateBody = (
        <div>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <div>
                    <div className="mb-2 block">Name</div>
                    <TextInput placeholder="Enter event name" />
                </div>
                <div>
                    <div className="mb-2 block">From</div>
                    <TextInput type="date" />
                </div>
                <div>
                    <div className="mb-2 block">To</div>
                    <TextInput type="date" />
                </div>
                <div>
                    <div className="mb-2 block">Content</div>
                    <Textarea placeholder="Leave a description..." rows={4} />
                </div>
                <div className="w-full flex justify-end">
                    <Button>Add</Button>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header="New event"
            body={modalCreateBody}
            hasFooter={false}
        />
    );
};

export default ModalCreate;
