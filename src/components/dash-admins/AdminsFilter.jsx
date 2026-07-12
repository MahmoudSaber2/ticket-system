import { Form } from "antd";

import { useTeamBranches, useTeamOptions } from "../../hooks/global/useSelectsHook";
import { useFilter, useSessionStore } from "../../store";
import { GetOptions, StatusOptions2 } from "../../utils/Functions";
import { FilterWrapper, SelectInput, TextInput, UiContainer } from "../common";

const AdminsFilter = () => {
    const { setFilterData } = useFilter();
    const accountType = useSessionStore((state) => state.accountType);
    const [form] = Form.useForm();
    const companyId = Form.useWatch("company", form);
    const { data: options = [] } = useTeamOptions();
    const companies = GetOptions(options, "companies") || [];
    const roles = GetOptions(options, "roles") || [];
    const selectedCompany = companies.find((company) => company.value === companyId);
    const showBranches = accountType === "internal" && selectedCompany?.usesBranches;
    const { data: branchOptions = [], isLoading } = useTeamBranches(companyId, Boolean(showBranches));
    const branches = GetOptions(branchOptions, "branches") || [];

    const updateFilters = (_, fields) => setFilterData(Object.fromEntries(
        Object.entries(fields).filter(([, field]) => field !== undefined && field !== ""),
    ));
    const changeCompany = () => form.setFieldValue("branch", undefined);
    const clear = () => {
        form.resetFields();
        setFilterData({});
    };

    return (
        <Form form={form} layout="vertical" onValuesChange={updateFilters}>
            <UiContainer>
                <FilterWrapper className="border-none" title="Filtro team" loading={false} withButtons={false} withClear clearFilter={clear}>
                    <Form.Item label="Cerca" name="search"><TextInput placeholder="Nome, email o username" size="large" /></Form.Item>
                    <Form.Item label="Stato" name="status"><SelectInput allowClear placeholder="Tutti gli stati" size="large" options={StatusOptions2} /></Form.Item>
                    <Form.Item label="Ruolo" name="role"><SelectInput allowClear placeholder="Tutti i ruoli" size="large" options={roles} /></Form.Item>
                    {accountType === "internal" && <Form.Item label="Azienda" name="company">
                        <SelectInput allowClear showSearch optionFilterProp="label" placeholder="Tutte le aziende" size="large" options={companies} onChange={changeCompany} />
                    </Form.Item>}
                    {showBranches && <Form.Item label="Filiale" name="branch">
                        <SelectInput allowClear loading={isLoading} placeholder="Tutte le filiali" size="large" options={branches} />
                    </Form.Item>}
                </FilterWrapper>
            </UiContainer>
        </Form>
    );
};

export default AdminsFilter;
