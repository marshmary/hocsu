import { FunctionComponent, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Icon from "../Icon";
import uuid from "react-uuid";

interface ImageDropzoneProps {
    accept?: Accept;
    maxFile?: number;
    maxSize?: number;
    className?: string;
    defaultPreviews?: Array<ImagePreview>;
    fieldName?: string; // useForm field name
    getValues: any; // useForm object
    setValue: any; // useForm object
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

interface ImagePreview {
    key: string;
    preview: string;
}

const byteToMB = 1000000;
const thumbnailInputField = "thumbnailFile";

const ImageDropzone: FunctionComponent<ImageDropzoneProps> = ({
    accept = {
        "image/*": [".png", ".jpg", ".jpeg", ".jfif", ".webp"],
    },
    maxFile = 10,
    maxSize = 15 * byteToMB, // 15MB
    className,
    defaultPreviews = [],
    fieldName = thumbnailInputField,
    getValues,
    setValue,
    error,
}) => {
    const savedImages = getValues(fieldName);
    const [previews, setPreviews] =
        useState<Array<ImagePreview>>(defaultPreviews);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: accept,
        maxFiles: maxFile,
        maxSize: maxSize,
        onDropAccepted: (acceptedFiles) => {
            let newFiles = acceptedFiles.map((file) => {
                const key = uuid();

                setPreviews((prev) => [
                    ...prev,
                    {
                        key: key,
                        preview: URL.createObjectURL(file),
                    },
                ]);

                return Object.assign(file, {
                    key: key,
                    isNew: true,
                });
            });

            setValue(fieldName, newFiles);
        },
    });

    const displayAccept = (item: Accept) => {
        var result: string[] = [];
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                result = result.concat(item[key]);
            }
        }
        return result.join(", ");
    };

    const handleRemoveSelectedImg = (key: string) => {
        // Prevent memory leaks when create preview link
        let removeTarget = previews.filter((previes) => previes.key == key)[0];
        URL.revokeObjectURL(removeTarget.preview);

        // Set value without removeTarget
        setPreviews(previews.filter((previes) => previes.key !== key));
        const savedImages = getValues(fieldName);
        const newImages = savedImages.filter((img: any) => img.key !== key);
        setValue(fieldName, newImages);
    };

    return (
        <section
            className={`flex flex-col gap-3 items-center justify-center w-full h-fit ${className}`}
        >
            <div
                {...getRootProps({
                    className:
                        "flex justify-center w-full h-full transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none",
                    style: { minHeight: "8rem" },
                })}
            >
                <input {...getInputProps()} />
                <span className="flex flex-col items-center justify-center mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <span className="font-medium text-gray-600">
                        Drop files to attach, or{" "}
                        <span className="text-blue-600 underline">browse</span>
                    </span>
                    <div className="text-sm text-gray-600">
                        Accept: {displayAccept(accept)}
                    </div>
                </span>
            </div>

            {previews && previews.length > 0 && (
                <div className="w-full flex gap-5 mt-3 flex-row flex-wrap justify-evenly">
                    {previews.map((img) => (
                        <div
                            className="inline-block relative h-32 w-32 rounded-md ring-2 ring-white"
                            key={img.key}
                        >
                            <div
                                className="h-6 w-6 bg-red-500 absolute -top-3 -right-3 rounded-full grid place-items-center cursor-pointer"
                                onClick={() => {
                                    handleRemoveSelectedImg(img.key);
                                }}
                            >
                                <Icon
                                    icon="x"
                                    size="xs"
                                    className="text-white font-bold"
                                />
                            </div>
                            <img
                                className="w-full h-full object-cover"
                                src={img.preview}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Error msg */}
            {error?.message && acceptedFiles.length == 0 && (
                <span className="text-red-600 text-sm">{`${error.message}`}</span>
            )}
        </section>
    );
};

export default ImageDropzone;
