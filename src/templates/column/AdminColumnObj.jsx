import { Avatar } from "antd";
import { StatusBadge, TableButtons } from "../../components/common";
import { GetPermission } from "../../utils/Functions";

export const AdminColumnObj = ({ deleteFunction, editFunction, changeStatus }) => {
    return [
        {
            key: "1",
            title: "Nome",
            dataIndex: "name",
            render: (value, record) => (
                <div className="flex items-center justify-center gap-2">
                    <Avatar
                        src={record?.avatar}
                        size={"small"}
                    />
                    <h1>{value}</h1>
                </div>
            ),
        },
        {
            key: "2",
            title: "Numero di telefono",
            dataIndex: "phone",
        },
        {
            key: "3",
            title: "Indirizzo",
            dataIndex: "address",
        },
        {
            key: "4",
            title: "Stato",
            dataIndex: "status",
            render: (value) => <StatusBadge statusCode={value} />,
        },
        {
            key: "5",
            title: "",
            render: (_, record) => {
                return (
                    <TableButtons
                        deleteRow={GetPermission("delete_user") ? deleteFunction : false}
                        editRow={GetPermission("delete_user") ? editFunction : false}
                        record={record?.key}
                        status={record?.status}
                        withStatus={true}
                        changeStatus={changeStatus || (() => {})}
                    />
                );
            },
        },
    ];
};
