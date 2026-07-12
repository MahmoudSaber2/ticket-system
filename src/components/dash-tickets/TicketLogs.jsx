import { Empty, Spin } from "antd";
import dayjs from "dayjs";

const badges = {
    0: ["Aperto", "border-orange-200 bg-orange-50 text-orange-700"],
    1: ["Approvato", "border-emerald-200 bg-emerald-50 text-emerald-700"],
    2: ["In Progress", "border-indigo-200 bg-indigo-50 text-indigo-700"],
    3: ["Rifiutato", "border-rose-200 bg-rose-50 text-rose-700"],
};

const TicketLogs = ({ logs, loading, fetching, failed }) => (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-800">Log approvazione ticket</h2>
            {fetching && !loading && <p className="text-xs text-slate-500">Aggiornamento...</p>}
        </div>
        {loading ? <div className="flex min-h-[250px] items-center justify-center"><Spin size="large" /></div>
            : failed ? <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">Impossibile caricare i logs.</div>
                : logs.length === 0 ? <Empty description="Nessun log disponibile" />
                    : <div className="space-y-3">{logs.map((log, index) => {
                        const viewed = String(log.text || "").toLowerCase().includes("view");
                        const badge = viewed ? ["Visualizzato", "border-sky-200 bg-sky-50 text-sky-700"] : badges[Number(log.status)] || ["Evento", "border-slate-200 bg-slate-50 text-slate-900"];
                        return (
                            <article key={log.ticketLogId || `${log.createdAt}-${index}`} className="rounded-lg border bg-white p-4 shadow-sm">
                                <div className="flex justify-between gap-2">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge[1]}`}>{badge[0]}</span>
                                    <span className="text-xs text-slate-500">{log.createdAt ? dayjs(log.createdAt, ["DD/MM/YYYY HH:mm", "YYYY-MM-DD HH:mm:ss"]).format("DD/MM/YYYY HH:mm") : "-"}</span>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-700">{log.text || "Nessuna descrizione disponibile."}</p>
                            </article>
                        );
                    })}</div>}
    </section>
);

export default TicketLogs;
