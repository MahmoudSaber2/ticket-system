import { keepPreviousData, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useCustomes = (pagination, setPagination, resetParamPageId) => {
    const getCustomers = async () => {
        const response = await axios.get("admin/customers", {
            params: {
                page: pagination?.current,
                pageSize: pagination?.pageSize,
                filter: pagination?.filter,
            },
        });

        const {
            data: {
                pagination: { total, per_page: pageSize, current_page: current },
                result: { customers },
            },
        } = response;

        setPagination({ position: ["bottomLeft"], total, pageSize, current });
        resetParamPageId();
        return customers.map((customer) => ({ ...customer, key: customer.customerId }));
    };

    return useQuery({
        queryKey: ["customer", pagination],
        queryFn: () => getCustomers(),
        placeholderData: keepPreviousData,
        keepPreviousData: true,
    });
};

export const useCreateCustomer = (closeModel) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) => axios.post(`admin/customers/create`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["customer"]);
            toast.success("Utente created successfully");
            closeModel();
        },
        onError: () => toast.error("Utente not created"),
    });
};

export const useCustomersEdit = (id, updateForm) => {
    const getCustomer = async () => {
        const response = await axios.get(`admin/customers/edit`, { params: { customerId: id } });
        updateForm(response.data);
        return response.data;
    };
    return useQuery({
        queryKey: ["customerEdit", id],
        queryFn: () => getCustomer(),
        enabled: !!id,
    });
};

export const useUpdateCustomer = (closeModel) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (data) => axios.put(`admin/customers/update`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["customer"]);
            toast.success("Utente updated successfully");
            closeModel();
        },
        onError: () => toast.error("Utente not updated"),
    });
};

export const useDeleteCustomer = (refetch) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (params) => axios.delete(`admin/customers/delete`, { params }),
        onSuccess: () => {
            queryClient.invalidateQueries(["customer"]);
            toast.info("Utente deleted successfully");
            refetch();
        },
        onError: () => toast.error("Utente not deleted"),
    });
};
