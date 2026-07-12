import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import { Collapse, Empty, Tag } from "antd";

const roleLabels = {
    "مدير": "Amministratore interno",
    company_owner: "Proprietario",
    company_manager: "Responsabile azienda",
    branch_manager: "Responsabile filiale",
    employee: "Dipendente",
};

const permissionLabel = (permission) => permission.replaceAll("_", " ");

const RoleMatrix = ({ templates = [] }) => {
    if (!templates.length) return <Empty description="Nessun modello disponibile" />;

    const permissionNames = [...new Set(templates.flatMap((template) => template.permissions))];
    return (
        <section className="rounded-xl border bg-white p-5" aria-labelledby="role-matrix-title">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 id="role-matrix-title" className="text-lg font-semibold text-slate-900">Matrice ruoli e permessi</h2>
                    <p className="mt-1 text-sm text-slate-600">Modelli di sistema protetti, separati per tipo di account.</p>
                </div>
                <Tag icon={<LockOutlined />} color="blue">Sola lettura</Tag>
            </div>
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead><tr className="border-b bg-slate-50">
                        <th className="sticky left-0 bg-slate-50 p-3 font-medium text-slate-700">Permesso</th>
                        {templates.map((template) => <th key={template.name} className="p-3 text-center font-medium text-slate-700">
                            <span className="block">{roleLabels[template.name] || template.name}</span>
                            <span className="text-xs font-normal text-slate-500">{template.accountType}</span>
                        </th>)}
                    </tr></thead>
                    <tbody>{permissionNames.map((permission) => <tr key={permission} className="border-b last:border-0 hover:bg-slate-50">
                        <th className="sticky left-0 bg-white px-3 py-2 font-normal text-slate-700">{permissionLabel(permission)}</th>
                        {templates.map((template) => <td key={template.name} className="px-3 py-2 text-center">
                            {template.permissions.includes(permission) ? <CheckOutlined className="text-emerald-600" aria-label="Consentito" /> : <span className="text-slate-300">—</span>}
                        </td>)}
                    </tr>)}</tbody>
                </table>
            </div>
            <Collapse className="mt-4 md:hidden" items={templates.map((template) => ({
                key: template.name,
                label: roleLabels[template.name] || template.name,
                children: <div className="flex flex-wrap gap-2">{template.permissions.map((permission) => <Tag key={permission}>{permissionLabel(permission)}</Tag>)}</div>,
            }))} />
        </section>
    );
};

export default RoleMatrix;
