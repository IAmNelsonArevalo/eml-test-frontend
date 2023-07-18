import {useDispatch} from "react-redux";
/** Local Modules */
import useAuthActions from "./auth";

const useActions = () => {
    const dispatch: any = useDispatch();

    return {
        dispatch,
        useAuthActions
    };
}

export default useActions;