export const TIMELINE_PAGE_SIZE = 10;

export const timelineStatusMap = {
    0: "Aperto",
    1: "Chiuso",
    2: "In lavorazione",
    3: "Riaperto",
};

export const timelinePriorityMap = {
    0: "Verde",
    1: "Rosso",
    2: "Giallo",
};

export const timelineActorMap = {
    1: "Amministratore",
    2: "Cliente",
};

export const getTimelineLabel = (map, value) => map[value] || "Sconosciuto";

export const getTimelineStatusLabel = (status) => getTimelineLabel(timelineStatusMap, status);

export const getTimelinePriorityLabel = (priority) => getTimelineLabel(timelinePriorityMap, priority);

export const getTimelineActorLabel = (actorType) => getTimelineLabel(timelineActorMap, actorType);

export const getTimelineToken = (searchParams) => {
    const canonicalToken = searchParams?.get?.("timelineToken")?.trim();
    const legacyToken = searchParams?.get?.("token")?.trim();

    return canonicalToken || legacyToken || "";
};

export const getCustomerStatusAction = (status) => {
    if (Number(status) === 1) {
        return {
            label: "Riapri ticket",
            nextStatus: 3,
            confirmationTitle: "Riaprire questo ticket?",
            confirmationText: "Il ticket tornerà attivo e potrai inviare una nuova risposta.",
        };
    }

    return {
        label: "Chiudi ticket",
        nextStatus: 1,
        confirmationTitle: "Chiudere questo ticket?",
        confirmationText: "Non potrai inviare altre risposte finché il ticket non verrà riaperto.",
    };
};

const getMessageKey = (message, index) => {
    if (message?.id !== undefined && message?.id !== null) {
        return `id:${message.id}`;
    }

    return [message?.createdAt, message?.type, message?.actorType, message?.userId, message?.message, index].join(":");
};

const compareTimelineMessages = (first, second) => {
    const firstDate = String(first?.createdAt || "");
    const secondDate = String(second?.createdAt || "");
    const dateComparison = firstDate.localeCompare(secondDate);

    if (dateComparison !== 0) {
        return dateComparison;
    }

    return Number(first?.id || 0) - Number(second?.id || 0);
};

export const mergeTimelineMessages = (...messageGroups) => {
    const messagesByKey = new Map();

    messageGroups.flat().filter(Boolean).forEach((message, index) => {
        messagesByKey.set(getMessageKey(message, index), message);
    });

    return Array.from(messagesByKey.values()).sort(compareTimelineMessages);
};

export const buildTimelineMessageFormData = ({ ticketId, timelineToken, message, attachments = [] }) => {
    const formData = new FormData();

    formData.append("ticketId", String(ticketId));
    formData.append("timelineToken", String(timelineToken));
    formData.append("message", String(message));
    attachments.forEach((attachment) => formData.append("attachments[]", attachment));

    return formData;
};
