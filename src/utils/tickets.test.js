import assert from "node:assert/strict";
import test from "node:test";

import { getAttachmentName, isImageAttachment, resetPaginationToFirstPage } from "./tickets.js";

test("resetPaginationToFirstPage preserves pagination metadata and moves to page 1", () => {
    assert.deepEqual(
        resetPaginationToFirstPage({
            current: 5,
            pageSize: 20,
            total: 150,
            position: ["bottomLeft"],
        }),
        {
            current: 1,
            pageSize: 20,
            total: 150,
            position: ["bottomLeft"],
        }
    );
});

test("isImageAttachment detects images from mime type, data URL, or file extension", () => {
    assert.equal(isImageAttachment({ mimeType: "image/png", path: "/files/report.pdf" }), true);
    assert.equal(isImageAttachment({ path: "data:image/jpeg;base64,abc123" }), true);
    assert.equal(isImageAttachment({ path: "https://example.com/uploads/photo.WEBP?token=abc" }), true);
});

test("isImageAttachment returns false for non-image files", () => {
    assert.equal(isImageAttachment({ mimeType: "application/pdf", path: "https://example.com/report.pdf" }), false);
    assert.equal(isImageAttachment({ path: "https://example.com/archive.zip" }), false);
});

test("getAttachmentName returns a readable name from the attachment metadata or path", () => {
    assert.equal(getAttachmentName({ name: "Invoice.pdf", path: "https://example.com/file.bin" }), "Invoice.pdf");
    assert.equal(getAttachmentName({ path: "https://example.com/uploads/ticket-photo.png?token=abc" }), "ticket-photo.png");
    assert.equal(getAttachmentName({ path: "" }), "Allegato");
});
