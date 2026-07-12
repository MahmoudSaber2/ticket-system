import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const responseFilename = (header, fallback) => header?.match(/filename="?([^";]+)"?/i)?.[1] || fallback;

export const useResourceExport = (resource) => useMutation({
    mutationFn: async (filter) => {
        const response = await axios.get(`admin/${resource}/export`, { params: { filter }, responseType: "blob" });
        const url = URL.createObjectURL(response.data);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = responseFilename(response.headers["content-disposition"], `${resource}.csv`);
        anchor.click();
        URL.revokeObjectURL(url);
    },
    onError: () => toast.error("Export failed or is not permitted."),
});
