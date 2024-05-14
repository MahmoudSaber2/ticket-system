import { StatusBadge, TableButtons } from "../../components/common";
import { GetPermission } from "../../utils/Functions";

export const TicketColumnObj = ({ deleteFunction, viewFunction, changeStatus }) => {
    return [
        {
            key: "1",
            title: "Ticket Numero",
            dataIndex: "ticketNumber",
        },
        {
            key: "2",
            title: "Nome",
            dataIndex: "customerName",
        },
        {
            key: "3",
            title: "Azienda",
            dataIndex: "companyName",
        },
        {
            key: "4",
            title: "Descrizione",
            dataIndex: "description",
            render: (value) => (
                <div
                    className="truncate"
                    dangerouslySetInnerHTML={{ __html: value }}
                />
            ),
        },
        {
            key: "5",
            title: "Urgenza",
            dataIndex: "importance",
            render: (value) => (
                <StatusBadge
                    statusCode={value}
                    where={"isImportant"}
                />
            ),
        },
        {
            key: "6",
            title: "Stato",
            dataIndex: "status",
            render: (value) => <StatusBadge statusCode={value} />,
        },
        {
            key: "7",
            title: "Date creazione",
            dataIndex: "createdAt",
        },
        {
            key: "8",
            title: "Date fine",
            dataIndex: "closedAt",
        },
        {
            key: "9",
            title: "",
            render: (_, record) => {
                return (
                    <TableButtons
                        deleteRow={GetPermission("delete_ticket") ? deleteFunction : false}
                        show={GetPermission("edit_ticket") ? () => viewFunction(record?.key) : false}
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
