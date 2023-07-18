import React from "react";
import {NextPage} from "next";
import axios from "axios";
import {format} from "date-fns";
/** Local Modules */
import useViews from "views";
import {IHomeProps} from "models/interfaces/statuses.interfaces";
import useControllers from "../controllers";

const Home: NextPage<IHomeProps> = ({
                                        document_types
                                    }): JSX.Element => {
    console.log(document_types)

    /** Views */
    const {useComponents} = useViews();
    const {Table, CreateModal} = useComponents();

    /** States */
    const [closeModalCreate, setCloseModalCreate] = React.useState(false);

    const [users, setUsers] = React.useState([])

    /** Controllers */
    const {useScreenHooks} = useControllers();
    const {useHome} = useScreenHooks();
    const {changeStatus} = useHome();

    const headings: any = ["id", "Nombre", "Apellidos", "Correo Electronico", "Documento", "Telefono", , "Fecha Creacion", "Fecha Actualizacion", "Estado", "Tipo de documento",];

    const status = (item: any) => {
        const {status} = item;
        return (
            <div className="shadow-md py-[10px] px-[10px] flex justify-center items-center rounded-[10px] cursor-pointer"
                 style={{background: status.color_status}} onClick={() => changeStatus(item.id)}>
                <p className="text-white">{status.translate_status}</p>
            </div>
        )
    }

    const document_type = (item: any) => {
        const {document_type} = item;
        return <p className="text-black">{document_type.name} {`(${document_type.acronym})`}</p>
    }

    const created_at = (item: any) => {
        const newDate = format(new Date(item['created_at']), 'yyyy-MM-dd HH:mm:ss')
        return <p>{newDate}</p>
    }

    const updated_at = (item: any) => {
        const newDate = format(new Date(item['updated_at']), 'yyyy-MM-dd HH:mm:ss')
        return <p>{newDate}</p>
    }

    React.useEffect(() => {
        axios({url: "http://127.0.0.1:8000/api/users/get-users", method: "GET"}).then((res) => setUsers(res.data.data));
    }, [])

    const slot = {
        document_type,
        status,
        created_at,
        updated_at
    }

    return (
        <React.Fragment>
            <div className="my-5">
                <button
                    className="py-[10px] px-[20px] shadow-md bg-[#374e9a] rounded-[10px] text-white"
                    onClick={() => setCloseModalCreate(true)}
                >Crear Usuario
                </button>
            </div>
            <Table headings={headings} data={users} slot={slot} document_types={document_types}/>
            <CreateModal open={closeModalCreate} onClose={() => setCloseModalCreate(false)} options={document_types}/>
        </React.Fragment>
    )
}

export const getServerSideProps = async () => {
    const resData = await axios({url: "http://127.0.0.1:8000/api/users/get-users", method: "GET"});


    const res = await axios.get("http://127.0.0.1:8000/api/auth/get-document-types");
    const {data: document_types} = res.data;
    return {
        props: {
            headers: {
                title: "Home - EML Test | EML SAS",
                description: "Initial page of the eml test.",
                keywords: "Eml, Tests, Selection, Home",
                og_image: "https://eml.co/page/img/EML.png",
                og_title: "Home - EML Test | EML SAS",
                og_description: "Initial page of the eml test."
            },
            users: resData.data.data,
            document_types
        }
    }
}

export default Home;