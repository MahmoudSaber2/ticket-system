import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

function filenameFromHeader(header) {
    const match = header?.match(/filename="?([^";]+)"?/i);
    return match?.[1]?.replace(/[^a-zA-Z0-9._-]/g, "_") || "tickets.csv";
}

export const useDashboardReport = (filter) => useQuery({
    queryKey: ["ticketDashboard", filter],
    queryFn: async () => {
        const { data } = await axios.get("admin/tickets/dashboard", { params: { filter } });
        return data.data;
    },
});

export const useTicketExport = () => useMutation({
    mutationFn: async (filter) => {
        const response = await axios.get("admin/tickets/export", {
            params: { filter },
            responseType: "blob",
        });
        const downloadUrl = URL.createObjectURL(response.data);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = filenameFromHeader(response.headers["content-disposition"]);
        anchor.click();
        URL.revokeObjectURL(downloadUrl);
    },
    onError: () => toast.error("Export failed or is not permitted."),
});
