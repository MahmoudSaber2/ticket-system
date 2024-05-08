import React from "react";
import { Form, Image } from "antd";

import { useTable } from "../../store";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { useTicketsEdit } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { SelectInput, TextInput } from "../common";
import { GetOptions } from "../../utils/Functions";
import { TicketObj } from "../../templates/inputs/TicketObj";

const TicketModalForm = () => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();

    const { data: selects } = useSelects();

    const TicketForm = TicketObj({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
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

    const { data: details } = useTicketsEdit(detailsId, (values) => form.setFieldsValue(values));

    return (
        <Form
            form={form}
            name="customer"
            initialValues={details}
            // onFinish={(values) => (detailsId ? update({ ...values, ticketId: detailsId }) : create(values))}
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
                                className="w-full rounded-md object-cover"
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
                    className="w-full text-xl font-bold"
                    dangerouslySetInnerHTML={{ __html: form.getFieldValue("description") }}
                />
            </div>
            {/* <Buttons
                type="primary"
                size="large"
                block
                loading={isPending || updatePending}
                htmlType="submit">
                {detailsId ? "Modifica" : "Salva"}
            </Buttons> */}
        </Form>
    );
};

export default TicketModalForm;
