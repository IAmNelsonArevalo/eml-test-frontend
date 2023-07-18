import React from "react";
import {Controller} from "react-hook-form";
/** Interfaces & Types */
import type {Control, ControllerRenderProps, FieldValues, ControllerFieldState, UseFormStateReturn} from "react-hook-form";
import placeholder from "lodash/fp/placeholder";

interface IInputComponentProps {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
}

interface IInputProps {
    control: Control;
    name: string;
    label: string;
    type: "text" | "email" | "password" | "number";
    placeholder: string;
}

const Input: React.FC<IInputProps> = ({
                                          control,
                                          name,
                                          label,
                                          type,
                                          placeholder
                                      }): JSX.Element => {
    const InputComponent = (props: IInputComponentProps) => {
        /** Props */
        const {field, formState} = props;
        const {errors} = formState;

        return (
            <div>
                <label className={`block text-[13px] text-left font-medium leading-6 text-gray-900 ${errors[field.name] ? "text-[#d50000]" : "text-[#4d4d4d]"}`}>
                    {label}
                </label>
                <div className="relative mt-[2px] rounded-md shadow-sm">
                    <input
                        type={type}
                        name={field.name}
                        className={`block w-full rounded-md border-0 py-1.5 px-[10px] text-gray-900 ${errors[field.name] ? "ring-2 ring-[#d50000]" : "ring-2 ring-gray-200"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[transparent] text-[14px] sm:leading-6`}
                        placeholder={placeholder}
                        ref={field.ref}
                        value={field.value}
                        onChange={(e: any) => field.onChange(e)}
                        required
                    />
                </div>
            </div>
        )
    }


    return <Controller
        control={control}
        name={name}
        render={InputComponent}
    />
}

export default Input;