const DistributionChart = ({ title, rows = [] }) => {
    const maximum = Math.max(...rows.map((row) => Number(row.total ?? row.count ?? 0)), 1);

    return (
        <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            {rows.length === 0 ? <p className="text-slate-500">Nessun dato</p> : rows.map((row) => {
                const count = Number(row.total ?? row.count ?? 0);
                const label = row.label ?? row.key ?? row.status ?? row.importance ?? row.branchName ?? "Sconosciuto";
                return (
                    <div key={label} className="mb-3">
                        <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{count}</span></div>
                        <div className="h-2 rounded bg-slate-100" role="meter" aria-label={`${label}: ${count}`} aria-valuenow={count} aria-valuemax={maximum}>
                            <div className="h-2 rounded bg-blue-600" style={{ width: `${(count / maximum) * 100}%` }} />
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default DistributionChart;
