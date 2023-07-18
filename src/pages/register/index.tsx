import React from "react";
import {NextPage} from "next";
import Image from "next/image";
/** Local Modules */
import useControllers from "controllers";
import useViews from "views";
import useAuthProviders from "../../api/providers/auth";
import axios from "axios";

const Register: NextPage = (props: any): JSX.Element => {
    const {document_types} = props;

    /** Controllers */
    const {useScreenHooks} = useControllers();
    const {useRegister} = useScreenHooks();
    const {control, handleRegister, handleSubmit} = useRegister();

    /** Views */
    const {useComponents} = useViews();
    const {Select, Input} = useComponents();

    const inputs = [
        {
            name: "name",
            label: "Nombre",
            type: "text",
        },
        {
            name: "last_name",
            label: "Apellidos",
            type: "text",
        },
        {
            name: "email",
            label: "Correo Electronico",
            type: "email",
        },
        {
            name: "phone",
            label: "Numero de telefono",
            type: "number",
        },
        {
            name: "document_type",
            label: "Tipo de documento",
            type: "select",
        },
        {
            name: "document",
            label: "Numero de documento",
            type: "number",
        },
        {
            name: "password",
            label: "Contrasena",
            type: "password",
        },
        {
            name: "confirm_password",
            label: "Confirma tu contrasena",
            type: "password",
        },
    ]

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg max-w-[800px] w-full max-800:w-[90%]">
                <div className="flex justify-center mb-[30px]">
                    <Image src="https://eml.co/page/img/logo.png" alt="Logo" width={130} height={50} priority={true}/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-[#1b254b]">Registro</h2>
                <form className="grid grid-cols-2 gap-[10px]" onSubmit={handleSubmit(handleRegister)}>
                    {
                        inputs.map((item: any, index: number) => (
                            <React.Fragment key={index}>
                                {
                                    item.type === "select" ? (
                                        <Select
                                            control={control}
                                            name={item.name}
                                            label={item.label}
                                            option="name"
                                            value="name"
                                            options={document_types}
                                            placeholder="Selecciona el tipo de documento..."
                                        />
                                    ) : (
                                        <Input
                                            control={control}
                                            name={item.name}
                                            label={item.label}
                                            placeholder=""
                                            type={item.type}
                                        />
                                    )
                                }
                            </React.Fragment>
                        ))
                    }
                </form>
                <div className="mt-[30px]">
                    <button
                        onClick={handleSubmit(handleRegister)}
                        type="submit"
                        className="px-4 w-full mb-[20px] py-2 text-white bg-[#374e9a] rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Registrarse
                    </button>
                </div>
                <div className="mt-4 text-center text-[#1b254b]">
                    ¿ya tienes cuenta?{' '}
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
    const res = await axios.get("http://127.0.0.1:8000/api/auth/get-document-types");
    const {data} = res.data;

    return {
        props: {
            headers: {
                title: "Register - EML Test | EML SAS",
                description: "Register page of the eml test.",
                keywords: "Eml, Tests, Selection, Register",
                og_image: "https://eml.co/page/img/EML.png",
                og_title: "Register - EML Test | EML SAS",
                og_description: "Register page of the eml test."
            },
            document_types: data
        }
    }
}

export default Register;