import {useSelector} from "react-redux";
/** Selectors */
import useAuthSelectors from "./auth";

const useSelectors = () => {
    return {
        useSelector,
        useAuthSelectors,
    };
}

export default useSelectors;