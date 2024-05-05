import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

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