const metricLabels = {
    total: "Totale",
    open: "Aperti",
    inProgress: "In corso",
    closed: "Chiusi",
    reopened: "Riaperti",
    overdue: "Scaduti",
    averageResolutionHours: "Risoluzione media (ore)",
};

const MetricCards = ({ metrics = {} }) => (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ticket metrics">
        {Object.entries(metricLabels).map(([key, label]) => (
            <article key={key} className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{metrics[key] ?? "—"}</p>
            </article>
        ))}
    </section>
);

export default MetricCards;
