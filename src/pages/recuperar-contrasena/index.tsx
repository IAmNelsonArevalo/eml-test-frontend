import {NextPage} from "next";
import Image from "next/image";
/** Local Modules */
import useControllers from "controllers";

const PasswordRecovery: NextPage = (): JSX.Element => {
    /** Controllers */
    const {useScreenHooks} = useControllers();
    const {usePasswordRecovery} = useScreenHooks();
    const {register, handleSubmit, changePassword} = usePasswordRecovery();

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg max-w-[800px] w-full max-800:w-[90%]">
                <div className="flex justify-center mb-[30px]">
                    <Image src="https://eml.co/page/img/logo.png" alt="Logo" width={130} height={50} priority={true}/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-[#1b254b]">Recuperar contrasena</h2>
                <form onSubmit={handleSubmit(changePassword)}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-[#1b254b]"
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            {...register("email", {required: true})}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            {...register("password", {required: true})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 w-full mb-[20px] py-2 text-white bg-[#374e9a] rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Recuperar Contrasena
                    </button>
                </form>
                <div className="mt-4 text-center text-[#1b254b]">
                    ¿Te acuerdas de la contrasena?{' '}
                    <a href="/login" className="text-[#374e9a] hover:underline">
                        Ingresa aquí
                    </a>
                    .
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    return {
        props: {
            headers: {
                title: "Login - EML Test | EML SAS",
                description: "Login page of the eml test.",
                keywords: "Eml, Tests, Selection, Login",
                og_image: "https://eml.co/page/img/EML.png",
                og_title: "Home - EML Test | EML SAS",
                og_description: "Initial page of the eml test."
            },
        }
    }
}

export default PasswordRecovery;