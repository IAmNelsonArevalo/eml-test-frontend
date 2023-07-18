import React from "react";
import {Dialog, Transition} from '@headlessui/react'
import Image from "next/image"
import useControllers from "controllers";
import Select from "../Select";
import Input from "../Input";

interface ICreateModal {
    open: boolean;
    onClose: () => void;
    options: any;
}

const CreateModal: React.FC<ICreateModal> = ({
                                                 open,
                                                 onClose,
                                                 options
                                             }): JSX.Element => {
    /** Refs */
    const cancelButtonRef = React.useRef(null);

    /** Controllers */
    const {useComponents} = useControllers();
    const {useCreateModal} = useComponents();
    const {inputs, handleCreateUser, handleSubmit, control} = useCreateModal();

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-[800px] w-full">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex justify-center w-full">
                                        <Image
                                            src="https://eml.co/page/img/logo.png"
                                            alt="Logo"
                                            width={150}
                                            height={50}
                                            priority={true}
                                        />
                                    </div>
                                    <form className="grid grid-cols-2 gap-[10px] max-600:grid-cols-1">
                                        {
                                            inputs.map((item: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    {
                                                        item.type === "select" ? (
                                                            <Select
                                                                control={control}
                                                                name={item.name}
                                                                label={item.label}
                                                                option="name"
                                                                value="name"
                                                                options={options}
                                                                placeholder="Selecciona el tipo de documento..."
                                                            />
                                                        ) : (
                                                            <Input
                                                                control={control}
                                                                name={item.name}
                                                                label={item.label}
                                                                placeholder=""
                                                                type={item.type}
                                                            />
                                                        )
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                    </form>
                                </div>
                                <div className="bg-gray-50 gap-[10px] px-4 py-3 flex items-center sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex max-w-[50%] h-[36px] w-full justify-center rounded-md bg-[#374e9a] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleSubmit(handleCreateUser)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="max-w-[50%] h-[36px] inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={onClose}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default CreateModal;