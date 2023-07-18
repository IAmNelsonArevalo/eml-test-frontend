import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
/** Local Modules */
import useModels from "models";

const useStoreConfig = () => {
    /** Models */
    const { reducerPersist } = useModels();

    const bindMiddleware = (middleware: any) => {
        if(process.env.NODE_ENV !== "production") {
            const {composeWithDevTools} = require('redux-devtools-extension');
            return composeWithDevTools(applyMiddleware(...middleware));
        }
    }

    const store = createStore(reducerPersist, bindMiddleware([thunk]));

    const persist = persistStore(store);

    return {
        store,
        persist
    };
};

export default useStoreConfig;
