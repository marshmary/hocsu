import { Dialog, Transition } from "@headlessui/react";
import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";

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
    const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

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

    const handleClose = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setOpen(false);
        if (handleDecline) {
            handleDecline();
        }
    };

    return ReactDOM.createPortal(
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed z-[99999] inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={() => {}}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#232222] bg-opacity-70 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start p-4 rounded-t border-b">
                                <h3 className="text-xl font-semibold">
                                    {header}
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                    onClick={handleClose}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="py-6 space-y-6">{body}</div>

                            {/* Modal Footer */}
                            {hasFooter && (
                                <div className="px-4 py-3 sm:px-6 flex justify-end gap-3 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={onAccept}
                                    >
                                        {acceptTitle}
                                    </button>
                                    <button
                                        type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        onClick={onDecline}
                                    >
                                        {declineTitle}
                                    </button>
                                </div>
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>,
        document.body
    );
};

export default AppModal;
