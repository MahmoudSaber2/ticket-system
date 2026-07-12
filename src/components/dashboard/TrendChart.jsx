function pointsFor(rows, key, width, height) {
    const maximum = Math.max(...rows.flatMap((row) => [Number(row.created || 0), Number(row.closed || 0)]), 1);
    return rows.map((row, index) => {
        const x = rows.length === 1 ? width / 2 : (index / (rows.length - 1)) * width;
        const y = height - (Number(row[key] || 0) / maximum) * height;
        return `${x},${y}`;
    }).join(" ");
}

const TrendChart = ({ rows = [] }) => (
    <section className="rounded-xl border bg-white p-5 shadow-sm xl:col-span-2">
        <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Creati e chiusi</h2>
            <p className="text-xs text-slate-500"><span className="text-blue-600">● Creati</span> <span className="ml-2 text-emerald-600">● Chiusi</span></p>
        </div>
        {rows.length === 0 ? <p className="text-slate-500">Nessun dato</p> : (
            <svg viewBox="0 0 700 220" className="h-56 w-full" role="img" aria-label="Created versus closed ticket trend">
                <polyline fill="none" stroke="#2563eb" strokeWidth="4" points={pointsFor(rows, "created", 700, 200)} />
                <polyline fill="none" stroke="#059669" strokeWidth="4" points={pointsFor(rows, "closed", 700, 200)} />
            </svg>
        )}
    </section>
);

export default TrendChart;
