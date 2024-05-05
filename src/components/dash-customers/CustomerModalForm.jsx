import { Form } from "antd";
import React from "react";

import { TextInput, SelectInput, Buttons } from "../common";
import { CustomeObj } from "../../templates/inputs/CustomerObj";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useTable } from "../../store";
import { useCreateCustomer, useCustomersEdit, useUpdateCustomer } from "../../hooks/dashboard/customers/useCustomersHooks";

const CustomerModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const [form] = Form.useForm();

    const { data: selects } = useSelects();

    const CustomerForm = CustomeObj({ azienda: GetOptions(selects, "companies") || [] }).map((input) => {
        const Component = input.type === "text" ? TextInput : SelectInput;
        return (
            <Form.Item
                key={input.name}
                hidden={input?.hidden}
                label={input?.label}
                name={input?.name}
                rules={[input?.rules]}>
                <Component
                    placeholder={input?.placeholder}
                    size="large"
                    options={input?.options}
                />
            </Form.Item>
        );
    });

    const { data: details } = useCustomersEdit(detailsId, (values) => form.setFieldsValue(values));
    const { mutate: create, isPending } = useCreateCustomer(() => {
        form.resetFields();
        closeModal();
    });
    const { mutate: update, isPending: updatePending } = useUpdateCustomer(() => {
        form.resetFields();
        closeModal();
    });

    return (
        <Form
            form={form}
            name="customer"
            initialValues={details}
            onFinish={(values) => (detailsId ? update({ ...values, customerId: detailsId }) : create(values))}
            layout="vertical">
            {CustomerForm}

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
