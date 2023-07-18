import useApi from "api";
import useModels from "models";

const useHome = () => {
    /** Api */
    const {useActions} = useApi();
    const {dispatch, useAuthActions} = useActions();
    const {actChangeStatus, actLogout} = useAuthActions();

    /** Models */
    const {useSelectors} = useModels();
    const {useSelector, useAuthSelectors} = useSelectors();
    const {authSelector} = useAuthSelectors();
    const user = useSelector(authSelector).user;

    const changeStatus = (id: number) => {
        dispatch(actChangeStatus({
            id,
            onError: (error: any) => console.error("CHANGE_STATUS: ", error),
            onSuccess: () => {
                if(id === user.id) {
                    dispatch(actLogout({
                        onError: (error: any) => console.error("CLOSE SESSION", error),
                        onSuccess: () => window.location.href = "/login"
                    }))
                } else {
                    window.location.reload();
                }
            }
        }))
    }

    return {
        changeStatus
    };
}

export default useHome;