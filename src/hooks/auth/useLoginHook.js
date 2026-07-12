import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSessionStore } from "../../store";
import { loadCurrentSession, sessionStatusFor } from "../../services/session";

export const useLogin = () => useMutation({
    mutationFn: (credentials) => axios.post("admin/auth/login", credentials, { skipAuth: true, skipRefresh: true }),
    onSuccess: async ({ data }) => {
        await loadCurrentSession(data.token);
        toast.success("Login Successful");
    },
    onError: (error) => {
        useSessionStore.getState().clearSession(sessionStatusFor(error));
        toast.error("Login Failed");
    },
});

export const UseSignOut = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => axios.post("admin/auth/logout", null, { skipRefresh: true }),
        onSettled: () => {
            useSessionStore.getState().clearSession();
            queryClient.clear();
            toast.success("تم تسجيل الخروج بنجاح");
        },
    });
};
