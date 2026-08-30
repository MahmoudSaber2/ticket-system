import React from "react";
import { Button, Modal, Skeleton, Spin } from "antd";
import { BuildOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, FileOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../assets/logo.webp";
import { getTimelineErrorMessage, useCustomerTicketTimeline, useSendCustomerTimelineMessage, useUpdateCustomerTimelineStatus } from "../../hooks/tickets/useTicketTimeline";
import { getCustomerStatusAction, getTimelinePriorityLabel, getTimelineStatusLabel, getTimelineToken } from "../../utils/ticketTimeline";
import { formatTimelineDate, TimelineList, TimelineReplyComposer } from "./TimelineConversation";

const statusTone = {
    0: "border-sky-200 bg-sky-50 text-sky-700",
    1: "border-emerald-200 bg-emerald-50 text-emerald-700",
    2: "border-indigo-200 bg-indigo-50 text-indigo-700",
    3: "border-blue-200 bg-blue-50 text-blue-700",
};

const priorityTone = {
    0: "border-green-200 bg-green-50 text-green-700",
    1: "border-red-200 bg-red-50 text-red-700",
    2: "border-amber-200 bg-amber-50 text-amber-700",
};

const Badge = ({ label, tone }) => <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${tone}`}>{label}</span>;

const SummaryItem = ({ icon, label, value }) => (
    <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">{icon}</span>
        <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value || "—"}</p>
        </div>
    </div>
);

const TicketSummary = ({ ticket, isUpdatingStatus, onStatusChange }) => {
    const status = Number(ticket?.status);
    const priority = Number(ticket?.priority);
    const statusAction = getCustomerStatusAction(status);

    return (
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <div className="border-b border-slate-100 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Riepilogo ticket</p>
                <h1 className="mt-2 break-words text-xl font-bold text-slate-900">{ticket?.ticketNumber || "Ticket"}</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge label={getTimelineStatusLabel(status)} tone={statusTone[status] || "border-slate-200 bg-slate-50 text-slate-700"} />
                    <Badge label={`Priorità: ${getTimelinePriorityLabel(priority)}`} tone={priorityTone[priority] || "border-slate-200 bg-slate-50 text-slate-700"} />
                </div>
            </div>

            <div className="mt-5 space-y-3">
                <SummaryItem icon={<UserOutlined />} label="Cliente" value={ticket?.customerName} />
                <SummaryItem icon={<BuildOutlined />} label="Azienda" value={ticket?.company} />
                <SummaryItem icon={<CalendarOutlined />} label="Data di apertura" value={formatTimelineDate(ticket?.createdAt)} />
                <SummaryItem icon={<CheckCircleOutlined />} label="Data di chiusura" value={formatTimelineDate(ticket?.closedAt, "Non ancora chiuso")} />
            </div>

            <Button block danger={status !== 1} type="primary" size="large" className="mt-5" loading={isUpdatingStatus} onClick={onStatusChange}>
                {statusAction.label}
            </Button>
        </aside>
    );
};

const TimelinePanel = ({ messages, totalMessages, hasOlderMessages, isLoadingOlderMessages, onLoadOlderMessages, isClosed, isSending, onSend, endRef, resetKey }) => (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Aggiornamenti</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">Cronologia del ticket</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {totalMessages} {totalMessages === 1 ? "aggiornamento" : "aggiornamenti"}
            </span>
        </header>

        {hasOlderMessages && (
            <div className="mb-6 flex justify-center">
                <Button icon={<ClockCircleOutlined />} loading={isLoadingOlderMessages} onClick={onLoadOlderMessages}>
                    Carica aggiornamenti precedenti
                </Button>
            </div>
        )}

        <TimelineList messages={messages} currentActorType={2} />
        <div ref={endRef} />
        <TimelineReplyComposer isClosed={isClosed} isSending={isSending} onSend={onSend} resetKey={resetKey} />
    </section>
);

const TimelineLoading = () => (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <Skeleton active paragraph={{ rows: 8 }} />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex min-h-[420px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Spin size="large" />
                    <p className="text-sm font-medium text-slate-500">Caricamento cronologia...</p>
                </div>
            </div>
        </div>
    </main>
);

const TimelineState = ({ type = "error", title, description, onRetry }) => (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <span className={`mx-auto flex size-14 items-center justify-center rounded-2xl text-2xl ${type === "warning" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>
                <FileOutlined />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
            {onRetry && (
                <Button type="primary" className="mt-6" icon={<SyncOutlined />} onClick={onRetry}>
                    Riprova
                </Button>
            )}
        </section>
    </main>
);

const TicketTimelineContent = () => {
    const [searchParams] = useSearchParams();
    const ticketId = searchParams.get("ticketId")?.trim() || "";
    const timelineToken = getTimelineToken(searchParams);
    const [modal, modalContext] = Modal.useModal();
    const endRef = React.useRef(null);
    const hasScrolledInitially = React.useRef(false);
    const [scrollSignal, setScrollSignal] = React.useState(0);

    const timelineQuery = useCustomerTicketTimeline(ticketId, timelineToken);
    const sendMessageMutation = useSendCustomerTimelineMessage(ticketId, timelineToken);
    const updateStatusMutation = useUpdateCustomerTimelineStatus(ticketId, timelineToken);

    const ticket = timelineQuery.data?.ticket;
    const messages = timelineQuery.data?.ticketMessages || [];
    const latestMessageId = messages[messages.length - 1]?.id;

    React.useEffect(() => {
        if (!timelineQuery.data || (hasScrolledInitially.current && scrollSignal === 0)) {
            return;
        }

        window.requestAnimationFrame(() => {
            endRef.current?.scrollIntoView({ behavior: hasScrolledInitially.current ? "smooth" : "auto", block: "end" });
            hasScrolledInitially.current = true;
        });
    }, [latestMessageId, scrollSignal, timelineQuery.data]);

    React.useEffect(() => {
        if (scrollSignal > 0) {
            setScrollSignal(0);
        }
    }, [scrollSignal]);

    const handleSendMessage = async (payload) => {
        try {
            await sendMessageMutation.mutateAsync(payload);
            toast.success("Risposta inviata con successo");
            setScrollSignal((value) => value + 1);
            return true;
        } catch (error) {
            toast.error(getTimelineErrorMessage(error, "Impossibile inviare la risposta. Riprova."));
            return false;
        }
    };

    const handleStatusChange = () => {
        const statusAction = getCustomerStatusAction(ticket?.status);

        modal.confirm({
            title: statusAction.confirmationTitle,
            content: statusAction.confirmationText,
            okText: statusAction.label,
            cancelText: "Annulla",
            okButtonProps: { danger: statusAction.nextStatus === 1 },
            onOk: async () => {
                try {
                    await updateStatusMutation.mutateAsync(statusAction.nextStatus);
                    toast.success(statusAction.nextStatus === 1 ? "Ticket chiuso con successo" : "Ticket riaperto con successo");
                    setScrollSignal((value) => value + 1);
                } catch (error) {
                    toast.error(getTimelineErrorMessage(error, "Impossibile aggiornare lo stato del ticket."));
                    throw error;
                }
            },
        });
    };

    const handleLoadOlderMessages = async () => {
        try {
            await timelineQuery.loadOlderMessages();
        } catch (error) {
            toast.error(getTimelineErrorMessage(error, "Impossibile caricare gli aggiornamenti precedenti."));
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col bg-slate-50">
            {modalContext}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-7xl items-center gap-3 p-4 sm:px-6 lg:px-8">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-50">
                        <img src={logo} alt="Elmo Tech" className="max-h-8 max-w-8" />
                    </span>
                    <div>
                        <p className="font-bold text-slate-900">Elmo Tech</p>
                        <p className="text-xs font-medium text-slate-500">Portale assistenza clienti</p>
                    </div>
                </div>
            </header>

            {!ticketId || !timelineToken ? (
                <TimelineState type="warning" title="Link non valido" description="Il link deve contenere un ticketId e un token validi. Apri nuovamente il collegamento ricevuto via email." />
            ) : timelineQuery.isPending ? (
                <TimelineLoading />
            ) : timelineQuery.isError || !ticket ? (
                <TimelineState title="Impossibile aprire il ticket" description="Il link non è valido o il ticket non è disponibile. Controlla il collegamento ricevuto via email e riprova." onRetry={() => timelineQuery.refetch()} />
            ) : (
                <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
                    <TicketSummary ticket={ticket} isUpdatingStatus={updateStatusMutation.isPending} onStatusChange={handleStatusChange} />
                    <TimelinePanel
                        messages={messages}
                        totalMessages={Number(timelineQuery.data?.pagination?.total) || messages.length}
                        hasOlderMessages={timelineQuery.hasOlderMessages}
                        isLoadingOlderMessages={timelineQuery.isLoadingOlderMessages}
                        onLoadOlderMessages={handleLoadOlderMessages}
                        isClosed={Number(ticket.status) === 1}
                        isSending={sendMessageMutation.isPending}
                        onSend={handleSendMessage}
                        endRef={endRef}
                        resetKey={ticketId}
                    />
                </main>
            )}
        </div>
    );
};

export default TicketTimelineContent;
