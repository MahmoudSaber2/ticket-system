import React from "react";
import { Form, Image } from "antd";

import { useTable } from "../../store";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { useTicketsEdit, useUpdateTicket } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { Buttons, SelectInput, TextInput } from "../common";
import { GetOptions } from "../../utils/Functions";
import { TicketObj } from "../../templates/inputs/TicketObj";

const TicketModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();

    const { data: selects } = useSelects();

    const TicketForm = TicketObj({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
        tags: GetOptions(selects, "parameters") || [],
        inEdit: true,
    }).map((input) => {
        const Component = input.type === "select" ? SelectInput : TextInput;
        return (
            <Form.Item
                key={input.name}
                hidden={input?.hidden}
                label={input?.label}
                className={"w-[49%]"}
                name={input?.name}
                rules={[input?.rules]}>
                <Component
                    rows={4}
                    placeholder={input?.placeholder}
                    size="large"
                    options={input?.options}
                />
            </Form.Item>
        );
    });

    useTicketsEdit(detailsId, (values) => form.setFieldsValue(values));
    const { mutate: update } = useUpdateTicket(() => {
        form.resetFields();
        closeModal();
    });

    return (
        <Form
            form={form}
            name="customer"
            onFinish={(values) => update({ ...values, ticketId: detailsId, _method: "PUT" })}
            layout="vertical">
            <div className="flex flex-wrap items-center gap-2">{TicketForm}</div>
            {form?.getFieldValue("attachments")?.length > 0 && (
                <div className="w-full rounded-md border p-3">
                    <h2>Allegati</h2>{" "}
                    <div className="grid w-full grid-cols-4 gap-4 rounded-md p-3">
                        {form?.getFieldValue("attachments")?.map((file) => (
                            <Image
                                key={file?.attachmentId}
                                src={file?.path}
                                className="w-full rounded-md bg-slate-200 object-cover"
                                preview={true}
                                alt="attachment"
                                style={{ height: "100px" }}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-4 w-full rounded-md border p-3">
                <h2>Descrizione</h2>{" "}
                <pre
                    className="w-full whitespace-pre-wrap text-xl font-bold"
                    dangerouslySetInnerHTML={{ __html: form.getFieldValue("description") }}
                />
            </div>
            <Buttons
                className="mt-4"
                type="primary"
                size="large"
                block
                loading={false}
                htmlType="submit">
                {detailsId ? "Modifica" : "Salva"}
            </Buttons>
        </Form>
    );
};

export default TicketModalForm;
