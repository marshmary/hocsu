import { Button, Modal } from "flowbite-react";
import { FunctionComponent } from "react";

interface AppModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    header?: string;
    body: any;
    hasFooter?: boolean;
    acceptTitle?: string;
    handleAccept?: () => void;
    declineTitle?: string;
    handleDecline?: () => void;
}

const AppModal: FunctionComponent<AppModalProps> = ({
    open = false,
    setOpen,
    header = "Default header",
    body,
    hasFooter = true,
    acceptTitle = "Accept",
    handleAccept = () => {},
    declineTitle = "Decline",
    handleDecline = () => {},
}) => {
    const onAccept = () => {
        setOpen(false);
        if (handleAccept) {
            handleAccept();
        }
    };

    const onDecline = () => {
        setOpen(false);
        if (handleDecline) {
            handleDecline();
        }
    };

    return (
        <Modal
            show={open}
            onClose={() => {
                setOpen(false);
            }}
        >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            {hasFooter && (
                <Modal.Footer>
                    <div className="flex justify-end w-full gap-3">
                        <Button onClick={onAccept}>{acceptTitle}</Button>
                        <Button color="gray" onClick={onDecline}>
                            {declineTitle}
                        </Button>
                    </div>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default AppModal;
