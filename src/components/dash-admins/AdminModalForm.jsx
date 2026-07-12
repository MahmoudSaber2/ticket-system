import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Select, Upload } from "antd";
import { useEffect } from "react";
import { BiX } from "react-icons/bi";

import { useAdminsEdit, useCreateAdmin, useUpdateAdmin } from "../../hooks/dashboard/admins/useAdminsHooks";
import { useTeamBranches, useTeamOptions } from "../../hooks/global/useSelectsHook";
import { useSessionStore, useTable } from "../../store";
import { AdminObj } from "../../templates/inputs/AdminObj";
import { GetOptions } from "../../utils/Functions";
import { Buttons, SelectInput, TextInput } from "../common";

const tenantRoles = new Set(["company_owner", "company_manager", "branch_manager", "employee"]);
const branchRoles = new Set(["branch_manager", "employee"]);
const statusOptions = [
    { label: "Attivo", value: 1 },
    { label: "Inattivo", value: 0 },
];

const AdminModalForm = ({ closeModal }) => {
    const { detailsId } = useTable();
    const accountType = useSessionStore((state) => state.accountType);
    const tenant = useSessionStore((state) => state.tenant);
    const [form] = Form.useForm();
    const avatar = Form.useWatch("avatar", form);
    const roleId = Form.useWatch("roleId", form);
    const selectedCompanyId = Form.useWatch("companyId", form);
    const { data: selects = [] } = useTeamOptions();
    const roles = GetOptions(selects, "roles") || [];
    const companies = GetOptions(selects, "companies") || [];
    const roleName = roles.find((role) => role.value === roleId)?.label;
    const tenantRole = tenantRoles.has(roleName);
    const requiresBranch = branchRoles.has(roleName);
    const targetCompanyId = accountType === "tenant" ? tenant?.companyId : selectedCompanyId;
    const targetCompany = companies.find((company) => company.value === targetCompanyId);
    const usesBranches = accountType === "tenant" ? tenant?.usesBranches : targetCompany?.usesBranches;
    const showCompany = accountType === "internal" && tenantRole;
    const showBranch = tenantRole && requiresBranch && usesBranches;
    const { data: branchSelects = [], isLoading: branchesLoading } = useTeamBranches(targetCompanyId, Boolean(showBranch));
    const branches = GetOptions(branchSelects, "branches") || [];

    const { data: details } = useAdminsEdit(detailsId);
    useEffect(() => {
        if (detailsId && details) form.setFieldsValue(details);
        if (!detailsId) form.resetFields();
    }, [details, detailsId, form]);
    const finish = () => {
        form.resetFields();
        closeModal();
    };
    const created = useCreateAdmin(finish);
    const updated = useUpdateAdmin(finish);
    const avatarType = typeof avatar === "string" ? "url" : "file";
    const changeRole = (nextRoleId) => {
        const nextRole = roles.find((role) => role.value === nextRoleId)?.label;
        if (!tenantRoles.has(nextRole)) form.setFieldValue("companyId", undefined);
        if (!branchRoles.has(nextRole)) form.setFieldValue("branchId", undefined);
    };
    const submit = (values) => detailsId
        ? updated.mutate({ ...values, userId: detailsId, avatar: avatarType === "file" ? avatar : undefined, password: values.password || "", _method: "PUT" })
        : created.mutate({ ...values, invite: 1, avatar: avatarType === "file" ? avatar : undefined });

    return (
        <Form form={form} name="team-member" initialValues={{ status: 1 }} onFinish={submit} layout="vertical">
            {!detailsId && <p className="mb-5 max-w-2xl text-sm text-slate-600">
                La persona riceverà un invito sicuro via email per creare la propria password.
            </p>}
            {avatarType === "url" && avatar && <div className="relative">
                <Image src={avatar} className="w-full rounded-md object-cover" alt="avatar" style={{ height: 100, width: "100%" }} />
                <BiX className="absolute right-2 top-2 cursor-pointer" size={20} color="red" onClick={() => form.setFieldValue("avatar", undefined)} />
            </div>}
            <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                {AdminObj({ inEditMode: Boolean(detailsId) }).map((input) => {
                    const Component = input.type === "select" ? SelectInput : TextInput;
                    return <Form.Item key={input.name} hidden={input.hidden} label={input.label} name={input.name} rules={[input.rules]}>
                        <Component isPassword={input.isPassword} placeholder={input.placeholder} size="large" options={input.options} />
                    </Form.Item>;
                })}
                <Form.Item name="roleId" label="Ruolo" rules={[{ required: true, message: "Seleziona il ruolo" }]}>
                    <SelectInput placeholder="Seleziona il ruolo" size="large" options={roles} onChange={changeRole} />
                </Form.Item>
                {showCompany && <Form.Item name="companyId" label="Azienda" rules={[{ required: true, message: "Seleziona l'azienda" }]}>
                    <SelectInput disabled={Boolean(detailsId)} placeholder="Seleziona l'azienda" size="large" options={companies} onChange={() => form.setFieldValue("branchId", undefined)} />
                </Form.Item>}
                {showBranch && <Form.Item name="branchId" label="Filiale" rules={[{ required: true, message: "Seleziona la filiale" }]}>
                    <SelectInput loading={branchesLoading} placeholder="Seleziona la filiale" size="large" options={branches} />
                </Form.Item>}
                {detailsId && <Form.Item name="status" label="Stato" rules={[{ required: true }]}>
                    <Select size="large" options={statusOptions} />
                </Form.Item>}
            </div>
            {(avatarType === "file" || avatar === undefined) && <Upload
                beforeUpload={() => false}
                onChange={({ file }) => form.setFieldValue("avatar", file.originFileObj || file)}
                onRemove={() => form.setFieldValue("avatar", undefined)}
                listType="picture"
                maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>}
            <Buttons className="mt-6" type="primary" size="large" block loading={created.isPending || updated.isPending} htmlType="submit">
                {detailsId ? "Modifica" : "Invia invito"}
            </Buttons>
        </Form>
    );
};

export default AdminModalForm;
