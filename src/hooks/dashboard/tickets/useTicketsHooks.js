import { keepPreviousData, useQuery, useMutation } from "@tanstack/react-query";
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
