import {
    AppstoreOutlined,
    DiffOutlined,
    PlusCircleOutlined,
    SafetyCertificateOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    BankOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";

import Link from "./Link";
import { useSessionStore } from "../../store";
import { canAccessRoute, dashboardRoutes } from "../../services/access";

const icons = {
    "/dashboard": <AppstoreOutlined />,
    "/dashboard/tickets": <DiffOutlined />,
    "/dashboard/users": <UserAddOutlined />,
    "/dashboard/admins": <UsergroupAddOutlined />,
    "/dashboard/roles": <SafetyCertificateOutlined />,
    "/dashboard/submit": <PlusCircleOutlined />,
    "/dashboard/companies": <BankOutlined />,
    "/dashboard/onboarding": <ApartmentOutlined />,
};

const Navigation = () => {
    const session = useSessionStore();
    const visibleRoutes = dashboardRoutes.filter((route) => canAccessRoute(route, session));

    return (
        <nav className="flex w-full flex-col gap-1 px-4" aria-label="Dashboard navigation">
            {visibleRoutes.map((route) => (
                <Link
                    key={route.path}
                    name={route.label}
                    link={route.path}
                    icon={icons[route.path]}
                />
            ))}
        </nav>
    );
};

export default Navigation;
