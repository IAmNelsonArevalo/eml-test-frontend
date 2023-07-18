/** Helpers */
import useHelpers from "helpers";
/** Interfaces & Types */
import {IAuthState, TState} from "models/interfaces/helpers.interfaces";

const useAuthSelectors = () => {
    /** Helpers */
    const {useCreateSelector} = useHelpers();
    const {createSelector} = useCreateSelector();

    const authSelector = createSelector(
        (state: TState) => state.auth,
        (auth: IAuthState) => auth
    );

    return {
        authSelector
    };
}

export default useAuthSelectors;