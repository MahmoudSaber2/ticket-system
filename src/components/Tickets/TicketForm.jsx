import { Form, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { Buttons, SelectInput, TextInput, UiContainer } from "../common";
import { useCreateTicket } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { useTicketSubmissionOptions } from "../../hooks/global/useSelectsHook";
import { GetOptions, UrgenzaOptions } from "../../utils/Functions";
import { useSessionStore } from "../../store";
import logo from "../../assets/logo.webp";

const { Dragger } = Upload;

const TicketForm = () => {
    const [form] = Form.useForm();
    const tenant = useSessionStore((state) => state.tenant);
    const { data: options, isLoading } = useTicketSubmissionOptions();
    const { mutate: createTicket, isPending } = useCreateTicket(() => form.resetFields());
    const requiresBranchSelection = tenant?.usesBranches && !tenant?.branchId;

    const submitTicket = (fields) => createTicket({
        ...fields,
        branchId: tenant?.branchId || fields.branchId,
    });

    const uploadProps = {
        accept: "image/jpeg,image/png",
        multiple: true,
        beforeUpload: validateUpload,
        onChange: ({ fileList }) => form.setFieldValue(
            "attachments",
            fileList.map((file) => file.originFileObj).filter(Boolean),
        ),
    };

    return (
        <Form
            className="my-5 w-full max-w-[800px] rounded-lg bg-white p-5"
            form={form}
            layout="vertical"
            onFinish={submitTicket}
        >
            <UiContainer loading={isLoading}>
                <header className="mb-5 flex items-center gap-3">
                    <img src={logo} className="max-w-8" alt="Elmo Tech" />
                    <div>
                        <h1 className="text-xl font-bold">Nuovo Ticket</h1>
                        <p className="text-sm text-slate-500">{tenant?.companyName}</p>
                    </div>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                    <Form.Item
                        name="importance"
                        label="Urgenza"
                        rules={[{ required: true, message: "Seleziona l'urgenza" }]}
                    >
                        <SelectInput options={UrgenzaOptions} size="large" />
                    </Form.Item>

                    {requiresBranchSelection && (
                        <Form.Item
                            name="branchId"
                            label="Filiale"
                            rules={[{ required: true, message: "Seleziona la filiale" }]}
                        >
                            <SelectInput options={GetOptions(options, "branches") || []} size="large" />
                        </Form.Item>
                    )}

                    <Form.Item name="tagId" label="Tag">
                        <SelectInput options={GetOptions(options, "parameters") || []} size="large" allowClear />
                    </Form.Item>
                </div>

                <Form.Item
                    name="description"
                    label="Descrizione"
                    rules={[{ required: true, message: "Inserisci la descrizione" }]}
                >
                    <TextInput size="large" isTextArea rows={4} />
                </Form.Item>

                <Form.Item name="attachments">
                    <Dragger {...uploadProps}>
                        <p className="mb-3 text-4xl text-blue-500"><InboxOutlined /></p>
                        <p className="text-base text-slate-700">Carica le immagini o trascinale qui</p>
                        <p className="text-sm text-slate-500">JPG o PNG, massimo 2 MB per file</p>
                    </Dragger>
                </Form.Item>

                <Buttons type="primary" size="large" loading={isPending} htmlType="submit" block>
                    SALVA
                </Buttons>
            </UiContainer>
        </Form>
    );
};

function validateUpload(file) {
    const isImage = ["image/jpeg", "image/png"].includes(file.type);
    const isWithinLimit = file.size / 1024 / 1024 < 2;

    if (!isImage) message.error("Puoi caricare solo immagini JPG o PNG.");
    if (!isWithinLimit) message.error("Ogni immagine deve essere inferiore a 2 MB.");

    return isImage && isWithinLimit ? false : Upload.LIST_IGNORE;
}

export default TicketForm;
