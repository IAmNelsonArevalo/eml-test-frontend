import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
/** Local Modules */
import useApi from "api";
import React from "react";
import useModels from "models";

const useLogin = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actLogin} = useAuthActions();
    /** Use Form */
    const {register, handleSubmit} = useForm({mode: "onChange"});

    /** Models */
    const {useSelectors} = useModels();
    const {useSelector, useAuthSelectors} = useSelectors();
    const {authSelector} = useAuthSelectors();
    const {user} = useSelector(authSelector);

    const handleLogin = (data?: any) => {
        dispatch(actLogin({
            loginData: data,
            onSuccess: () => {
                window.location.href = "/"
                Swal.fire({
                    icon: "success",
                    title: "Bienvenido otra vez...!"
                })
            },
            onError: (error: any) => {
                let key = Object.keys(error.response.data.data)[0]
                if(error.response.data.message.content === "Error.") {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrio un error...!",
                        text: error.response.data.data[key]
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrio un error...!",
                        text: error.response.data.message.content
                    })
                }
            }
        }))
    }

    React.useEffect(() => {
        if(user.id) {
            window.location.href = "/"
        }
    }, [user])

    return {
        register,
        handleSubmit,
        handleLogin
    };
}

export default useLogin;