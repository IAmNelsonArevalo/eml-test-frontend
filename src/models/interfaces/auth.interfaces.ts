import {TRequest} from "./helpers.interfaces";

export interface ILoginRequest extends TRequest{
    loginData: {
        email: string;
        password: string;
    }
}

export interface IRegisterRequest extends TRequest{
    registerData: {
        email: string;
        password: string;
        name: string;
        last_name: string;
        phone: string;
        document: string;
        document_type: number;
    }
}

export interface IChangeStatus extends TRequest {
    id: number
}