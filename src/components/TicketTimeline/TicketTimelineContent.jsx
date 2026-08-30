import React from "react";
import dayjs from "dayjs";
import { Alert, Button, Empty, Image, Input, Modal, Skeleton, Spin, Upload } from "antd";
import { BuildOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, DownloadOutlined, FileOutlined, MessageOutlined, PaperClipOutlined, SendOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../assets/logo.webp";
import { getTimelineErrorMessage, useCustomerTicketTimeline, useSendCustomerTimelineMessage, useUpdateCustomerTimelineStatus } from "../../hooks/tickets/useTicketTimeline";
import { getAttachmentName, getAttachmentUrl, isImageAttachment } from "../../utils/tickets";
import { getCustomerStatusAction, getTimelineActorLabel, getTimelinePriorityLabel, getTimelineStatusLabel, getTimelineToken } from "../../utils/ticketTimeline";

const { TextArea } = Input;

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

const formatTimelineDate = (value, emptyValue = "Non disponibile") => {
    if (!value) {
        return emptyValue;
    }

    const parsedDate = dayjs(value);
    return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY HH:mm") : value;
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

const AttachmentList = ({ attachments = [] }) => {
    if (attachments.length === 0) {
        return null;
    }

    return (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {attachments.map((attachment, index) => {
                const url = getAttachmentUrl(attachment);
                const name = getAttachmentName(attachment);
                const key = attachment?.id || `${name}-${index}`;

                if (url && isImageAttachment(attachment)) {
                    return (
                        <div key={key} className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                            <Image src={url} alt={name} className="!h-28 !w-full rounded-lg object-cover" fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='112'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3C/svg%3E" />
                            <p className="mt-2 truncate px-1 text-xs font-medium text-slate-600" title={name}>
                                {name}
                            </p>
                        </div>
                    );
                }

                return (
                    <a key={key} href={url || undefined} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                        <FileOutlined className="text-lg" />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium" title={name}>
                            {name}
                        </span>
                        <DownloadOutlined />
                    </a>
                );
            })}
        </div>
    );
};

const TimelineMessage = ({ item }) => {
    const isCustomer = Number(item?.actorType) === 2;
    const actorName = item?.userName || getTimelineActorLabel(item?.actorType);

    return (
        <div className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}>
            <article className={`max-w-[88%] rounded-2xl p-4 shadow-sm sm:max-w-[78%] ${isCustomer ? "rounded-br-md bg-blue-700 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-bold">{actorName}</span>
                    <span className={`text-xs ${isCustomer ? "text-blue-100" : "text-slate-400"}`}>{getTimelineActorLabel(item?.actorType)}</span>
                </div>
                <p className={`mt-1 text-xs ${isCustomer ? "text-blue-100" : "text-slate-400"}`}>{formatTimelineDate(item?.createdAt)}</p>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">{item?.message || "—"}</p>
                <AttachmentList attachments={item?.attachments || []} />
            </article>
        </div>
    );
};

const StatusEvent = ({ item }) => {
    const actorName = item?.userName || getTimelineActorLabel(item?.actorType);

    return (
        <div className="flex justify-center py-1">
            <div className="max-w-[92%] rounded-full border border-slate-200 bg-white px-4 py-2 text-center shadow-sm">
                <p className="text-xs font-medium text-slate-600">
                    <SyncOutlined className="mr-2 text-blue-600" />
                    {actorName} ha cambiato lo stato da <strong>{getTimelineStatusLabel(item?.oldStatus)}</strong> a <strong>{getTimelineStatusLabel(item?.newStatus)}</strong>
                </p>
                <p className="mt-1 text-[11px] text-slate-400">{formatTimelineDate(item?.createdAt)}</p>
            </div>
        </div>
    );
};

const UnknownEvent = ({ item }) => (
    <div className="flex justify-center py-1">
        <div className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-center text-xs text-slate-600">Aggiornamento del ticket · {formatTimelineDate(item?.createdAt)}</div>
    </div>
);

const TimelineList = ({ messages }) => {
    if (messages.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nessun aggiornamento disponibile" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {messages.map((item, index) => {
                const key = item?.id || `${item?.createdAt}-${index}`;

                if (Number(item?.type) === 1) {
                    return <TimelineMessage key={key} item={item} />;
                }

                if (Number(item?.type) === 2) {
                    return <StatusEvent key={key} item={item} />;
                }

                return <UnknownEvent key={key} item={item} />;
            })}
        </div>
    );
};

const ReplyComposer = ({ isClosed, isSending, onSend }) => {
    const [message, setMessage] = React.useState("");
    const [fileList, setFileList] = React.useState([]);
    const isSubmitDisabled = isClosed || !message.trim();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitDisabled) {
            return;
        }

        const attachments = fileList.map((file) => file.originFileObj || file);
        const wasSent = await onSend({ message: message.trim(), attachments });

        if (wasSent) {
            setMessage("");
            setFileList([]);
        }
    };

    return (
        <section className="mt-6 border-t border-slate-100 pt-6">
            <div className="mb-4 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <MessageOutlined />
                </span>
                <div>
                    <h2 className="font-bold text-slate-900">Invia una risposta</h2>
                    <p className="text-sm text-slate-500">Il nostro team vedrà il messaggio nella cronologia.</p>
                </div>
            </div>

            {isClosed && <Alert showIcon type="info" className="mb-4" message="Il ticket è chiuso" description="Riapri il ticket dal riepilogo per inviare una nuova risposta." />}

            <form onSubmit={handleSubmit}>
                <label htmlFor="timeline-message" className="mb-2 block text-sm font-semibold text-slate-700">
                    Messaggio
                </label>
                <TextArea id="timeline-message" rows={5} value={message} disabled={isClosed} maxLength={5000} showCount placeholder="Scrivi qui il tuo messaggio..." onChange={(event) => setMessage(event.target.value)} />

                <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                    <Upload multiple disabled={isClosed} fileList={fileList} beforeUpload={() => false} onChange={({ fileList: nextFileList }) => setFileList(nextFileList)}>
                        <Button icon={<PaperClipOutlined />} disabled={isClosed}>
                            Aggiungi allegati
                        </Button>
                    </Upload>

                    <Button type="primary" size="large" htmlType="submit" icon={<SendOutlined />} loading={isSending} disabled={isSubmitDisabled}>
                        Invia risposta
                    </Button>
                </div>
            </form>
        </section>
    );
};

const TimelinePanel = ({ messages, totalMessages, hasOlderMessages, isLoadingOlderMessages, onLoadOlderMessages, isClosed, isSending, onSend, endRef }) => (
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

        <TimelineList messages={messages} />
        <div ref={endRef} />
        <ReplyComposer isClosed={isClosed} isSending={isSending} onSend={onSend} />
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
                    />
                </main>
            )}
        </div>
    );
};

export default TicketTimelineContent;
