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
