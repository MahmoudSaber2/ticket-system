import { useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";

import { useCreateBranch, useUpdateBranch } from "../../hooks/dashboard/useBranchAdmin";
import { GetPermission } from "../../utils/Functions";

const BranchAdministration = ({ company }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [branchId, setBranchId] = useState(null);
    const createBranch = useCreateBranch();
    const updateBranch = useUpdateBranch();
    const editing = branchId !== null;

    const edit = (branch) => {
        setBranchId(branch.branchId);
        form.setFieldsValue(branch);
        setOpen(true);
    };
    const save = (fields) => {
        const request = editing ? updateBranch : createBranch;
        request.mutate({ ...fields, branchId, companyId: company.companyId }, { onSuccess: () => { setOpen(false); setBranchId(null); form.resetFields(); } });
    };

    if (!company.usesBranches) return <p className="p-4 text-slate-500">Branchless company</p>;
    return (
        <section className="p-4">
            {GetPermission("create_branch") && <Button className="mb-3" onClick={() => setOpen(true)}>Add branch</Button>}
            <Table rowKey="branchId" pagination={false} dataSource={company.branches || []} columns={[
                { title: "Branch", dataIndex: "name" },
                { title: "Status", render: (_, branch) => Number(branch.status) === 1 ? "Active" : "Inactive" },
                { title: "", render: (_, branch) => GetPermission("update_branch") ? <Button onClick={() => edit(branch)}>Edit</Button> : null },
            ]} />
            <Modal open={open} title={editing ? "Edit branch" : "Add branch"} footer={null} onCancel={() => setOpen(false)}>
                <Form form={form} layout="vertical" onFinish={save} initialValues={{ status: 1 }}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}><Select options={[{ label: "Active", value: 1 }, { label: "Inactive", value: 0 }]} /></Form.Item>
                    <Button htmlType="submit" type="primary" loading={createBranch.isPending || updateBranch.isPending}>Save</Button>
                </Form>
            </Modal>
        </section>
    );
};

export default BranchAdministration;
