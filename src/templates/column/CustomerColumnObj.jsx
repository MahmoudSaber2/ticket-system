import { StatusBadge, TableButtons } from "../../components/common";
import { GetPermission } from "../../utils/Functions";

export const CustomerColumnObj = ({ deleteFunction, editFunction, changeStatus }) => {
    return [
        {
            key: "1",
            title: "Utente Nome",
            dataIndex: "customerName",
        },
        {
            key: "2",
            title: "Azienda",
            dataIndex: "companyName",
        },
        {
            key: "3",
            title: "Stato",
            dataIndex: "status",
            render: (value) => <StatusBadge statusCode={value} />,
        },
        {
            key: "4",
            title: "",
            render: (_, record) => {
                return (
                    <TableButtons
                        deleteRow={GetPermission("delete_customer") ? deleteFunction : false}
                        editRow={GetPermission("edit_customer") ? editFunction : false}
                        record={record?.key}
                        status={record?.status}
                        withStatus={false}
                        changeStatus={changeStatus || (() => {})}
                    />
                );
            },
        },
    ];
};
