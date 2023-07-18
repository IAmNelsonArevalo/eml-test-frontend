import { isEqual } from "lodash";
import { createSelectorCreator, defaultMemoize } from "reselect";

const useCreateSelector = () => {
    const createSelector = createSelectorCreator(defaultMemoize, isEqual);

    return {
        createSelector
    };
}

export default useCreateSelector;