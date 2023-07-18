/** Local Modules */
import useHelpers from "helpers";
import useTypes from "types";
import {IAction, IAuthState, TState} from "../../interfaces/helpers.interfaces";
/** Interfaces & Types */

const useAuthReducers = () => {
    /** Helpers */
    const {useCreateReducer} = useHelpers();
    const {createReducer} = useCreateReducer();

    /** Types */
    const {useAuthTypes} = useTypes();
    const {LOGIN} = useAuthTypes();

    const auth = createReducer({token: "", user: {}}, {
        [LOGIN](state: TState, action: IAction<IAuthState>) {
            return {
                ...state,
                ...action.payload
            }
        }
    })

    return {
        auth
    };
}

export default useAuthReducers;