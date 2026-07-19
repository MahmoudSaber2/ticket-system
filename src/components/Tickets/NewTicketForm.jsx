/* eslint-disable tailwindcss/no-custom-classname */
import { InboxOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Form, message, Upload } from "antd";
import { useState } from "react";

import logo from "../../assets/logo.webp";
import { useCreatePublicTicket, useIdentifyPublicTicketRequester } from "../../hooks/tickets/usePublicTicketSubmission";
import { UrgenzaOptions } from "../../utils/Functions";
import { Buttons, SelectInput, TextInput } from "../common";

const { Dragger, LIST_IGNORE } = Upload;

const NewTicketForm = () => {
    const [accessForm] = Form.useForm();
    const [ticketForm] = Form.useForm();
    const [identity, setIdentity] = useState(null);
    const [fileList, setFileList] = useState([]);
    const { mutate: identify, isPending: isIdentifying } = useIdentifyPublicTicketRequester(setIdentity);
    const { mutate: create, isPending: isCreating } = useCreatePublicTicket(() => {
        accessForm.resetFields();
        ticketForm.resetFields();
        setFileList([]);
        setIdentity(null);
    });

    const resetIdentity = () => {
        ticketForm.resetFields();
        setFileList([]);
        setIdentity(null);
    };

    const submitTicket = (values) => {
        create({
            ...values,
            ticketToken: identity.ticketToken,
            attachments: fileList.map((file) => file.originFileObj || file),
        });
    };

    const uploadProps = {
        accept: "image/jpeg,image/png",
        fileList,
        listType: "picture",
        multiple: true,
        beforeUpload(file) {
            const isImage = file.type === "image/jpeg" || file.type === "image/png";
            const isUnder2Mb = file.size / 1024 / 1024 < 2;

            if (!isImage) {
                message.error("You can only upload JPG/PNG file!");
                return LIST_IGNORE;
            }
            if (!isUnder2Mb) {
                message.error("Image must be smaller than 2MB!");
                return LIST_IGNORE;
            }

            return false;
        },
        onChange: ({ fileList: nextFileList }) => setFileList(nextFileList),
    };

    return (
        <div className="my-5 w-full max-w-[800px] rounded-lg bg-white p-5">
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    className="max-w-8"
                    alt="logo"
                />
                <h2 className="text-lg font-bold">Elmo tech</h2>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold">Nuovo Ticket</h1>
            <p className="mb-5 text-center text-gray-500">
                {identity ? "Inserisci i dettagli del ticket" : "Accedi con username e PIN"}
            </p>

            {!identity ? (
                <Form
                    form={accessForm}
                    layout="vertical"
                    onFinish={identify}
                    className="mx-auto max-w-xl"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Inserisci lo username" }]}
                    >
                        <TextInput
                            prefix={<UserOutlined />}
                            placeholder="Inserisci lo username"
                            autoComplete="username"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="PIN"
                        name="pin"
                        rules={[{ required: true, message: "Inserisci il PIN" }]}
                    >
                        <TextInput
                            isPassword
                            prefix={<LockOutlined />}
                            placeholder="Inserisci il PIN"
                            autoComplete="current-password"
                            size="large"
                        />
                    </Form.Item>
                    <Buttons
                        type="primary"
                        size="large"
                        loading={isIdentifying}
                        htmlType="submit"
                        className="w-full"
                    >
                        CONTINUA
                    </Buttons>
                </Form>
            ) : (
                <Form
                    form={ticketForm}
                    layout="vertical"
                    onFinish={submitTicket}
                >
                    <Alert
                        className="mb-5"
                        type="success"
                        showIcon
                        message={`Accesso verificato: ${identity.name}`}
                        action={(
                            <Buttons
                                type="link"
                                onClick={resetIdentity}
                            >
                                Cambia utente
                            </Buttons>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Form.Item
                            label="Urgenza"
                            name="importance"
                            rules={[{ required: true, message: "Inserisci la urgenza" }]}
                        >
                            <SelectInput
                                size="large"
                                placeholder="Inserisci la urgenza"
                                options={UrgenzaOptions}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tag"
                            name="tagId"
                        >
                            <SelectInput
                                allowClear
                                size="large"
                                placeholder="Inserisci la Tag"
                                options={identity.tags || []}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="description"
                        label="Descrizione"
                        rules={[{ required: true, message: "Inserisci la descrizione" }]}
                    >
                        <TextInput
                            size="large"
                            placeholder="Descrizione"
                            isTextArea
                            rows={4}
                        />
                    </Form.Item>

                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Carica le tue immagini o trascinali qui</p>
                        <p className="ant-upload-hint">
                            Carica immagini JPG o PNG che illustrano il problema, fino a 2MB ciascuna
                        </p>
                    </Dragger>

                    <Buttons
                        type="primary"
                        size="large"
                        loading={isCreating}
                        htmlType="submit"
                        className="mt-5 w-full"
                    >
                        SALVA
                    </Buttons>
                </Form>
            )}
        </div>
    );
};

export default NewTicketForm;
