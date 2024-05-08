/* eslint-disable tailwindcss/no-custom-classname */
import { Button, Form, Upload } from "antd";
import React from "react";

import { TextInput, SelectInput, Buttons } from "../common";
import { AdminObj } from "../../templates/inputs/AdminObj";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useTable } from "../../store";
import { useCreateAdmin, useAdminsEdit, useUpdateAdmin } from "../../hooks/dashboard/admins/useAdminsHooks";
import { UploadOutlined } from "@ant-design/icons";

const CustomerModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();

    const { data: selects } = useSelects();

    const AdminForm = AdminObj({ roles: GetOptions(selects, "roles") || [] }).map((input) => {
        const Component = input.type === "select" ? SelectInput : TextInput;
        return (
            <Form.Item
                key={input.name}
                hidden={input?.hidden}
                label={input?.label}
                name={input?.name}
                rules={[input?.rules]}>
                <Component
                    isPassword={input?.isPassword}
                    placeholder={input?.placeholder}
                    size="large"
                    options={input?.options}
                />
            </Form.Item>
        );
    });

    const { data: details } = useAdminsEdit(detailsId, (values) => form.setFieldsValue(values));
    const { mutate: create, isPending } = useCreateAdmin(() => {
        form.resetFields();
        closeModal();
    });
    const { mutate: update, isPending: updatePending } = useUpdateAdmin(() => {
        form.resetFields();
        closeModal();
    });

    return (
        <Form
            form={form}
            name="admin"
            initialValues={details}
            onFinish={(values) => (detailsId ? update({ ...values, userId: detailsId, _method: "PUT" }) : create(values))}
            layout="vertical">
            {AdminForm}

            <div className="mb-6">
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    onChange={({ file }) => form.setFieldValue("avatar", file.originFileObj)}
                    fileList={form.getFieldValue("avatar")}
                    onRemove={() => form.setFieldValue("avatar", undefined)}
                    listType="picture"
                    maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                </Upload>
            </div>

            <Buttons
                type="primary"
                size="large"
                block
                loading={isPending || updatePending}
                htmlType="submit">
                {detailsId ? "Modifica" : "Salva"}
            </Buttons>
        </Form>
    );
};

export default CustomerModalForm;
