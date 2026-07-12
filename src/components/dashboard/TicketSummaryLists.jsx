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

export default TicketSummaryLists;
