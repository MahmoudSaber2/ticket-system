import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (branch) => axios.post("admin/branches/create", branch),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["companies"] }); toast.success("Branch created"); },
        onError: () => toast.error("Branch could not be created"),
    });
};

export const useUpdateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (branch) => axios.put("admin/branches/update", branch),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["companies"] }); toast.success("Branch updated"); },
        onError: () => toast.error("Branch could not be updated"),
    });
};
