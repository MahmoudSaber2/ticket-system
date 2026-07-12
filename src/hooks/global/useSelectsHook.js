import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSelects = () => {
    const getSelects = async () => {
        const { data } = await axios.get("selects?allSelects=companies,customers,roles,permissions,parameters=1");
        return data;
    };

    return useQuery({
        queryKey: ["selects"],
        queryFn: getSelects,
    });
};

export const useSelects2 = (updateBranches) => {
    return useMutation({
        mutationFn: (value) => axios.get(`selects?allSelects=branches=${value}`),

        onSuccess: (response) => {
            updateBranches(response.data);
        },
    });
};

export const useTicketSubmissionOptions = () => useQuery({
    queryKey: ["ticket-submission-options"],
    queryFn: async () => {
        const { data } = await axios.get("selects?allSelects=branches,parameters=1");
        return data;
    },
});

export const useTeamOptions = () => useQuery({
    queryKey: ["team-options"],
    queryFn: async () => {
        const { data } = await axios.get("selects?allSelects=companies,roles");
        return data;
    },
});

export const useTeamBranches = (companyId, enabled) => useQuery({
    queryKey: ["team-branches", companyId],
    enabled,
    queryFn: async () => {
        const companyFilter = companyId ? `=${companyId}` : "";
        const { data } = await axios.get(`selects?allSelects=branches${companyFilter}`);
        return data;
    },
});
