export interface IAction<T> {
    type: string;
    payload: {} | [] | T;
}

export interface IUser {
    name: string;
    last_name: string;
    document_type_id: number;
    document: string;
    status_id: number;
    verified_account: string;
    email: string;
    phone: string;
    picture: string;
    created_at: string;
    updated_at: string;
    id: number;
}

export interface IAuthState {
    login: string;
    user: IUser;
}

export type TState = {
    auth: IAuthState
}

export type TRequest = {
    onError?: (error?: any) => void;
    onSuccess?: (data?: any) => void;
}