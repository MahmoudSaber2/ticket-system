/* eslint-disable tailwindcss/no-custom-classname */
import { Form } from "antd";
import React from "react";

import { TextInput, SelectInput, Buttons } from "../common";
import { RolesObj } from "../../templates/inputs/RolesObj";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useTable } from "../../store";
import { useCreateRole, useRolesEdit, useUpdateRole } from "../../hooks/dashboard/roles/useRolesHooks";

const CustomerModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();

    const { data: selects } = useSelects();
    const updatePermissionsOptions = GetOptions(selects, "permissions")?.map((option) => {
        const newLabel = option?.label?.replace("_", " ").charAt(0).toUpperCase() + option?.label?.replace("_", " ").slice(1);

        return {
            ...option,
            label: newLabel,
        };
    });

    const AdminForm = RolesObj({ permissions: updatePermissionsOptions || [] }).map((input) => {
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
                    mode={input?.mode}
                    placeholder={input?.placeholder}
                    size="large"
                    options={input?.options}
                />
            </Form.Item>
        );
    });

    const { data: details } = useRolesEdit(detailsId, (values) => form.setFieldsValue(values));
    const { mutate: create, isPending } = useCreateRole(() => {
        form.resetFields();
        closeModal();
    });
    const { mutate: update } = useUpdateRole(() => {
        form.resetFields();
        closeModal();
    });

    return (
        <Form
            form={form}
            name="admin"
            initialValues={details}
            onFinish={(values) => (detailsId ? update({ ...values, roleId: detailsId }) : create(values))}
            layout="vertical">
            {AdminForm}

            <Buttons
                type="primary"
                size="large"
                block
                loading={isPending}
                htmlType="submit">
                {detailsId ? "Modifica" : "Salva"}
            </Buttons>
        </Form>
    );
};

export default CustomerModalForm;
