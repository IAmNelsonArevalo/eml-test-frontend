import {useForm} from "react-hook-form";
import React from "react";
import useApi from "api";
import Swal from "sweetalert2";
import useModels from "models";

const useRegister = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actRegister} = useAuthActions();

    /** Use Forms */
    const {control, handleSubmit} = useForm({mode: "onChange"});

    /** States */
    const [error, setError] = React.useState("");

    /** Models */
    const {useSelectors} = useModels();
    const {useSelector, useAuthSelectors} = useSelectors();
    const {authSelector} = useAuthSelectors();
    const {user} = useSelector(authSelector);

    const handleRegister = (data?: any) => {
        if(data.password !== data.confirm_password ) {
            setError("Las contrasenas no coinciden.");
        } else {
            dispatch(actRegister({
               registerData: {...data, document_type: data.document_type.id, role: "Administrator"},
                onSuccess: () => {

                   Swal.fire({
                       icon: "success",
                       title: "registro exitoso.",
                   });
                    window.location.href = "/login";
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

    React.useEffect(() => {
        if(user.id) {
            window.location.href = "/"
        }
    }, [user])

    return {
        control,
        handleSubmit,
        handleRegister
    };
}

export default useRegister;