import {NextPage} from "next";
import Image from "next/image";
/** Local Modules */
import useControllers from "controllers";

const Login: NextPage = (): JSX.Element => {
    /** Controllers */
    const {useScreenHooks} = useControllers();
    const {useLogin} = useScreenHooks();
    const {register, handleLogin, handleSubmit} = useLogin();

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg max-w-[800px] w-full max-800:w-[90%]">
                <div className="flex justify-center mb-[30px]">
                    <Image src="https://eml.co/page/img/logo.png" alt="Logo" width={130} height={50} priority={true}/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-[#1b254b]">Iniciar sesión</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                        Ingresar
                    </button>
                    <div className="flex items-center justify-center">
                        <a href="/recuperar-contrasena" className="text-[#374e9a] hover:underline">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </form>
                <div className="mt-4 text-center text-[#1b254b]">
                    ¿No tienes una cuenta?{' '}
                    <a href="/register" className="text-[#374e9a] hover:underline">
                        Regístrate aquí
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

export default Login;