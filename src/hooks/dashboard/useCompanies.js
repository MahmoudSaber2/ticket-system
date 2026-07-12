import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCompanies = (page) => useQuery({
    queryKey: ["companies", page],
    queryFn: async () => {
        const { data } = await axios.get("admin/companies", { params: { page: page.current, pageSize: page.pageSize } });
        return data;
    },
    placeholderData: keepPreviousData,
});
