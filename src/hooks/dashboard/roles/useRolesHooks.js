import { keepPreviousData, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import { sumErrors } from "../../../utils/Functions";

export const useRoles = (pagination, setPagination, resetParamPageId) => {
    const getRoles = async () => {
        const response = await axios.get("admin/roles", {
            params: {
                page: pagination?.current,
                pageSize: pagination?.pageSize,
                filter: pagination?.filter,
            },
        });

        const {
            data: {
                pagination: { total, per_page: pageSize, current_page: current },
                result: { roles },
            },
        } = response;

        setPagination({ position: ["bottomLeft"], total, pageSize, current });
        resetParamPageId();
        return roles.map((role) => ({ ...role, key: role.id }));
    };

    return useQuery({
        queryKey: ["roles", pagination],
        queryFn: () => getRoles(),
        placeholderData: keepPreviousData,
        keepPreviousData: true,
    });
};

export const useCreateRole = (closeModel) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) =>
            axios.post(`admin/roles/create`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["roles"]);
            toast.success("Role created successfully");
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

export const useRolesEdit = (id, updateForm) => {
    const getRole = async () => {
        const response = await axios.get(`admin/roles/edit`, { params: { roleId: id } });
        updateForm(response.data);
        return response.data;
    };
    return useQuery({
        queryKey: ["roleEdit", id],
        queryFn: () => getRole(),
        enabled: !!id,
    });
};

export const useUpdateRole = (closeModel) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) =>
            axios.put(`admin/roles/update`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["roles"]);
            toast.success("Role updated successfully");
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

export const useDeleteRole = (refetch) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (params) => axios.delete(`admin/roles/delete`, { params }),
        onSuccess: () => {
            queryClient.invalidateQueries(["roles"]);
            toast.info("Role deleted successfully");
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
