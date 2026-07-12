import { Tooltip } from "antd";
import { StatusBadge, TableButtons } from "../../components/common";
import { GetPermission } from "../../utils/Functions";

export const TicketColumnObj = ({ deleteFunction, viewFunction, changeStatus }) => {
    return [
        {
            key: "1",
            title: "Ticket Numero",
            dataIndex: "ticketNumber",
            render: (value) => <span className="font-mono text-sm font-medium text-slate-800">{value}</span>,
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
            render: (value) => <Tooltip title={value}>
                <p className="max-w-72 truncate text-slate-600">{value}</p>
            </Tooltip>,
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
            key: "8",
            title: "Date creazione",
            dataIndex: "createdAt",
        },
        {
            key: "9",
            title: "Date fine",
            dataIndex: "closedAt",
        },
        {
            key: "10",
            title: "",
            fixed: "right",
            width: 80,
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
