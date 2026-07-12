import { useState } from "react";
import { Alert, Table } from "antd";

import { useCompanies } from "../../hooks/dashboard/useCompanies";
import { useResourceExport } from "../../hooks/dashboard/useResourceExport";
import { TableHeader, UiContainer } from "../../components/common";
import BranchAdministration from "../../components/companies/BranchAdministration";
import CompanyEditButton from "../../components/companies/CompanyEditButton";

const Companies = () => {
    const [page, setPage] = useState({ current: 1, pageSize: 10 });
    const companies = useCompanies(page);
    const exportCompanies = useResourceExport("companies");
    if (companies.error) return <Alert type="error" showIcon message="Companies unavailable" />;

    const rows = companies.data?.result?.companies || [];
    const pagination = companies.data?.pagination || {};
    return (
        <main className="pr-4">
            <UiContainer>
                <TableHeader ListName="Companies" dataLength={pagination.total || 0} exportAction={() => exportCompanies.mutate({})} exporting={exportCompanies.isPending} />
                <Table rowKey="companyId" loading={companies.isLoading} dataSource={rows} expandable={{ expandedRowRender: (company) => <BranchAdministration company={company} /> }} pagination={{ current: pagination.current_page, pageSize: pagination.per_page, total: pagination.total }} onChange={setPage}
                    columns={[
                        { title: "Name", dataIndex: "name" },
                        { title: "Mode", render: (_, company) => company.usesBranches ? "Branches" : "Branchless" },
                        { title: "Branches", render: (_, company) => company.branches?.map((branch) => branch.name).join(", ") || "—" },
                        { title: "Status", render: (_, company) => Number(company.status) === 1 ? "Active" : "Inactive" },
                        { title: "", render: (_, company) => <CompanyEditButton company={company} /> },
                    ]} />
            </UiContainer>
        </main>
    );
};

export default Companies;
