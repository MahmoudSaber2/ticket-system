import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";

import { useUpdateCompany } from "../../hooks/dashboard/useCompanyAdmin";
import { GetPermission } from "../../utils/Functions";

const CompanyEditButton = ({ company }) => {
    const [open, setOpen] = useState(false);
    const update = useUpdateCompany();
    if (!GetPermission("update_company")) return null;

    return (
        <>
            <Button onClick={() => setOpen(true)}>Edit</Button>
            <Modal open={open} title="Edit company" footer={null} onCancel={() => setOpen(false)}>
                <Form layout="vertical" initialValues={company} onFinish={(fields) => update.mutate({ ...fields, companyId: company.companyId }, { onSuccess: () => setOpen(false) })}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}><Select options={[{ label: "Active", value: 1 }, { label: "Inactive", value: 0 }]} /></Form.Item>
                    <Button type="primary" htmlType="submit" loading={update.isPending}>Save</Button>
                </Form>
            </Modal>
        </>
    );
};

export default CompanyEditButton;
