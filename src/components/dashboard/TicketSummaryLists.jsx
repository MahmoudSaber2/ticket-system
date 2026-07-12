import { Tag } from "antd";
import dayjs from "dayjs";

const TicketRows = ({ title, rows }) => (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        {rows.length === 0 ? <p className="text-slate-500">Nessun dato</p> : (
            <ul className="divide-y">
                {rows.slice(0, 8).map((ticket) => (
                    <li key={ticket.ticketId ?? ticket.id} className="flex justify-between gap-4 py-3 text-sm">
                        <span className="truncate">{ticket.ticketNumber ?? ticket.description ?? `#${ticket.ticketId}`}</span>
                        <span className="shrink-0 text-slate-500">{ticket.statusLabel ?? ticket.status ?? ticket.createdAt}</span>
                    </li>
                ))}
            </ul>
        )}
    </section>
);

const TicketSummaryLists = ({ oldestOpen = [], recentActivity = [] }) => (
    <div className="grid gap-4 lg:grid-cols-2">
        <TicketRows title="Ticket aperti più vecchi" rows={oldestOpen} />
        <TicketRows title="Attività recente" rows={recentActivity} />
    </div>
);

export const SlaAlerts = ({ rows = [] }) => (
    <section className="rounded-xl border bg-white p-5 shadow-sm" aria-labelledby="sla-alerts-title">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 id="sla-alerts-title" className="text-lg font-semibold">Avvisi SLA</h2>
            <span className="text-sm text-slate-500">Scadenze attive ordinate per urgenza</span>
        </div>
        {rows.length === 0 ? <p className="text-sm text-slate-500">Nessuna scadenza attiva.</p> : (
            <ul className="divide-y">{rows.map((ticket) => <li key={ticket.ticketId} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                <div>
                    <p className="font-medium text-slate-900">{ticket.ticketNumber}</p>
                    <p className="text-slate-500">{ticket.companyName}{ticket.branchName ? ` · ${ticket.branchName}` : ""}</p>
                </div>
                <div className="flex items-center gap-2">
                    {ticket.escalatedAt && <Tag color="red">Escalation inviata</Tag>}
                    <Tag color={ticket.isOverdue ? "error" : "warning"}>
                        {ticket.isOverdue ? "Scaduto" : "Scade"} {dayjs(ticket.dueAt).format("DD/MM/YYYY HH:mm")}
                    </Tag>
                </div>
            </li>)}</ul>
        )}
    </section>
);

export default TicketSummaryLists;
