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
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "3",
            title: "Ruolo",
            dataIndex: "roleName",
        },
        {
            key: "4",
            title: "Azienda",
            dataIndex: "companyName",
            render: (value) => value || "—",
        },
        {
            key: "5",
            title: "Filiale",
            dataIndex: "branchName",
            render: (value) => value || "—",
        },
        {
            key: "6",
            title: "Stato",
            dataIndex: "status",
            render: (value) => (
                <StatusBadge
                    where={"customer"}
                    statusCode={value}
                />
            ),
        },
        {
            key: "7",
            title: "",
            render: (_, record) => {
                return (
                    <TableButtons
                        deleteRow={GetPermission("delete_user") ? deleteFunction : false}
                        editRow={GetPermission("edit_user") ? editFunction : false}
                        record={record?.key}
                        status={record?.status}
                        withStatus={GetPermission("change_user_status")}
                        changeStatus={changeStatus || (() => {})}
                    />
                );
            },
        },
    ];
};
