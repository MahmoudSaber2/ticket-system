import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Image } from "antd";
import { message, Upload } from "antd";
const { Dragger } = Upload;

import { TextInput, SelectInput, Buttons } from "../common";
import { TicketObj } from "../../templates/inputs/TicketObj";
import { InboxOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.webp";

const TicketForm = () => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);

    const TicketsField = TicketObj().map((field) => {
        const Component = field.type === "text" ? TextInput : SelectInput;
        return (
            <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                hidden={field?.hidden}
                rules={[field?.rules]}>
                <Component
                    placeholder={field.placeholder}
                    size="large"
                    options={field?.options}
                />
            </Form.Item>
        );
    });

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const props = {
        name: "file",
        accept: "image/*",
        showUploadList: true,
        listType: "picture",
        multiple: true,
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
                "image",
                info.fileList?.map((file) => file.originFileObj)
            );
        },
    };

    return (
        <Form
            className="bg-white shadow-md p-5 rounded-lg w-full max-w-[800px] my-5"
            form={form}
            layout="vertical"
            onFinish={onFinish}>
            <div className="flex items-center gap-3">
                <Image
                    src={logo}
                    preview={false}
                    className="max-w-8"
                    alt="logo"
                />
                <h2 className="text-lg font-bold">Elmo tech</h2>
            </div>

            <h1 className="text-2xl font-bold mb-5 text-center">Nuovo Ticket</h1>

            <div className="grid grid-cols-2 gap-4">{TicketsField}</div>
            <div className="flex flex-col gap-5">
                <Editor
                    apiKey={"291fk9weadufle2zus63f63n0mrhi4fkyk6za2k25oi6ic18"}
                    onInit={(evt, editor) => {
                        // @ts-ignore
                        editorRef.current = editor;
                    }}
                    onEditorChange={(content) => form.setFieldValue("descrizione", content)}
                    initialValue={form.getFieldValue("descrizione")}
                    init={{
                        height: 280,
                        menubar: false,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "codesample",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                        ],
                        toolbar:
                            "undo redo | " +
                            "codesample | bold italic forecolor | alignleft aligncenter |" +
                            "alignright alignjustify | bullist numlist",
                        content_style: "body { font-family:Inter; font-size:16px }",
                    }}
                />
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Carica le tue immagini o trascinali qui</p>
                    <p className="ant-upload-hint">Per favore, carica tutte le immagini che illustrano il problema o la causa in modo dettagliato</p>
                </Dragger>

                <Buttons
                    type="primary"
                    size="large"
                    htmlType="submit">
                    SALVA
                </Buttons>
            </div>
        </Form>
    );
};

export default TicketForm;
