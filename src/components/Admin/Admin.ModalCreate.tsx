import { Button, Textarea, TextInput, Tooltip } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FunctionComponent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ImageDropzone from "~/components/Dropzone/ImageDropzone";
import Modal from "~/components/Modal/Modal";
import yup from "~/utils/yup-config";
import SelectAsyncCreatable from "../Select/SelectAsyncCreatable";
import { recommendTimelines } from "~/data/timelines";
import { createEvent } from "~/data/events";
import { toast } from "react-toastify";
import Icon from "../Icon";

interface ModalCreateProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    successCallback: () => void;
}

const defaultValues = {
    title: "",
    from: "",
    to: "",
    // timeline: "",
    content: "",
    imageFiles: [],
};

const ModalCreate: FunctionComponent<ModalCreateProps> = ({
    open,
    setOpen,
    successCallback,
}) => {
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
        // timeline: yup.string().required("Please select or create new timeline"),
        content: yup.string().required("Please enter value for Content!"),
        imageFiles: yup.mixed().nullable(true),
    });

    const {
        handleSubmit,
        register,
        control,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: FieldValues) => {
        try {
            setLoading(true);
            var rs = await createEvent({
                title: values.title,
                content: values.content,
                images: values.imageFiles,
                from: values.from,
                to: values.to,
                // timeline: values.timeline,
            });

            setLoading(false);
            setOpen(false);
            successCallback();
            toast.info("Create new event successfully!");
        } catch {
            setLoading(false);
            toast.warning(
                "Fail to create event. Please check your input again!"
            );
        }

        reset(defaultValues);
    };

    const handleDecline = () => {
        reset(defaultValues);
    };

    const modalCreateBody = (
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
                {/* <div className="grid gap-y-2">
                    <div className="flex flex-rows gap-1">
                        Timeline
                        <Tooltip
                            content="Select from the box or Type new one to create"
                            placement="right"
                        >
                            <Icon icon="circle-info" />
                        </Tooltip>
                    </div>
                    <SelectAsyncCreatable
                        className="w-full"
                        isMulti={false}
                        loadOptionsCallback={recommendTimelines}
                        control={control}
                        controlName={"timeline"}
                        optionConfig={{
                            label: "title",
                            value: "title",
                        }}
                        error={errors.timeline}
                    />
                </div> */}
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
                        fieldName="imageFiles"
                        getValues={getValues}
                        setValue={setValue}
                        error={errors.imageFiles}
                    />
                </div>
                <div className="w-full flex justify-end">
                    <Button type="submit" disabled={loading}>
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            header="New event"
            body={modalCreateBody}
            hasFooter={false}
            handleDecline={handleDecline}
        />
    );
};

export default ModalCreate;
