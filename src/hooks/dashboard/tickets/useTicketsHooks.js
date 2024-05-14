import { keepPreviousData, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import { sumErrors } from "../../../utils/Functions";

export const useTickets = (pagination, setPagination, resetParamPageId) => {
    const getTickets = async () => {
        const response = await axios.get("admin/tickets", {
            params: {
                page: pagination?.current,
                pageSize: pagination?.pageSize,
                filter: pagination?.filter,
            },
        });

        const {
            data: {
                pagination: { total, per_page: pageSize, current_page: current },
                result: { tickets },
            },
        } = response;

        setPagination({ position: ["bottomLeft"], total, pageSize, current });
        resetParamPageId();
        return tickets.map((ticket) => ({ ...ticket, key: ticket.ticketId }));
    };

    return useQuery({
        queryKey: ["tickets", pagination],
        queryFn: () => getTickets(),
        placeholderData: keepPreviousData,
    });
};

export const useCreateTicket = (resetForm) => {
    return useMutation({
        mutationFn: (data) => {
            return axios.post("https://customerservicebe.testingelmo.com/api/v1/tickets/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            toast.success("Ticket created successfully");
            resetForm();
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            const typeMessage = typeof message;

            const errors = typeMessage === "string" ? [message] : sumErrors(message);
            errors.forEach((error) => toast.error(error));
        },
    });
};

export const useTicketsEdit = (id, updateForm) => {
    const getTicket = async () => {
        const response = await axios.get(`admin/tickets/edit`, { params: { ticketId: id } });
        updateForm(response.data);
        return response.data;
    };
    return useQuery({
        queryKey: ["ticketEdit", id],
        queryFn: () => getTicket(),
        enabled: !!id,
    });
};

export const useUpdateTicket = (closeModel) => {
    return useMutation({
        mutationFn: (data) => {
            return axios.post("admin/tickets/update", data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: () => {
            toast.success("Ticket updated successfully");
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

export const useDeleteTicket = (refetch) => {
    const queryClient = new QueryClient();

    return useMutation({
        mutationFn: (params) => axios.delete(`admin/tickets/delete`, { params }),
        onSuccess: () => {
            queryClient.invalidateQueries(["tickets"]);
            toast.info("Ticket deleted successfully");
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
