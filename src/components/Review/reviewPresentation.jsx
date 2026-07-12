import dayjs from "dayjs";

export const urgencyStyle = {
    Rosso: "bg-red-100 text-red-700",
    Giallo: "bg-amber-100 text-amber-700",
    Verde: "bg-green-100 text-green-700",
};

export const statusStyle = {
    Aperto: "bg-sky-100 text-sky-700",
    Chiuso: "bg-emerald-200 text-emerald-700",
    "In Progress": "bg-indigo-100 text-indigo-700",
    Rifiutato: "bg-rose-100 text-rose-700",
};

export const optionLabel = (options, value) => options?.find((option) => option?.value === value)?.label || "-";

export function apiErrorMessage(error) {
    const response = error?.response?.data;
    if (typeof response === "string") return response;
    if (typeof response?.message === "string") return response.message;
    if (typeof response?.error === "string") return response.error;
    return "";
}

export function reviewDate(date) {
    if (!date) return "Non impostata";
    const parsed = dayjs(date);
    return parsed.isValid() ? parsed.format("DD/MM/YYYY") : date;
}

export const ReadOnlyField = ({ label, value, required = false, tone }) => (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-medium text-slate-500">
            {required && <span className="mr-1 text-red-500">*</span>}{label}
        </p>
        {tone ? <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>{value || "-"}</span>
            : <p className="text-base font-semibold text-slate-800">{value || "-"}</p>}
    </div>
);
