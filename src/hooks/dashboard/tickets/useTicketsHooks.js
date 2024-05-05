import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTickets = (pagination, setPagination, resetParamPageId) => {
    const getClients = async () => {
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
                result: { clients },
            },
        } = response;

        setPagination({ position: ["bottomLeft"], total, pageSize, current });
        resetParamPageId();
        return clients.map((client) => ({ ...client, key: client.clientId }));
    };

    return useQuery({
        queryKey: ["clients", pagination],
        queryFn: () => getClients(),
        placeholderData: keepPreviousData,
    });
};