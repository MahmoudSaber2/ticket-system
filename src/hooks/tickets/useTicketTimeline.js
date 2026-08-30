import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import publicApi from "../../services/publicApi";
import { buildTimelineMessageFormData, mergeTimelineMessages, TIMELINE_PAGE_SIZE } from "../../utils/ticketTimeline";

const getTimelineQueryKey = (ticketId, timelineToken) => ["customerTicketTimeline", String(ticketId), timelineToken];

const ensureTimelineResponse = (response) => {
    const data = response?.data;

    if (!data?.result?.ticket || !Array.isArray(data?.result?.ticketMessages) || !data?.pagination) {
        const error = new Error("INVALID_TIMELINE_RESPONSE");
        error.response = response;
        throw error;
    }

    return data;
};

const getTimelinePage = async ({ ticketId, timelineToken, page }) => {
    const response = await publicApi.get("tickets/timeline", {
        params: {
            ticketId,
            timelineToken,
            page,
            pageSize: TIMELINE_PAGE_SIZE,
        },
    });

    return ensureTimelineResponse(response);
};

const getLatestTimeline = async ({ ticketId, timelineToken }) => {
    const firstPage = await getTimelinePage({ ticketId, timelineToken, page: 1 });
    const totalPages = Math.max(Number(firstPage.pagination?.totalPages) || 1, 1);
    const latestPage = totalPages > 1
        ? await getTimelinePage({ ticketId, timelineToken, page: totalPages })
        : firstPage;

    return {
        ticket: latestPage.result.ticket,
        ticketMessages: mergeTimelineMessages(latestPage.result.ticketMessages),
        pagination: latestPage.pagination,
        oldestLoadedPage: totalPages,
    };
};

export const useCustomerTicketTimeline = (ticketId, timelineToken) => {
    const queryClient = useQueryClient();
    const queryKey = getTimelineQueryKey(ticketId, timelineToken);
    const enabled = Boolean(ticketId && timelineToken);

    const query = useQuery({
        queryKey,
        queryFn: () => getLatestTimeline({ ticketId, timelineToken }),
        enabled,
        retry: false,
    });

    const olderMessagesMutation = useMutation({
        mutationFn: async () => {
            const cachedTimeline = queryClient.getQueryData(queryKey);
            const nextPage = Math.max(Number(cachedTimeline?.oldestLoadedPage || 1) - 1, 1);
            const pageData = await getTimelinePage({ ticketId, timelineToken, page: nextPage });

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
        loadOlderError: olderMessagesMutation.error,
    };
};

export const useSendCustomerTimelineMessage = (ticketId, timelineToken) => {
    const queryClient = useQueryClient();
    const queryKey = getTimelineQueryKey(ticketId, timelineToken);

    return useMutation({
        mutationFn: ({ message, attachments }) => publicApi.post(
            "tickets/messages",
            buildTimelineMessageFormData({ ticketId, timelineToken, message, attachments }),
        ),
        onSuccess: () => queryClient.invalidateQueries({ queryKey, exact: true }),
    });
};

export const useUpdateCustomerTimelineStatus = (ticketId, timelineToken) => {
    const queryClient = useQueryClient();
    const queryKey = getTimelineQueryKey(ticketId, timelineToken);

    return useMutation({
        mutationFn: (status) => publicApi.put("tickets/status", {
            ticketId: Number(ticketId),
            timelineToken,
            status,
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey, exact: true }),
    });
};

export const getTimelineErrorMessage = (error, fallbackMessage) => {
    const responseMessage = error?.response?.data?.message;

    if (typeof responseMessage === "string") {
        return responseMessage;
    }

    if (responseMessage && typeof responseMessage === "object") {
        const messages = Object.values(responseMessage).flat().filter((message) => typeof message === "string");

        if (messages.length > 0) {
            return messages.join(" ");
        }
    }

    if (typeof error?.response?.data?.error === "string") {
        return error.response.data.error;
    }

    return fallbackMessage;
};
