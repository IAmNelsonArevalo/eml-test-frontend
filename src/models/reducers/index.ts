import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/** Reducers */
import useAuthReducers from "./auth";

const reducerPersist = persistReducer(
    {
        key: "eml-root",
        storage,
    },
    combineReducers({
        ...useAuthReducers(),
    })
);

export default reducerPersist;
