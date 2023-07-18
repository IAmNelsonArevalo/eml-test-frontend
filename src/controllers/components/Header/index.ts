import useApi from "api";
import useSelectors from "models/selectors";
import React from "react";

const useHeader = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actLogout} = useAuthActions();

    /** Models */
    const {useSelector, useAuthSelectors} = useSelectors();
    const {authSelector} = useAuthSelectors();
    const {user} = useSelector(authSelector)

    const closeSession = () => {
        dispatch(actLogout({
            onError: (error) => console.error("Close Session: ", error),
            onSuccess: () => window.location.href = "/login"
        }))
    }

    React.useEffect(() => {
        if(!user.id) {
            if(typeof window !== "undefined") {
                window.location.href = "/login"
            }
        }
    }, [user])

    return {
        closeSession,
        user
    };
}

export default useHeader;