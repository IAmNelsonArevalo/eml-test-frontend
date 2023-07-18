/** Local Modules */
import useApi from "api";
import useTypes from "types";
/** Interfaces & Types */
import {IChangeStatus, ILoginRequest, IRegisterRequest} from "models/interfaces/auth.interfaces";
import {Dispatch} from "redux";
import {TRequest} from "models/interfaces/helpers.interfaces";

const useAuthActions = () => {
    /** Providers */
    const {useProviders} = useApi();
    const {useAuthProviders} = useProviders();
    const {login, getDocumentTypes, register, changeStatus, changePassword, editUser} = useAuthProviders();

    /** Types */
    const {useAuthTypes} = useTypes();
    const {LOGIN, SET_DOCUMENT_TYPES} = useAuthTypes();

    const actLogin = (request: ILoginRequest) => async (dispatch: Dispatch) => {
        /** Request */
        const {loginData, onError, onSuccess} = request;

        try {
            const res = await login(loginData);
            const { data } = res.data;

            dispatch({
                type: LOGIN,
                payload: data
            });

            onSuccess && onSuccess();
        } catch (e) {
            onError && onError(e);
        }
    }

    const actGetDocumentTypes = (request: TRequest) => async (dispatch: Dispatch) => {
        /** Request */
        const {onError} = request;
        try {
            const res = await getDocumentTypes();
            const {data} = res.data;

            dispatch({
                type: SET_DOCUMENT_TYPES,
                payload: data
            });
        }catch (e) {
            onError && onError(e);
        }
    }

    const actRegister = (request: IRegisterRequest) => async (dispatch: Dispatch) => {
        /** Request */
        const {onError, registerData, onSuccess} = request;
        try {
            const res = await register(registerData);
            const {data} = res.data;

            onSuccess && onSuccess(data);
        }catch (e) {
            onError && onError(e);
        }
    }

    const actLogout = (request: TRequest) => async (dispatch: Dispatch) => {
        /** Request */
        const {onError, onSuccess} = request;
        try {
            dispatch({
                type: LOGIN,
                payload: {
                    token: "",
                    user: {}
                }
            })
            onSuccess && onSuccess();
        }catch (e) {
            onError && onError(e);
        }
    }

    const actChangeStatus = (request: IChangeStatus) => async (dispatch: Dispatch) => {
        /** Request */
        const {onError, id, onSuccess} = request;
        try {
            const res = await changeStatus(id);
            const {data} = res.data;

            onSuccess && onSuccess(data);
        }catch (e) {
            onError && onError(e);
        }
    }

    const actChangePassword = (request: ILoginRequest) => async (dispatch: Dispatch) => {
        /** Request */
        const {onError, loginData, onSuccess} = request;
        try {
            const res = await changePassword(loginData);
            const {data} = res.data;

            onSuccess && onSuccess(data);
        }catch (e) {
            onError && onError(e);
        }
    }

    const actEditUser = (request: IRegisterRequest) => async (dispatch: Dispatch) => {
        /** Request */
        const {onError, registerData, onSuccess} = request;
        try {
            const res = await editUser(registerData);
            const {data} = res.data;

            onSuccess && onSuccess(data);
        }catch (e) {
            onError && onError(e);
        }
    }

    return {
        actLogin,
        actGetDocumentTypes,
        actRegister,
        actLogout,
        actChangeStatus,
        actChangePassword,
        actEditUser
    };
}

export default useAuthActions;