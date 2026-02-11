import React from "react";
import dayjs from "dayjs";
import { Divider, Image, Select, Spin } from "antd";
import { useSearchParams } from "react-router-dom";

import { Buttons, TextInput } from "../common";
import { useCreateTicketLog, usePublicTicket } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { StatusOptions, UrgenzaOptions } from "../../utils/Functions";

const urgencyStyle = {
    Rosso: "bg-red-100 text-red-700",
    Giallo: "bg-amber-100 text-amber-700",
    Verde: "bg-green-100 text-green-700",
};

const statusStyle = {
    Aperto: "bg-sky-100 text-sky-700",
    Chiuso: "bg-emerald-200 text-emerald-700",
    "In Progress": "bg-indigo-100 text-indigo-700",
    Rifiutare: "bg-rose-100 text-rose-700",
};

const decisionStatusMap = {
    approved: 1,
    rejected: 3,
};

const getOptionLabel = (options, value) => {
    return options?.find((item) => item?.value === value)?.label || "-";
};

const getApiErrorMessage = (error) => {
    const responseData = error?.response?.data;

    if (typeof responseData === "string") {
        return responseData;
    }

    if (typeof responseData?.message === "string") {
        return responseData.message;
    }

    if (typeof responseData?.error === "string") {
        return responseData.error;
    }

    return "";
};

const formatDate = (date) => {
    if (!date) {
        return "Non impostata";
    }

    const parsedDate = dayjs(date);
    return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY") : date;
};

const ReadOnlyField = ({ label, value, required = false, tone }) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-sm font-medium text-slate-500">
                {required && <span className="mr-1 text-red-500">*</span>}
                {label}
            </p>
            {tone ? (
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>{value || "-"}</span>
            ) : (
                <p className="text-base font-semibold text-slate-800">{value || "-"}</p>
            )}
        </div>
    );
};

const ReviewContent = () => {
    const [searchParams] = useSearchParams();
    const ticketId = searchParams.get("ticketId");
    const token = searchParams.get("token");

    const { data: ticketDetails, isPending: isLoading, isError, error } = usePublicTicket(ticketId, token);

    const [decision, setDecision] = React.useState();
    const [rejectReason, setRejectReason] = React.useState("");
    const [isReviewSubmitted, setIsReviewSubmitted] = React.useState(false);
    const { mutate: createTicketLog, isPending } = useCreateTicketLog(() => {
        setDecision(undefined);
        setRejectReason("");
        setIsReviewSubmitted(true);
    });

    const handleDecisionChange = (value) => {
        setDecision(value);

        if (value !== "rejected") {
            setRejectReason("");
        }
    };
    const apiErrorMessage = getApiErrorMessage(error);
    const isUsedLinkError = apiErrorMessage.toLowerCase().includes("already been used");

    if (!ticketId || !token) {
        return (
            <section className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center shadow-lg">
                <h2 className="text-xl font-semibold text-amber-700">Link non valido</h2>
                <p className="mt-2 text-sm text-amber-600">I parametri `ticketId` e `token` sono obbligatori per visualizzare il ticket.</p>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                <div className="flex min-h-[280px] flex-col items-center justify-center gap-4">
                    <Spin size="large" />
                    <p className="text-sm font-medium text-slate-500">Caricamento dettagli ticket...</p>
                </div>
            </section>
        );
    }

    if (isReviewSubmitted) {
        return (
            <section className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-lg">
                <h2 className="text-xl font-semibold text-emerald-700">Revisione inviata</h2>
                <p className="mt-2 text-sm text-emerald-700">La tua risposta e stata registrata con successo.</p>
            </section>
        );
    }

    if (isError || !ticketDetails) {
        if (isUsedLinkError) {
            return (
                <section className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center shadow-lg">
                    <h2 className="text-xl font-semibold text-amber-700">Link già utilizzato</h2>
                    <p className="mt-2 text-sm text-amber-700">{apiErrorMessage}</p>
                </section>
            );
        }

        return (
            <section className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-lg">
                <h2 className="text-xl font-semibold text-red-700">Impossibile caricare il ticket</h2>
                <p className="mt-2 text-sm text-red-600">Verifica che `ticketId` e `token` siano corretti e riprova.</p>
            </section>
        );
    }

    const urgencyLabel = getOptionLabel(UrgenzaOptions, ticketDetails?.importance);
    const statusLabel = getOptionLabel(StatusOptions, ticketDetails?.status);
    const attachments = ticketDetails?.attachments || [];
    const tagName = ticketDetails?.tag?.name || ticketDetails?.parameter?.name || ticketDetails?.tag || "-";
    const ticketNumber = ticketDetails?.ticketNumber || `#${ticketDetails?.ticketId || ticketId}`;
    const description = ticketDetails?.description || "<p>Nessuna descrizione disponibile.</p>";
    const closedAt = ticketDetails?.closedAt || ticketDetails?.closed_at;
    const isRejectDecision = decision === "rejected";
    const isSubmitDisabled = !decision || (isRejectDecision && !rejectReason.trim());

    const handleSubmitReview = () => {
        if (isSubmitDisabled) {
            return;
        }

        createTicketLog({
            ticketId: String(ticketDetails?.ticketId || ticketId),
            status: String(decisionStatusMap[decision]),
            text: isRejectDecision ? rejectReason.trim() : "Ticket approved",
            token: String(token),
        });
    };

    return (
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:p-7">
            <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Ticket details</p>
                    <h1 className="text-2xl font-bold text-slate-900">Dettagli Ticket</h1>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-600">{ticketNumber}</span>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <ReadOnlyField label="Nome" value={ticketDetails?.customer?.name} required />
                <ReadOnlyField label="Urgenza" value={urgencyLabel} required tone={urgencyStyle[urgencyLabel]} />
                <ReadOnlyField label="Azienda" value={ticketDetails?.company?.name} required />
                <ReadOnlyField label="Tag" value={tagName} />
                <ReadOnlyField label="Stato" value={statusLabel} tone={statusStyle[statusLabel]} />
                <ReadOnlyField label="Data chiusura" value={formatDate(closedAt)} />
            </div>

            <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xl font-semibold text-slate-900">Allegati</h2>
                {attachments.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {attachments.map((file, index) => {
                            const imagePath = file?.url;
                            const attachmentName = file?.name || `Allegato ${index + 1}`;

                            return (
                                <div key={file?.attachmentId || file?.path || attachmentName} className="rounded-lg border border-slate-200 bg-white p-3">
                                    {imagePath ? (
                                        <Image src={imagePath} preview alt={attachmentName} className="h-36 w-full rounded-md object-cover" />
                                    ) : (
                                        <div className="flex h-36 items-center justify-center rounded-md bg-slate-100 px-3 text-center text-sm text-slate-500">
                                            Anteprima non disponibile
                                        </div>
                                    )}
                                    <p className="mt-2 truncate text-xs font-medium text-slate-500">{attachmentName}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="mt-2 text-sm text-slate-500">Nessun allegato disponibile.</p>
                )}
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xl font-semibold text-slate-900">Descrizione</h2>
                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
                    <div className="whitespace-pre-wrap text-base font-semibold leading-8 text-slate-800" dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </section>

            <Divider className="!my-8" />

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xl font-semibold text-slate-900">Conferma ticket</h2>
                <p className="mt-1 text-sm text-slate-500">Seleziona se questo ticket viene approvato o rifiutato.</p>

                <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Hai approvato questo ticket?</label>
                    <Select
                        value={decision}
                        size="large"
                        className="w-full"
                        onChange={handleDecisionChange}
                        placeholder="Seleziona un'opzione"
                        options={[
                            { label: "Si, approvato", value: "approved" },
                            { label: "No, rifiutato", value: "rejected" },
                        ]}
                    />
                </div>

                {decision === "rejected" && (
                    <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium text-slate-700">Motivo del rifiuto</label>
                        <TextInput
                            isTextArea
                            rows={5}
                            size="large"
                            className="w-full"
                            value={rejectReason}
                            onChange={(event) => setRejectReason(event.target.value)}
                            placeholder="Scrivi il motivo del rifiuto"
                        />
                    </div>
                )}

                <Buttons
                    block
                    type="primary"
                    size="large"
                    className="mt-5"
                    loading={isPending}
                    disabled={isSubmitDisabled}
                    onClick={handleSubmitReview}>
                    Invia revisione
                </Buttons>
            </section>
        </section>
    );
};

export default ReviewContent;
