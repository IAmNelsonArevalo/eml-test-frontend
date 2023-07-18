import reducerPersist from "./reducers";
import useSelectors from "./selectors";

const useModels = () => {
    return {
        reducerPersist,
        useSelectors
    }
}

export default useModels;