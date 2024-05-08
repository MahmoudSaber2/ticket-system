import { keepPreviousData, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import { sumErrors } from "../../../utils/Functions";

export const useAdmins = (pagination, setPagination, resetParamPageId) => {
    const getAdmins = async () => {
        const response = await axios.get("admin/users", {
            params: {
                page: pagination?.current,
                pageSize: pagination?.pageSize,
                filter: pagination?.filter,
            },
        });

        const {
            data: {
                pagination: { total, per_page: pageSize, current_page: current },
                result: { users },
            },
        } = response;

        setPagination({ position: ["bottomLeft"], total, pageSize, current });
        resetParamPageId();
        return users.map((user) => ({ ...user, key: user.userId }));
    };

    return useQuery({
        queryKey: ["admins", pagination],
        queryFn: () => getAdmins(),
        placeholderData: keepPreviousData,
        keepPreviousData: true,
    });
};

export const useCreateAdmin = (closeModel) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) =>
            axios.post(`admin/users/create`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admins"]);
            toast.success("Admin created successfully");
            closeModel();
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            const typeMessage = typeof message;

            const errors = typeMessage === "string" ? [message] : sumErrors(message);
            errors.forEach((error) => toast.error(error));
        },
    });
};

export const useAdminsEdit = (id, updateForm) => {
    const getAdmin = async () => {
        const response = await axios.get(`admin/users/edit`, { params: { userId: id } });
        updateForm(response.data);
        return response.data;
    };
    return useQuery({
        queryKey: ["adminEdit", id],
        queryFn: () => getAdmin(),
        enabled: !!id,
    });
};

export const useUpdateAdmin = (closeModel) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) =>
            axios.post(`admin/users/update`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admins"]);
            toast.success("Admin updated successfully");
            closeModel();
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            const typeMessage = typeof message;

            const errors = typeMessage === "string" ? [message] : sumErrors(message);
            errors.forEach((error) => toast.error(error));
        },
    });
};

export const useChangeStatus = (refetch) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) => axios.post(`admin/users/changestatus`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["admins"]);
            toast.success("Admin status updated successfully");
            refetch();
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            const typeMessage = typeof message;

            const errors = typeMessage === "string" ? [message] : sumErrors(message);
            errors.forEach((error) => toast.error(error));
        },
    });
};

export const useDeleteAdmin = (refetch) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (params) => axios.delete(`admin/users/delete`, { params }),
        onSuccess: () => {
            queryClient.invalidateQueries(["admins"]);
            toast.info("Admin deleted successfully");
            refetch();
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            const typeMessage = typeof message;

            const errors = typeMessage === "string" ? [message] : sumErrors(message);
            errors.forEach((error) => toast.error(error));
        },
    });
};
