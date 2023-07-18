import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import React from "react";
import useApi from "api";
import useModels from "models";

const useEditModal = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actEditUser, actLogout} = useAuthActions();

    /** Models */
    const {useSelectors} = useModels();
    const {useSelector, useAuthSelectors} = useSelectors();
    const {authSelector} = useAuthSelectors();
    const user = useSelector(authSelector).user;

    /** Use Form */
    const {control, handleSubmit, reset} = useForm({ mode: "onChange" });

    /** States */
    const [error, setError] = React.useState("");

    const inputs = [
        {
            name: "name",
            label: "Nombre",
            type: "text",
            message: "El nombre del usuario es requerido."
        },
        {
            name: "last_name",
            label: "Apellidos",
            type: "text",
            message: "El apellido del usuario es requerido."
        },
        {
            name: "document_type",
            label: "Tipo de documento",
            type: "select",
            message: "El tipo de documento del usuario es requerido."
        },
        {
            name: "document",
            label: "Numero de documento",
            type: "number",
            message: "El numero de documento del usuario es requerido."
        },
        {
            name: "email",
            label: "Correo Electronico",
            type: "email",
            message: "El correo electronico del usuario es requerido."
        },
        {
            name: "phone",
            label: "Numero de telefono",
            type: "number",
            message: "El telefono del usuario es requerido."
        },
    ]

    const handleEditUser = (data?: any) => {
        if(data.password !== data.confirm_password ) {
            setError("Las contrasenas no coinciden.");
        } else {
            Object.keys(data).map((key) => {
                if(!data[key]) {
                    Swal.fire({
                        icon: "error",
                        text: inputs.find((item: any) => item.name === key)?.message
                    })
                }
            })

            dispatch(actEditUser({
                registerData: {...data, document_type: data.document_type.id},
                onSuccess: () => {

                    if(data.id === user.id) {
                        dispatch(actLogout({
                            onError: (error: any) => console.error("CLOSE SESSION", error),
                            onSuccess: () => window.location.href = "/login"
                        }))
                    } else {
                        window.location.reload();
                    }
                },
                onError: () => {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrio un problema",
                        text: "Ocurrio un problema al registrarte, intenta de nuevo...!"
                    })
                }
            }));
        }
    }

    return {
        inputs,
        control,
        handleSubmit,
        reset,
        handleEditUser
    }
}

export default useEditModal;