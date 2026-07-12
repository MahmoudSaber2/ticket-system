import { MailOutlined } from "@ant-design/icons";
import { Avatar, Button, Tag, Tooltip } from "antd";
import { StatusBadge, TableButtons } from "../../components/common";
import { GetPermission } from "../../utils/Functions";

const roleLabels = {
    company_owner: "Proprietario",
    company_manager: "Responsabile azienda",
    branch_manager: "Responsabile filiale",
    employee: "Dipendente",
};

export const AdminColumnObj = ({ deleteFunction, editFunction, changeStatus, resendInvitation }) => {
    return [
        {
            key: "1",
            title: "Nome",
            dataIndex: "name",
            render: (value, record) => (
                <div className="flex min-w-44 items-center gap-3">
                    <Avatar src={record?.avatar} size={36}>{value?.charAt(0)}</Avatar>
                    <div>
                        <p className="font-medium text-slate-900">{value}</p>
                        <p className="text-xs text-slate-500">@{record?.username}</p>
                    </div>
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
            render: (value) => <Tag color="blue">{roleLabels[value] || value || "—"}</Tag>,
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
            fixed: "right",
            width: 190,
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        {record?.pendingInvitationId && GetPermission("create_user") && <Tooltip title="Invia nuovamente l'invito">
                            <Button
                                aria-label="Invia nuovamente l'invito"
                                icon={<MailOutlined />}
                                onClick={() => resendInvitation(record.pendingInvitationId)}
                            />
                        </Tooltip>}
                        <TableButtons
                            deleteRow={GetPermission("delete_user") ? deleteFunction : false}
                            editRow={GetPermission("edit_user") ? editFunction : false}
                            record={record?.key}
                            status={record?.status}
                            withStatus={GetPermission("change_user_status")}
                            changeStatus={changeStatus || (() => {})}
                        />
                    </div>
                );
            },
        },
    ];
};
