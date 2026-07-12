import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (company) => axios.put("admin/companies/update", company),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["companies"] }); toast.success("Company updated"); },
        onError: () => toast.error("Company could not be updated"),
    });
};
