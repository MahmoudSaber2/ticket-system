import { Button, Form, Input, Select } from "antd";

const branchRoles = new Set(["branch_manager", "employee"]);
const roleOptions = (roles, owner) => roles.filter((role) => (
    owner ? role.label === "company_owner" : role.label !== "company_owner"
));

const AccountFields = ({ itemPath, watchPath, roles, branches, owner = false }) => {
    const form = Form.useFormInstance();
    const roleId = Form.useWatch([...watchPath, "roleId"], form);
    const roleName = roles.find((role) => role.value === roleId)?.label;
    const needsBranch = !owner && branches.length > 0 && branchRoles.has(roleName);
    const changeRole = (nextRoleId) => {
        const nextRole = roles.find((role) => role.value === nextRoleId)?.label;
        if (!branchRoles.has(nextRole)) form.setFieldValue([...watchPath, "branchKey"], undefined);
    };

    return <div className="grid gap-3 md:grid-cols-2">
        <Form.Item name={[...itemPath, "name"]} label="Name" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name={[...itemPath, "username"]} label="Username" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name={[...itemPath, "email"]} label="Email" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
        <Form.Item name={[...itemPath, "roleId"]} label="Role" rules={[{ required: true }]}>
            <Select options={roleOptions(roles, owner)} onChange={changeRole} />
        </Form.Item>
        {needsBranch && <Form.Item name={[...itemPath, "branchKey"]} label="Branch" rules={[{ required: true }]}>
            <Select options={branches.map((branch) => ({ label: branch.name, value: branch.key }))} />
        </Form.Item>}
    </div>;
};

export const OwnerStep = ({ roles }) => (
    <AccountFields itemPath={["owner"]} watchPath={["owner"]} roles={roles} branches={[]} owner />
);

export const TeamStep = ({ roles, branches }) => (
    <Form.List name="accounts">
        {(fields, { add, remove }) => <div className="space-y-4">
            {fields.map((field) => <section key={field.key} className="rounded-lg border p-4">
                <AccountFields itemPath={[field.name]} watchPath={["accounts", field.name]} roles={roles} branches={branches} />
                <Button danger onClick={() => remove(field.name)}>Remove account</Button>
            </section>)}
            <Button type="dashed" onClick={() => add()}>Add account</Button>
        </div>}
    </Form.List>
);
