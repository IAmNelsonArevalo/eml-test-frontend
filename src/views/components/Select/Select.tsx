import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
/** Interfaces & Types */
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface ISelectProps {
    name: string;
    control: Control;
    label: string;
    value: string;
    options: Array<any>;
    option: string;
    placeholder: string;
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}


const Select: React.FC<ISelectProps> = ({
                                            name,
                                            control,
                                            label,
                                            value,
                                            options,
                                            placeholder
                                        }): JSX.Element => {
    const SelectComponent = (props: any) => {
        /** Props */
        const { field, formState } = props;
        const { errors } = formState;

        /** States */
        const [selected, setSelected] = React.useState({ [value]: placeholder });

        console.log(field.value)

        return (
            <div>
                <Listbox value={selected} onChange={(e: any) => {
                    setSelected(e);
                    field.onChange(e);
                }}>
                    {({ open }) => (
                        <React.Fragment>
                            <Listbox.Label
                                className="block text-[13px] font-medium leading-6 text-gray-900 text-left"
                            >
                                {label}
                            </Listbox.Label>
                            <div className="relative mt-[2px]">
                                <Listbox.Button
                                    className={`relative h-[33px] w-full cursor-default rounded-md bg-white py-1.5 px-[10px] pr-10 text-left text-gray-900 shadow-sm ${errors[field.name] ? "ring-2 ring-[#d50000]" : "ring-2 ring-gray-200"} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                                >
                              <span className="flex items-center">
                                <span className="block truncate text-[14px]">{field.value ? field.value[value] : selected[value]}</span>
                              </span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {options.map((person) => (
                                            <Listbox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                                    )
                                                }
                                                value={person}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                        <span
                                                            className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}
                                                        >
                                                            {person[value]}
                                                          </span>
                                                        </div>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? "text-white" : "text-indigo-600",
                                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                )}
                                                            >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </React.Fragment>
                    )}
                </Listbox>
            </div>
        );
    };

    return <Controller control={control} render={SelectComponent} name={name} />;
};

export default Select;