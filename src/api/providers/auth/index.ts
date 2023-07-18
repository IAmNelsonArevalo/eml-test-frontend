import axios from "axios";
import {trackPromise} from "react-promise-tracker";

const useAuthProviders = () => {
    const login = (data: any) => {
        const request = axios.post("/auth/login", data);
        return trackPromise(request);
    }

    const getDocumentTypes = () => {
        const request = axios.get("/auth/get-document-types");
        return trackPromise(request);
    }

    const register = (data: any) => {
        const request = axios.post("/auth/register", data);
        return trackPromise(request);
    }

    const changeStatus = (id: number) => {
        const request = axios.put(`/users/change-status/${id}`);
        return trackPromise(request);
    }

    const changePassword = (data: any) => {
        const request = axios.put(`/auth/password-recovery`, data);
        return trackPromise(request);
    }

    const editUser = (data: any) => {
        const request = axios.put("/users/update-user", data);
        return trackPromise(request);
    }

    return {
        login,
        getDocumentTypes,
        register,
        changeStatus,
        changePassword,
        editUser
    }
}

export default useAuthProviders;