import { Button, Form, Input } from "antd";

const BranchesStep = ({ branchless }) => {
    if (branchless) return <p className="rounded-lg bg-slate-50 p-4 text-slate-600">This company does not use branches.</p>;

    return (
        <Form.List name="branches">
            {(fields, { add, remove }) => <div className="space-y-3">
                {fields.map((field) => <div key={field.key} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]">
                    <Form.Item {...field} name={[field.name, "key"]} label="Reference" rules={[{ required: true }]}><Input placeholder="hq" /></Form.Item>
                    <Form.Item {...field} name={[field.name, "name"]} label="Branch name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Button danger onClick={() => remove(field.name)} className="mt-8">Remove</Button>
                </div>)}
                <Button type="dashed" onClick={() => add()}>Add branch</Button>
            </div>}
        </Form.List>
    );
};

export default BranchesStep;
