import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSelects = () => {
    const getSelects = async () => {
        const { data } = await axios.get("selects", {
            params: { allSelects: "companies,customers,roles,permissions,parameters=1" },
        });
        return data;
    };

    return useQuery({
        queryKey: ["selects"],
        queryFn: getSelects,
    });
};

export const useSelects2 = (updateBranches) => {
    return useMutation({
        mutationFn: (value) => axios.get("selects", { params: { allSelects: `branches=${value}` } }),

        onSuccess: (response) => {
            updateBranches(response.data);
        },
    });
};

export const useLegacyTicketSelects = () => {
    return useQuery({
        queryKey: ["legacyTicketSelects"],
        queryFn: async () => {
            const { data } = await axios.get("public/legacy-ticket-options");
            return data;
        },
    });
};

export const useLegacyTicketBranches = (updateBranches) => {
    return useMutation({
        mutationFn: (companyId) => axios.get("public/legacy-ticket-options/branches", { params: { companyId } }),
        onSuccess: ({ data }) => updateBranches(data),
    });
};
