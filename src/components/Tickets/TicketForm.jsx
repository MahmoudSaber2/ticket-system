/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import JoditEditor from "jodit-react";
import { Form, message, Upload } from "antd";

import { TextInput, SelectInput, Buttons, UiContainer } from "../common";
import { TicketObj } from "../../templates/inputs/TicketObj";
import { InboxOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.webp";
import { useSelects, useSelects2 } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useCreateTicket } from "../../hooks/dashboard/tickets/useTicketsHooks";

const { Dragger } = Upload;

const TicketForm = () => {
    const [form] = Form.useForm();
    const [description, setDescription] = React.useState("");

    const [branches, setBranches] = React.useState([]);
    // Hooks
    const { mutate: getBranches } = useSelects2((values) => setBranches(values));
    const { data: selects, isLoading } = useSelects();
    const { mutate: create, isPending } = useCreateTicket(() => {
        form.resetFields();
        setDescription("");
    });

    const branch = GetOptions(branches, "branches")?.[0]?.value;
    const handleDescriptionChange = (content) => {
        setDescription(content);
        form.setFieldValue("description", content);
    };

    const editorConfig = React.useMemo(
        () => ({
            height: 280,
            readonly: false,
            toolbarAdaptive: false,
            placeholder: "Inserisci la descrizione",
            buttons: [
                "undo",
                "redo",
                "|",
                "bold",
                "italic",
                "underline",
                "brush",
                "|",
                "ul",
                "ol",
                "|",
                "left",
                "center",
                "right",
                "justify",
                "|",
                "link",
                "image",
                "table",
                "|",
                "source",
                "fullsize",
            ],
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            defaultActionOnPaste: "insert_clear_html",
            style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
            },
        }),
        []
    );

    const TicketsField = TicketObj({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
        tags: GetOptions(selects, "parameters") || [],
    }).map((field) => {
        const Component = field.type === "text" ? TextInput : SelectInput;
        return (
            <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                hidden={field?.hidden}
                className="!mb-2"
                rules={[field?.rules]}>
                <Component
                    allowClear
                    onChange={field?.name === "companyId" ? (e) => getBranches(e) : undefined}
                    placeholder={field.placeholder}
                    size="large"
                    options={field?.options}
                />
            </Form.Item>
        );
    });

    const onFinish = (values) => {
        const updatedValues = {
            ...values,
            branchId: branch,
            status: 0,
        };
        if (branch) {
            create(updatedValues);
        }
    };

    const props = {
        name: "file",
        accept: "*/*",
        showUploadList: true,
        listType: "picture",
        multiple: true,
        fileList: form.getFieldValue("attachments"),
        beforeUpload(file) {
            const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
                message.error("You can only upload JPG/PNG file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error("Image must smaller than 2MB!");
            }
            return isJpgOrPng && isLt2M;
        },
        onChange(info) {
            form.setFieldValue(
                "attachments",
                info.fileList?.map((file) => file.originFileObj)
            );
        },
    };

    return (
        <Form
            className="my-5 w-full max-w-[800px] rounded-lg bg-white p-5"
            form={form}
            layout="vertical"
            onFinish={onFinish}>
            <UiContainer loading={isLoading}>
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        className="max-w-8"
                        alt="logo"
                    />
                    <h2 className="text-lg font-bold">Elmo tech</h2>
                </div>

                <h1 className="mb-5 text-center text-2xl font-bold">Nuovo Ticket</h1>

                <div className="mb-4 grid grid-cols-2 gap-4">{TicketsField}</div>
                <div className="flex flex-col gap-5">
                    <JoditEditor
                        value={description}
                        config={editorConfig}
                        onChange={handleDescriptionChange}
                    />
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Carica le tue immagini o trascinali qui</p>
                        <p className="ant-upload-hint">
                            Per favore, carica tutte le immagini che illustrano il problema o la causa in modo dettagliato
                        </p>
                    </Dragger>

                    <Buttons
                        type="primary"
                        size="large"
                        loading={isPending}
                        htmlType="submit">
                        SALVA
                    </Buttons>
                </div>
            </UiContainer>
        </Form>
    );
};

export default TicketForm;
