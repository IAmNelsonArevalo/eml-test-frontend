import useAuthProviders from "./auth";
import axios from "axios";

const useProviders = () => {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    return {
        useAuthProviders
    };
}

export default useProviders;