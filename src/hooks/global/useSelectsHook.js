import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSelects = () => {
    const getSelects = async () => {
        const { data } = await axios.get(`https://customerservicebe.testingelmo.com/api/v1/selects?allSelects=companies,customers,roles,permissions`);
        return data;
    };

    return useQuery({
        queryKey: ["selects"],
        queryFn: getSelects,
    });
};

export const useSelects2 = (updateBranches) => {
    return useMutation({
        mutationFn: (value) => axios.get(`https://customerservicebe.testingelmo.com/api/v1/selects?allSelects=branches=${value}`),

        onSuccess: (response) => {
            updateBranches(response.data);
        },
    });
};
