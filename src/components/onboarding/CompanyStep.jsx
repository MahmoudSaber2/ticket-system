import { Form, Input, Radio } from "antd";

const CompanyStep = () => (
    <div className="grid gap-4 md:grid-cols-2">
        <Form.Item name={["company", "name"]} label="Company name" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name={["company", "status"]} label="Status" initialValue={1}><Radio.Group options={[{ label: "Active", value: 1 }, { label: "Inactive", value: 0 }]} /></Form.Item>
        <Form.Item name={["company", "usesBranches"]} label="Branch mode" initialValue={true} className="md:col-span-2">
            <Radio.Group options={[{ label: "Uses branches", value: true }, { label: "Branchless", value: false }]} />
        </Form.Item>
    </div>
);

export default CompanyStep;
