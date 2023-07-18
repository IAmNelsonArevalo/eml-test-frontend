import useProviders from "./providers";
import useActions from "./actions";

const useApi = () => {
    return {
        useActions,
        useProviders
    };
}

export default useApi;