import assert from "node:assert/strict";
import test from "node:test";

import { isImageAttachment } from "./tickets.js";
import {
    buildTimelineMessageFormData,
    getCustomerStatusAction,
    getTimelineActorLabel,
    getTimelinePriorityLabel,
    getTimelineStatusLabel,
    getTimelineToken,
    mergeTimelineMessages,
} from "./ticketTimeline.js";

test("getTimelineToken supports both URL parameter names and prefers timelineToken", () => {
    assert.equal(getTimelineToken(new URLSearchParams("ticketId=10&token=legacy-token")), "legacy-token");
    assert.equal(
        getTimelineToken(new URLSearchParams("token=legacy-token&timelineToken=canonical-token")),
        "canonical-token",
    );
    assert.equal(getTimelineToken(new URLSearchParams("ticketId=10")), "");
});

test("timeline labels follow the customer timeline API contract", () => {
    assert.equal(getTimelineStatusLabel(0), "Aperto");
    assert.equal(getTimelineStatusLabel(1), "Chiuso");
    assert.equal(getTimelineStatusLabel(2), "In lavorazione");
    assert.equal(getTimelineStatusLabel(3), "Riaperto");
    assert.equal(getTimelinePriorityLabel(0), "Verde");
    assert.equal(getTimelinePriorityLabel(1), "Rosso");
    assert.equal(getTimelinePriorityLabel(2), "Giallo");
    assert.equal(getTimelineActorLabel(1), "Amministratore");
    assert.equal(getTimelineActorLabel(2), "Cliente");
    assert.equal(getTimelineStatusLabel(99), "Sconosciuto");
});

test("mergeTimelineMessages deduplicates and orders logs by date then id", () => {
    const mergedMessages = mergeTimelineMessages(
        [
            { id: 3, createdAt: "2026-08-30 10:00:00", message: "third" },
            { id: 1, createdAt: "2026-08-30 09:00:00", message: "first" },
        ],
        [
            { id: 2, createdAt: "2026-08-30 10:00:00", message: "second" },
            { id: 3, createdAt: "2026-08-30 10:00:00", message: "updated third" },
        ],
    );

    assert.deepEqual(mergedMessages.map((message) => message.id), [1, 2, 3]);
    assert.equal(mergedMessages[2].message, "updated third");
});

test("customer status action closes active tickets and reopens closed tickets", () => {
    assert.equal(getCustomerStatusAction(0).nextStatus, 1);
    assert.equal(getCustomerStatusAction(2).nextStatus, 1);
    assert.equal(getCustomerStatusAction(3).nextStatus, 1);
    assert.equal(getCustomerStatusAction(1).nextStatus, 3);
});

test("buildTimelineMessageFormData creates the documented multipart payload", () => {
    const firstAttachment = new Blob(["image"], { type: "image/png" });
    const secondAttachment = new Blob(["report"], { type: "application/pdf" });
    const formData = buildTimelineMessageFormData({
        ticketId: 1106,
        timelineToken: "timeline-token",
        message: "Il problema persiste.",
        attachments: [firstAttachment, secondAttachment],
    });

    assert.equal(formData.get("ticketId"), "1106");
    assert.equal(formData.get("timelineToken"), "timeline-token");
    assert.equal(formData.get("message"), "Il problema persiste.");
    assert.equal(formData.getAll("attachments[]").length, 2);
});

test("timeline attachment detection supports images and documents", () => {
    assert.equal(isImageAttachment({ fileName: "screen.webp", url: "https://example.com/screen.webp" }), true);
    assert.equal(isImageAttachment({ fileName: "report.pdf", url: "https://example.com/report.pdf" }), false);
});
