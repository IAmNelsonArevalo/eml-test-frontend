import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import React from "react";
import useApi from "api";

const useCreateModal = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actRegister} = useAuthActions();

    /** Use Form */
    const {control, handleSubmit} = useForm({ mode: "onChange" });

    /** States */
    const [error, setError] = React.useState("");

    const inputs = [
        {
            name: "name",
            label: "Nombre",
            type: "text",
        },
        {
            name: "last_name",
            label: "Apellidos",
            type: "text",
        },
        {
            name: "email",
            label: "Correo Electronico",
            type: "email",
        },
        {
            name: "phone",
            label: "Numero de telefono",
            type: "number",
        },
        {
            name: "document_type",
            label: "Tipo de documento",
            type: "select",
        },
        {
            name: "document",
            label: "Numero de documento",
            type: "number",
        },
        {
            name: "password",
            label: "Contrasena",
            type: "password",
        },
        {
            name: "confirm_password",
            label: "Confirma tu contrasena",
            type: "password",
        },
    ]

    const handleCreateUser = (data?: any) => {
        if(data.password !== data.confirm_password ) {
            setError("Las contrasenas no coinciden.");
        } else {
            dispatch(actRegister({
                registerData: {...data, document_type: data.document_type.id, role: "Administrator"},
                onSuccess: () => {

                    Swal.fire({
                        icon: "success",
                        title: "Usuario creado exitosamente.",
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
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
        handleCreateUser
    }
}

export default useCreateModal;