import React from "react";
import { Alert, Button, Modal, Select, Skeleton, Spin } from "antd";
import { ClockCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { getTimelineErrorMessage } from "../../hooks/tickets/useTicketTimeline";
import { useAdminTicketTimeline, useSendAdminTimelineMessage } from "../../hooks/dashboard/tickets/useAdminTicketTimeline";
import { getTimelinePriorityLabel, getTimelineStatusLabel, timelineStatusOptions } from "../../utils/ticketTimeline";
import { formatTimelineDate, TimelineList, TimelineReplyComposer } from "../TicketTimeline/TimelineConversation";

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

const SummaryValue = ({ label, value }) => (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value || "—"}</p>
    </div>
);

const AdminTimelineLoading = () => (
    <div className="space-y-4">
        <Skeleton active paragraph={{ rows: 3 }} />
        <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex flex-col items-center gap-3">
                <Spin size="large" />
                <p className="text-sm font-medium text-slate-500">Caricamento cronologia...</p>
            </div>
        </div>
    </div>
);

const AdminTicketTimeline = ({ ticketId, enabled, canUpdate, isUpdatingStatus, onUpdateStatus }) => {
    const [modal, modalContext] = Modal.useModal();
    const timelineQuery = useAdminTicketTimeline(ticketId, enabled);
    const sendMessageMutation = useSendAdminTimelineMessage(ticketId);
    const scrollContainerRef = React.useRef(null);
    const hasScrolledInitially = React.useRef(false);
    const isNearBottom = React.useRef(true);
    const [scrollSignal, setScrollSignal] = React.useState(0);

    const ticket = timelineQuery.data?.ticket;
    const messages = timelineQuery.data?.ticketMessages || [];
    const latestMessageId = messages[messages.length - 1]?.id;
    const status = Number(ticket?.status);
    const priority = Number(ticket?.priority);

    React.useEffect(() => {
        hasScrolledInitially.current = false;
        isNearBottom.current = true;
        setScrollSignal(0);
    }, [ticketId]);

    React.useEffect(() => {
        if (!timelineQuery.data || (hasScrolledInitially.current && scrollSignal === 0 && !isNearBottom.current)) {
            return;
        }

        window.requestAnimationFrame(() => {
            const container = scrollContainerRef.current;

            if (container) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: hasScrolledInitially.current ? "smooth" : "auto",
                });
                hasScrolledInitially.current = true;
            }
        });
    }, [latestMessageId, scrollSignal, timelineQuery.data]);

    React.useEffect(() => {
        if (scrollSignal > 0) {
            setScrollSignal(0);
        }
    }, [scrollSignal]);

    if (!enabled) {
        return null;
    }

    if (timelineQuery.isPending) {
        return <AdminTimelineLoading />;
    }

    if (timelineQuery.isError || !ticket) {
        return (
            <Alert
                showIcon
                type="error"
                message="Impossibile caricare la cronologia"
                description="Controlla la connessione e riprova."
                action={
                    <Button size="small" onClick={() => timelineQuery.refetch()}>
                        Riprova
                    </Button>
                }
            />
        );
    }

    const handleScroll = (event) => {
        const container = event.currentTarget;
        isNearBottom.current = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    };

    const handleLoadOlderMessages = async () => {
        try {
            await timelineQuery.loadOlderMessages();
        } catch (error) {
            toast.error(getTimelineErrorMessage(error, "Impossibile caricare gli aggiornamenti precedenti."));
        }
    };

    const handleRefresh = async () => {
        const result = await timelineQuery.refetch();

        if (result.isError) {
            toast.error(getTimelineErrorMessage(result.error, "Impossibile aggiornare la cronologia."));
            return;
        }

        toast.success("Cronologia aggiornata");
    };

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

    const handleStatusChange = (nextStatus) => {
        modal.confirm({
            title: "Aggiornare lo stato del ticket?",
            content: `Lo stato passerà da ${getTimelineStatusLabel(status)} a ${getTimelineStatusLabel(nextStatus)}.`,
            okText: "Aggiorna stato",
            cancelText: "Annulla",
            onOk: async () => {
                try {
                    await onUpdateStatus(nextStatus);
                    toast.success("Stato del ticket aggiornato");
                    setScrollSignal((value) => value + 1);
                } catch (error) {
                    toast.error(getTimelineErrorMessage(error, "Impossibile aggiornare lo stato del ticket."));
                    throw error;
                }
            },
        });
    };

    return (
        <div className="space-y-5">
            {modalContext}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Cronologia ticket</p>
                        <h2 className="mt-1 text-xl font-bold text-slate-900">{ticket.ticketNumber}</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone[status] || "border-slate-200 bg-slate-50 text-slate-700"}`}>{getTimelineStatusLabel(status)}</span>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityTone[priority] || "border-slate-200 bg-slate-50 text-slate-700"}`}>Priorità: {getTimelinePriorityLabel(priority)}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <Select aria-label="Stato ticket" className="min-w-44" value={status} options={timelineStatusOptions} disabled={!canUpdate || isUpdatingStatus} loading={isUpdatingStatus} onChange={handleStatusChange} />
                        <Button icon={<ReloadOutlined />} loading={timelineQuery.isFetching && !timelineQuery.isPending} onClick={handleRefresh}>
                            Aggiorna
                        </Button>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <SummaryValue label="Cliente" value={ticket.customerName} />
                    <SummaryValue label="Azienda" value={ticket.company} />
                    <SummaryValue label="Aperto il" value={formatTimelineDate(ticket.createdAt)} />
                    <SummaryValue label="Chiuso il" value={formatTimelineDate(ticket.closedAt, "Non ancora chiuso")} />
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="font-bold text-slate-900">Messaggi e aggiornamenti</h3>
                        <p className="text-xs text-slate-500">Aggiornamento automatico ogni 30 secondi.</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{Number(timelineQuery.data?.pagination?.total) || messages.length} aggiornamenti</span>
                </div>

                <div ref={scrollContainerRef} className="max-h-[46vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4" onScroll={handleScroll}>
                    {timelineQuery.hasOlderMessages && (
                        <div className="mb-5 flex justify-center">
                            <Button icon={<ClockCircleOutlined />} loading={timelineQuery.isLoadingOlderMessages} onClick={handleLoadOlderMessages}>
                                Carica aggiornamenti precedenti
                            </Button>
                        </div>
                    )}
                    <TimelineList messages={messages} currentActorType={1} />
                </div>

                <TimelineReplyComposer
                    isClosed={status === 1}
                    isSending={sendMessageMutation.isPending}
                    canReply={canUpdate}
                    onSend={handleSendMessage}
                    resetKey={ticketId}
                    description="La risposta sarà visibile al cliente nella cronologia."
                    helperText="L'invio del messaggio non genera un'email di notifica."
                />
            </section>
        </div>
    );
};

export default AdminTicketTimeline;
