import { TableButtons } from "../../components/common";
import { GetPermission } from "../../utils/Functions";

export const RoleColumnObj = ({ deleteFunction, editFunction, changeStatus }) => {
    return [
        {
            key: "1",
            title: "Ruolo Codice",
            dataIndex: "id",
        },
        {
            key: "2",
            title: "Ruolo",
            dataIndex: "name",
        },
        {
            key: "3",
            title: "",
            render: (_, record) => {
                return (
                    <TableButtons
                        deleteRow={GetPermission("delete_role") ? deleteFunction : false}
                        editRow={GetPermission("delete_role") ? editFunction : false}
                        record={record?.key}
                        status={record?.status}
                        withStatus={false}
                        changeStatus={changeStatus || false}
                    />
                );
            },
        },
    ];
};
