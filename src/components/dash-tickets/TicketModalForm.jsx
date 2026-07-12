import React from "react";
import { DatePicker, Form, Spin, Tabs } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MdOutlineTranslate } from "react-icons/md";

import { useSessionStore, useTable } from "../../store";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { useTicketLogs, useTicketsEdit, useUpdateTicket } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { Buttons, SelectInput, TextInput, Modal } from "../common";
import { GetOptions } from "../../utils/Functions";
import { TicketObj } from "../../templates/inputs/TicketObj";
import { useGeminiSDK } from "../../hooks/global/useGeminiSDK";
import TicketAttachments from "./TicketAttachments";
import TicketLogs from "./TicketLogs";

dayjs.extend(customParseFormat);

const TicketModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();
    const accountType = useSessionStore((state) => state.accountType);

    const { data: selects } = useSelects();
    const [activeTab, setActiveTab] = React.useState("details");

    const { data: ticketLogs = [], isLoading: isLogsLoading, isFetching: isLogsFetching, isError: isLogsError } = useTicketLogs(detailsId, activeTab === "logs");
    const { run } = useGeminiSDK();
    const [translate, setTranslate] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const attachments = Form.useWatch("attachments", form) || [];
    const description = Form.useWatch("description", form);

    React.useEffect(() => {
        setActiveTab("details");
    }, [detailsId]);

    const showModal = () => {
        setIsLoading(true);
        run(description).then((res) => {
            setTranslate(res);
            setIsLoading(false);
            setIsModalOpen(true);
        });
    };

    const TicketForm = TicketObj({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
        tags: GetOptions(selects, "parameters") || [],
        inEdit: true,
    }).map((input) => {
        const Component = input.type === "select" ? SelectInput : input.type === "date" ? DatePicker : TextInput;
        return (
            <Form.Item key={input.name} hidden={input?.hidden} label={input?.label} className="!mb-3" name={input?.name} rules={[input?.rules]}>
                <Component className="w-full" format="DD/MM/YYYY" rows={4} placeholder={input?.placeholder} size="large" options={input?.options} />
            </Form.Item>
        );
    });

    useTicketsEdit(detailsId, (data) => {
        const values = {
            ...data,
            closedAt: data?.closedAt ? dayjs(data?.closedAt, "YYYY-MM-DD HH:mm:ss") : "",
        };
        form.setFieldsValue(values);
    });
    const { mutate: update } = useUpdateTicket(() => {
        form.resetFields();
        closeModal();
    });

    const formTabContent = (
        <Form
            form={form}
            name="customer"
            onFinish={(values) => update({ ...values, ticketId: detailsId, closedAt: values?.closedAt ? values?.closedAt?.format("YYYY-MM-DD") : "", _method: "PUT" })}
            layout="vertical">
            <section className="rounded-md border border-slate-200 bg-white p-4">
                <h2 className="mb-4 text-base font-semibold text-slate-800">Informazioni ticket</h2>
                <div className="grid gap-3 md:grid-cols-2">{TicketForm}</div>
            </section>

            <TicketAttachments attachments={attachments} />
            <section className="relative mt-4 w-full rounded-md border border-slate-200 bg-white p-4">
                <h2 className="mb-3 text-base font-semibold text-slate-800">Descrizione</h2>
                {accountType === "internal" && (
                    <div onClick={() => showModal()} className="absolute right-3 top-3 cursor-pointer rounded-md bg-cyan-500 p-2">
                        {isLoading ? <Spin size="small" /> : <MdOutlineTranslate className="text-xl text-white" />}
                    </div>
                )}
                <pre className="w-full whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm font-medium leading-6 text-slate-800">{description}</pre>
            </section>
            <Buttons className="mt-4" type="primary" size="large" block loading={false} htmlType="submit">
                {detailsId ? "Modifica" : "Salva"}
            </Buttons>
        </Form>
    );

    const logsTabContent = <TicketLogs logs={ticketLogs} loading={isLogsLoading} fetching={isLogsFetching} failed={isLogsError} />;

    return (
        <>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                    {
                        key: "details",
                        label: "Dettagli ticket",
                        children: formTabContent,
                    },
                    {
                        key: "logs",
                        label: "Logs ticket",
                        children: logsTabContent,
                    },
                ]}
            />

            <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width={600} title={"Translate Description"}>
                <pre className="whitespace-pre-wrap text-sm font-bold" dir="rtl">{translate}</pre>
            </Modal>
        </>
    );
};

export default TicketModalForm;
