import React from "react";
import EditModal from "../EditModal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import useAuthActions from "../../../api/actions/auth";

interface ITable {
    headings: Array<string>;
    data: Array<any>;
    slot: any;
    document_types: any;
}

const Table: React.FC<ITable> = ({
                                     headings,
                                     data,
                                     slot,
    document_types
                                 }): JSX.Element => {
    const dispatch: any = useDispatch();
    const user = useSelector((state: any) => state.auth).user;
    const {actLogout} = useAuthActions();
    /** States */
    const [data_edit, setDataEdit] = React.useState({});
    const [openModal, setOpenModal] = React.useState(false);

    const deleteUser = async (id: number) => {
        const res = await axios.delete(`/users/delete-user/${id}`);
        if(res.data.transaction.status) {


            if(id === user.id) {
                dispatch(actLogout({
                    onError: (error: any) => console.log(error),
                    onSuccess: () => {
                        window.location.href = "/login";
                    }
                }))
            } else {
                window.location.reload()
            }
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 w-full">
                <thead>
                <tr>
                    {
                        headings.map((item: string, index: number) => (
                            <th
                                key={index}
                                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {item}
                            </th>
                        ))
                    }
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Opciones
                    </th>
                    {/* Agrega más encabezados de columna según tus necesidades */}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    data.map((item: any, index: number) => (
                        <tr key={index}>
                            {
                                Object.keys(item).map((key: string, keyIndex: number) => (
                                    <td className="px-4  py-4 text-center text-sm leading-5 text-black"
                                        key={keyIndex}>
                                        {
                                            slot[key] ? slot[key](item) : item[key]
                                        }
                                    </td>
                                ))
                            }
                            <td className="flex justify-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <button
                                    className="bg-blue-500 shadow-lg mr-[10px] p-[10px] rounded-[10px] text-white"
                                    onClick={() => {
                                        setDataEdit(item);
                                        setOpenModal(true);
                                    }}
                                >Editar</button>
                                <button
                                    onClick={() => deleteUser(item.id)}
                                    className="bg-[#d50000] shadow-lg mr-[10px] p-[10px] rounded-[10px] text-white">Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <EditModal open={openModal} onClose={() => {
                setOpenModal(false);
                setDataEdit({});
            }} options={document_types} data_edit={data_edit}/>
        </div>
    );
}

export default Table;