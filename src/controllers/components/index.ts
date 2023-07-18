import useHeader from "./Header";
import useCreateModal from "./CreateModal";
import useEditModal from "./EditModal";

const useComponents = () => {
    return {
        useHeader,
        useCreateModal,
        useEditModal
    };
}

export default useComponents;