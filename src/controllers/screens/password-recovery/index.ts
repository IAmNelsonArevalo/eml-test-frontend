import useApi from "api";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import useModels from "models";
import React from "react";

const usePasswordRecovery = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actChangePassword} = useAuthActions();

    /** Use Form */
    const {register, handleSubmit} = useForm({mode: "onChange"});

    /** Models */
    const {useSelectors} = useModels();
    const {useSelector, useAuthSelectors} = useSelectors();
    const {authSelector} = useAuthSelectors();
    const {user} = useSelector(authSelector);

    const changePassword = (data?: any) => {
        Object.keys(data).map((key) => {
            if(!data[key]) {
                Swal.fire({
                    icon: "error",
                    text: `${key === "email" ? "El correo electronico es requerido" : "La contrasena es requerida."}`
                })
            }
        })

        dispatch(actChangePassword({
            loginData: data,
            onError: (error: any) => console.error("CHANGE PASSWORD: ", error),
            onSuccess: () => window.location.href = "/login"
        }))
    }

    React.useEffect(() => {
        if(user.id) {
            window.location.href = "/"
        }
    }, [user])

    return {
        changePassword,
        register,
        handleSubmit
    }
}

export default usePasswordRecovery;