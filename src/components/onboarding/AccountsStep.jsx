import { Button, Form, Input, Select } from "antd";

const AccountFields = ({ path, roles, branches, owner }) => (
    <div className="grid gap-3 md:grid-cols-2">
        <Form.Item name={[...path, "name"]} label="Name" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name={[...path, "username"]} label="Username" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name={[...path, "email"]} label="Email" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
        <Form.Item name={[...path, "roleId"]} label="Role" rules={[{ required: true }]}>
            <Select options={roles.filter((role) => owner ? role.label === "company_owner" : role.label !== "company_owner")} />
        </Form.Item>
        {branches.length > 0 && <Form.Item name={[...path, "branchKey"]} label="Branch"><Select allowClear options={branches.map((branch) => ({ label: branch.name, value: branch.key }))} /></Form.Item>}
    </div>
);

export const OwnerStep = ({ roles, branches }) => <AccountFields path={["owner"]} roles={roles} branches={branches} owner />;

export const TeamStep = ({ roles, branches }) => (
    <Form.List name="accounts">
        {(fields, { add, remove }) => <div className="space-y-4">
            {fields.map((field) => <section key={field.key} className="rounded-lg border p-4">
                <AccountFields path={["accounts", field.name]} roles={roles} branches={branches} />
                <Button danger onClick={() => remove(field.name)}>Remove account</Button>
            </section>)}
            <Button type="dashed" onClick={() => add()}>Add account</Button>
        </div>}
    </Form.List>
);
