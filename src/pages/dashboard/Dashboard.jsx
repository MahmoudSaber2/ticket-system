import { useState } from "react";
import { Alert, Skeleton } from "antd";

import DashboardFilters from "../../components/dashboard/DashboardFilters";
import DistributionChart from "../../components/dashboard/DistributionChart";
import MetricCards from "../../components/dashboard/MetricCards";
import TicketSummaryLists from "../../components/dashboard/TicketSummaryLists";
import TrendChart from "../../components/dashboard/TrendChart";
import { useDashboardReport } from "../../hooks/dashboard/useReportingHooks";
import { useSessionStore } from "../../store";

const Dashboard = () => {
    const [filter, setFilter] = useState({});
    const tenant = useSessionStore((state) => state.tenant);
    const { data: report, isLoading, error } = useDashboardReport(filter);

    if (isLoading) return <Skeleton active paragraph={{ rows: 12 }} />;
    if (error) return <Alert type="error" showIcon message="Dashboard unavailable" description="Check your access or try again." />;

    const series = report?.series || {};
    return (
        <main className="flex flex-col gap-5 pb-10 pr-4">
            <header>
                <h1 className="text-2xl font-semibold">Pannello ticket</h1>
                {tenant?.companyName && <p className="text-slate-500">{tenant.companyName}{tenant.branchName ? ` · ${tenant.branchName}` : ""}</p>}
            </header>
            <DashboardFilters onChange={setFilter} />
            <MetricCards metrics={report?.kpis} />
            <div className="grid gap-4 xl:grid-cols-4">
                <TrendChart rows={series.createdVsClosed} />
                <DistributionChart title="Stati" rows={series.statusDistribution} />
                <DistributionChart title="Urgenze" rows={series.importanceDistribution} />
            </div>
            {tenant?.usesBranches !== false && series.branchVolume?.length > 0 && (
                <DistributionChart title="Volume per filiale" rows={series.branchVolume} />
            )}
            <TicketSummaryLists oldestOpen={report?.oldestOpen} recentActivity={report?.recentActivity} />
        </main>
    );
};

export default Dashboard;
