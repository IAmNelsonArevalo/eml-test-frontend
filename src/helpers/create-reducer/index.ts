/** Interfaces & Types */
import { IAction } from "models/interfaces/helpers.interfaces";

const useCreateReducer = () => {
    const createReducer = (initialState: {}, handler: any) => {
        return (state = initialState, action: IAction<unknown>) => {
            return handler?.hasOwnProperty(action.type)
                ? handler[action.type](state, action)
                : state;
        }
    }

    return {
        createReducer,
    };
}

export default useCreateReducer;