import useCreateReducer from "./create-reducer";
import useCreateSelector from "./create-selector";

const useHelpers = () => {
    return {
        useCreateReducer,
        useCreateSelector
    };
}

export default useHelpers;