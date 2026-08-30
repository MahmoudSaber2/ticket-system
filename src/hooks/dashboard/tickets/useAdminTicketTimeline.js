import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { buildTimelineMessageFormData, mergeTimelineMessages, TIMELINE_PAGE_SIZE } from "../../../utils/ticketTimeline";

const getAdminTimelineQueryKey = (ticketId) => ["adminTicketTimeline", String(ticketId)];

const ensureTimelineResponse = (response) => {
    const data = response?.data;

    if (!data?.result?.ticket || !Array.isArray(data?.result?.ticketMessages) || !data?.pagination) {
        const error = new Error("INVALID_TIMELINE_RESPONSE");
        error.response = response;
        throw error;
    }

    return data;
};

const getAdminTimelinePage = async ({ ticketId, page }) => {
    const response = await axios.get("admin/tickets/timeline", {
        params: {
            ticketId,
            page,
            pageSize: TIMELINE_PAGE_SIZE,
        },
    });

    return ensureTimelineResponse(response);
};

const getLatestAdminTimeline = async (ticketId) => {
    const firstPage = await getAdminTimelinePage({ ticketId, page: 1 });
    const totalPages = Math.max(Number(firstPage.pagination?.totalPages) || 1, 1);
    const latestPage = totalPages > 1
        ? await getAdminTimelinePage({ ticketId, page: totalPages })
        : firstPage;

    return {
        ticket: latestPage.result.ticket,
        ticketMessages: mergeTimelineMessages(latestPage.result.ticketMessages),
        pagination: latestPage.pagination,
        oldestLoadedPage: totalPages,
    };
};

export const useAdminTicketTimeline = (ticketId, enabled) => {
    const queryClient = useQueryClient();
    const queryKey = getAdminTimelineQueryKey(ticketId);

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const latestTimeline = await getLatestAdminTimeline(ticketId);
            const cachedTimeline = queryClient.getQueryData(queryKey);

            if (!cachedTimeline) {
                return latestTimeline;
            }

            return {
                ...latestTimeline,
                ticketMessages: mergeTimelineMessages(
                    cachedTimeline.ticketMessages || [],
                    latestTimeline.ticketMessages,
                ),
                oldestLoadedPage: Math.min(
                    Number(cachedTimeline.oldestLoadedPage || latestTimeline.oldestLoadedPage),
                    Number(latestTimeline.oldestLoadedPage),
                ),
            };
        },
        enabled: Boolean(ticketId && enabled),
        retry: false,
        refetchInterval: enabled ? 30000 : false,
        refetchIntervalInBackground: false,
    });

    const olderMessagesMutation = useMutation({
        mutationFn: async () => {
            const cachedTimeline = queryClient.getQueryData(queryKey);
            const nextPage = Math.max(Number(cachedTimeline?.oldestLoadedPage || 1) - 1, 1);
            const pageData = await getAdminTimelinePage({ ticketId, page: nextPage });

            return { nextPage, pageData };
        },
        onSuccess: ({ nextPage, pageData }) => {
            queryClient.setQueryData(queryKey, (currentTimeline) => ({
                ...currentTimeline,
                ticket: pageData.result.ticket,
                ticketMessages: mergeTimelineMessages(
                    pageData.result.ticketMessages,
                    currentTimeline?.ticketMessages || [],
                ),
                pagination: {
                    ...currentTimeline?.pagination,
                    total: pageData.pagination.total,
                    totalPages: pageData.pagination.totalPages,
                },
                oldestLoadedPage: nextPage,
            }));
        },
    });

    return {
        ...query,
        hasOlderMessages: Number(query.data?.oldestLoadedPage || 1) > 1,
        loadOlderMessages: olderMessagesMutation.mutateAsync,
        isLoadingOlderMessages: olderMessagesMutation.isPending,
    };
};

export const useSendAdminTimelineMessage = (ticketId) => {
    const queryClient = useQueryClient();
    const queryKey = getAdminTimelineQueryKey(ticketId);

    return useMutation({
        mutationFn: ({ message, attachments }) => axios.post(
            "admin/tickets/messages",
            buildTimelineMessageFormData({ ticketId, message, attachments }),
        ),
        onSuccess: () => queryClient.invalidateQueries({ queryKey, exact: true }),
    });
};

export const useUpdateAdminTimelineStatus = (ticketId) => {
    const queryClient = useQueryClient();
    const queryKey = getAdminTimelineQueryKey(ticketId);

    return useMutation({
        mutationFn: (data) => axios.post("admin/tickets/update", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
        onSuccess: async (_response, variables) => {
            queryClient.setQueryData(queryKey, (currentTimeline) => currentTimeline && ({
                ...currentTimeline,
                ticket: {
                    ...currentTimeline.ticket,
                    status: variables.status,
                },
            }));
            queryClient.setQueriesData({ queryKey: ["tickets"] }, (tickets) => Array.isArray(tickets)
                ? tickets.map((ticket) => Number(ticket?.ticketId) === Number(ticketId)
                    ? { ...ticket, status: variables.status }
                    : ticket)
                : tickets);

            await queryClient.invalidateQueries({ queryKey, exact: true });
        },
    });
};
