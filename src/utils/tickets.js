const imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "avif"]);

const getPathWithoutQuery = (path = "") => String(path).split("?")[0].split("#")[0];

export const resetPaginationToFirstPage = (pagination = {}) => ({
    ...pagination,
    current: 1,
});

export const getAttachmentUrl = (attachment = {}) => attachment?.path || attachment?.url || "";

export const getAttachmentName = (attachment = {}) => {
    if (attachment?.name) {
        return attachment.name;
    }

    if (attachment?.fileName) {
        return attachment.fileName;
    }

    const path = getPathWithoutQuery(getAttachmentUrl(attachment));
    const name = decodeURIComponent(path.split("/").filter(Boolean).pop() || "");

    return name || "Allegato";
};

export const isImageAttachment = (attachment = {}) => {
    const mimeType = String(attachment?.mimeType || attachment?.type || "").toLowerCase();
    const path = getAttachmentUrl(attachment);

    if (mimeType.startsWith("image/") || String(path).startsWith("data:image/")) {
        return true;
    }

    const extension = getPathWithoutQuery(path).split(".").pop()?.toLowerCase();

    return imageExtensions.has(extension);
};
