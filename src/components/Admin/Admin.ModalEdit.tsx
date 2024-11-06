import { Button, Textarea, TextInput, Tooltip } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FunctionComponent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ImageDropzone from "~/components/Dropzone/ImageDropzone";
import Modal from "~/components/Modal/Modal";
import yup from "~/utils/yup-config";
import { createEvent, getEventById, updateEvent } from "~/data/events";
import { toast } from "react-toastify";
import Icon from "../Icon";
import Loading from "../Loading/Loading";

interface ModalEditProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    successCallback: () => void;
    selected: HistoryEvent;
}

const defaultValues: HistoryEventEditForm = {
    id: "",
    title: "",
    from: "",
    to: "",
    content: "",
    imageFiles: [],
    images: [],
};

const ModalEdit: FunctionComponent<ModalEditProps> = ({
    open,
    setOpen,
    successCallback,
    selected,
}) => {
    const [loading, setLoading] = useState(true);

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
        imageFiles: yup.array().nullable(true),
    });

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (open === true && selected) {
            setLoading(true);
            getEventById(selected.id)
                .then((existed) => {
                    if (existed) {
                        setValue("title", existed.title);
                        setValue("from", existed.time.split(" - ")[0]);
                        setValue("to", existed.time.split(" - ")[1]);
                        setValue("content", existed.content);
                        setValue("images", existed.images);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [open]);

    const onSubmit = async (values: FieldValues) => {
        try {
            setLoading(true);
            await updateEvent({
                id: selected.id,
                title: values.title,
                content: values.content,
                images: values.images,
                imageFiles: values.imageFiles,
                from: values.from,
                to: values.to,
            });

            successCallback();
            toast.info("Edit event successfully!");
            setLoading(false);
            setOpen(false);
        } catch {
            toast.warning("Fail to edit event. Please check your input again!");
            setLoading(false);
            setOpen(false);
        }
    };

    const handleDecline = () => {
        reset(defaultValues);
    };

    const modalEditBody = loading ? (
        <div className="w-full grid place-items-center h-52">
            <Loading />
        </div>
    ) : (
        <div>
            <form
                className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid gap-y-2">
                    <div className="block">Title</div>
                    <TextInput
                        type="text"
                        placeholder="Enter event name"
                        id={register("title").name}
                        {...register("title")}
                    />
                    {errors.title?.message && (
                        <span className="text-red-600 text-sm">{`${errors.title.message}`}</span>
                    )}
                </div>
                <div className="grid gap-y-2">
                    <div className="flex flex-rows gap-1">
                        From
                        <Tooltip
                            content="Date format: YYYY or YYYY-MM or YYYY-MM-DD"
                            placement="right"
                        >
                            <Icon icon="circle-info" />
                        </Tooltip>
                    </div>
                    <TextInput
                        type="text"
                        placeholder="Enter start date with format"
                        id={register("from").name}
                        {...register("from")}
                    />
                    {errors.from?.message && (
                        <span className="text-red-600 text-sm">{`${errors.from.message}`}</span>
                    )}
                </div>
                <div className="grid gap-y-2">
                    <div className="flex flex-rows gap-1">
                        To
                        <Tooltip
                            content="Date format: YYYY or YYYY-MM or YYYY-MM-DD"
                            placement="right"
                        >
                            <Icon icon="circle-info" />
                        </Tooltip>
                    </div>
                    <TextInput
                        type="text"
                        placeholder="Enter end date with format"
                        id={register("to").name}
                        {...register("to")}
                    />
                    {errors.to?.message && (
                        <span className="text-red-600 text-sm">{`${errors.to.message}`}</span>
                    )}
                </div>
                <div className="grid gap-y-2">
                    <div className="block">Content</div>
                    <Textarea
                        placeholder="Leave a description..."
                        rows={4}
                        id={register("content").name}
                        {...register("content")}
                    />
                    {errors.content?.message && (
                        <span className="text-red-600 text-sm">{`${errors.content.message}`}</span>
                    )}
                </div>
                <div className="grid gap-y-2">
                    <div className="block">Images</div>
                    <ImageDropzone
                        setValue={setValue}
                        getValues={getValues}
                        fieldName="imageFiles"
                        previewFieldName="images"
                        error={errors.imageFiles}
                    />
                </div>
                <div className="w-full flex justify-end">
                    <Button type="submit" disabled={loading}>
                        Edit
                    </Button>
                </div>
            </form>
        </div>
    );

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header="Edit event"
            body={modalEditBody}
            hasFooter={false}
            handleDecline={handleDecline}
        />
    );
};

export default ModalEdit;
