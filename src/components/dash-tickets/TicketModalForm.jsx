import React from "react";
import { DatePicker, Form, Image, Popover } from "antd";
import dayjs from "dayjs";
import { MdOutlineTranslate } from "react-icons/md";

import { useTable } from "../../store";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { useTicketsEdit, useUpdateTicket } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { Buttons, SelectInput, TextInput } from "../common";
import { GetOptions } from "../../utils/Functions";
import { TicketObj } from "../../templates/inputs/TicketObj";
import { useGeminiSDK } from "../../hooks/global/useGeminiSDK";
import { Cookies } from "react-cookie";

const TicketModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();
    const cookies = new Cookies();

    const { data: selects } = useSelects();

    const { run } = useGeminiSDK();
    const [translate, setTranslate] = React.useState(false);

    const TicketForm = TicketObj({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
        tags: GetOptions(selects, "parameters") || [],
        inEdit: true,
    }).map((input) => {
        const Component = input.type === "select" ? SelectInput : input.type === "date" ? DatePicker : TextInput;
        return (
            <Form.Item key={input.name} hidden={input?.hidden} label={input?.label} className={"w-[49%]"} name={input?.name} rules={[input?.rules]}>
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

    return (
        <Form form={form} name="customer" onFinish={(values) => update({ ...values, ticketId: detailsId, closedAt: values?.closedAt ? values?.closedAt?.format("YYYY-MM-DD") : "", _method: "PUT" })} layout="vertical">
            <div className="flex flex-wrap items-center gap-2">{TicketForm}</div>
            {form?.getFieldValue("attachments")?.length > 0 && (
                <div className="w-full rounded-md border p-3">
                    <h2>Allegati</h2>{" "}
                    <div className="grid w-full grid-cols-4 gap-4 rounded-md p-3">
                        {form?.getFieldValue("attachments")?.map((file) => (
                            <Image key={file?.attachmentId} src={file?.path} className="w-full rounded-md bg-slate-200 object-cover" preview={true} alt="attachment" style={{ height: "100px" }} />
                        ))}
                    </div>
                </div>
            )}
            <div className="relative mt-4 w-full rounded-md border p-3">
                <h2>Descrizione</h2>{" "}
                {cookies.get("role")?.name === "SuperAdmin" && (
                    <Popover content={<pre className="whitespace-pre-wrap text-sm font-bold" dangerouslySetInnerHTML={{ __html: translate }} />} title="Translated Description" trigger="click">
                        <div onClick={() => run(form.getFieldValue("description")).then((res) => setTranslate(res))} className="absolute right-3 top-3 cursor-pointer rounded-md bg-cyan-500 p-2">
                            <MdOutlineTranslate className="text-xl text-white" />
                        </div>
                    </Popover>
                )}
                <pre className="w-full whitespace-pre-wrap text-xl font-bold" dangerouslySetInnerHTML={{ __html: form.getFieldValue("description") }} />
            </div>
            <Buttons className="mt-4" type="primary" size="large" block loading={false} htmlType="submit">
                {detailsId ? "Modifica" : "Salva"}
            </Buttons>
        </Form>
    );
};

export default TicketModalForm;
