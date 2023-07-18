import useLogin from "./login";
import useRegister from "./register";
import useHome from "./home";
import usePasswordRecovery from "./password-recovery";

const useScreenHooks = () => {
    return {
        useLogin,
        useRegister,
        useHome,
        usePasswordRecovery
    };
}

export default useScreenHooks;