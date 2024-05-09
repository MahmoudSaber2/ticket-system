/* eslint-disable tailwindcss/no-custom-classname */
import { Button, Form, Image, Upload } from "antd";
import React from "react";

import { TextInput, SelectInput, Buttons } from "../common";
import { AdminObj } from "../../templates/inputs/AdminObj";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useTable } from "../../store";
import { useCreateAdmin, useAdminsEdit, useUpdateAdmin } from "../../hooks/dashboard/admins/useAdminsHooks";
import { UploadOutlined } from "@ant-design/icons";
import { BiX } from "react-icons/bi";

const CustomerModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();
    const avatar = Form.useWatch("avatar", form);

    const { data: selects } = useSelects();

    const AdminForm = AdminObj({ roles: GetOptions(selects, "roles") || [], inEditMode: !!detailsId }).map((input) => {
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

    const avatarType = typeof avatar === "string" ? "url" : "file";

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
            onFinish={(values) =>
                detailsId
                    ? update({
                          ...values,
                          userId: detailsId,
                          avatar: avatarType === "file" ? avatar : undefined,
                          password: values.password || "",
                          _method: "PUT",
                      })
                    : create(values)
            }
            layout="vertical">
            {avatarType === "url" && avatar !== undefined && (
                <div className="relative">
                    <Image
                        key={form.getFieldValue("avatar")}
                        src={form.getFieldValue("avatar")}
                        className="w-full rounded-md object-cover"
                        preview={true}
                        alt="avatar"
                        style={{ height: "100px", width: "100%" }}
                    />
                    <BiX
                        className="absolute right-2 top-2 cursor-pointer"
                        size={20}
                        color="red"
                        onClick={() => form.setFieldValue("avatar", undefined)}
                    />
                </div>
            )}
            {AdminForm}

            <div className="mb-6 min-w-full">
                {(avatarType === "file" || avatar === undefined) && (
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        onChange={({ file }) => form.setFieldValue("avatar", file.originFileObj)}
                        onRemove={() => form.setFieldValue("avatar", undefined)}
                        listType="picture"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                    </Upload>
                )}
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
