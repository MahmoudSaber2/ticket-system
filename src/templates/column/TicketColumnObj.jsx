import { StatusBadge, TableButtons } from "../../components/common";

export const TicketColumnObj = ({ deleteFunction, editFunction, changeStatus }) => {
    return [
        {
            key: "1",
            title: "Nome",
            dataIndex: "name",
        },
        {
            key: "2",
            title: "Azienda",
            dataIndex: "companyName",
        },
        {
            key: "3",
            title: "Descrizione",
            dataIndex: "description",
        },
        {
            key: "4",
            title: "Urgenza",
            dataIndex: "status",
            render: (value) => <StatusBadge statusCode={value} />,
        },
        {
            key: "5",
            title: "",
            render: (_, record) => {
                return (
                    <TableButtons
                        deleteRow={deleteFunction}
                        editRow={editFunction}
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
