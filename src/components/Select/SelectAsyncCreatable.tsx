import { FunctionComponent, useState } from "react";
import { Controller } from "react-hook-form";
import AsyncCreatableSelect from "react-select/async-creatable";

interface SelectAsyncCreatableProps {
    className?: string;
    style?: any;
    isMulti: boolean;
    loadOptionsCallback: (keyword: string) => Promise<any>;
    control: any;
    controlName: any;
    optionConfig: {
        label: string; // response property for displaying lable
        value: string; // response property for storing value
    };
    error?: any;
}

interface Option {
    label: string; // response property for displaying lable
    value: string; // response property for storing value
}

const SelectAsyncCreatable: FunctionComponent<SelectAsyncCreatableProps> = ({
    className,
    isMulti,
    loadOptionsCallback,
    control,
    controlName,
    optionConfig,
    error,
}) => {
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            // border: "0.5px solid rgba(0, 0, 0, 0.25)",
            // boxShadow: "none",
            // "&:hover": {
            //     border: "0.5px solid rgba(0, 0, 0, 0.35)",
            // },
        }),
    };

    const [options, setOptions] = useState<Option[]>([]);
    const [oldOptions, setOldOptions] = useState<Option[]>([]);

    const handleInputChange = (newValue: string) => {
        const inputValue = newValue.replace(/\W/g, "");
        return inputValue;
    };

    const mapOptionsToValues = (options: any) => {
        const generatedOptions = options.map((option: any) => ({
            value: option[optionConfig.value],
            label: option[optionConfig.label],
        }));

        if (generatedOptions && generatedOptions.length > 0) {
            setOldOptions(generatedOptions);
        }

        setOptions(generatedOptions);
        return generatedOptions;
    };

    const promiseOptions = (inputValue: string) =>
        new Promise<any[]>((resolve) => {
            var rs = loadOptionsCallback(inputValue);
            rs.then((res) => {
                resolve(mapOptionsToValues(res));
            });
        });

    return (
        <div>
            <Controller
                control={control}
                name={controlName}
                render={({ field: { onChange, value, ref } }) => (
                    <AsyncCreatableSelect
                        ref={ref}
                        className={`${className}`}
                        styles={customStyles}
                        isMulti={isMulti}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                        })}
                        options={options}
                        loadOptions={promiseOptions}
                        defaultOptions
                        onInputChange={handleInputChange}
                        placeholder={"Select or create new"}
                        value={options.filter(
                            (c: any) => value && value!.includes(c.value)
                        )}
                        onChange={(val: any) => {
                            if (val)
                                isMulti
                                    ? onChange(val.map((c: any) => c.value))
                                    : onChange(val.value);
                        }}
                        onCreateOption={(inputValue: string) => {
                            setOptions([
                                ...oldOptions,
                                {
                                    value: inputValue,
                                    label: inputValue,
                                },
                            ]);
                            onChange(inputValue);
                        }}
                    />
                )}
            />

            {error?.message && (
                <span className="text-red-600 text-sm">{`${error.message}`}</span>
            )}
        </div>
    );
};

export default SelectAsyncCreatable;
