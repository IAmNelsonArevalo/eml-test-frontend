import useScreenHooks from "./screens";
import useComponents from "./components";

const useControllers = () => {
    return {
        useScreenHooks,
        useComponents
    };
}

export default useControllers;