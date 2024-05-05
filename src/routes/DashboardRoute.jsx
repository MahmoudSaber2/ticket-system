import { Dashboard, ManagementTickets, Customers } from "../pages";
import NotFound from "../components/NotFound";
import DashboardLayout from "../templates/DashboardLayout";

export const DashboardRoute = {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
        {
            index: true,
            element: <Dashboard />,
        },
        {
            path: "tickets",
            element: <ManagementTickets />,
        },
        {
            path: "users",
            element: <Customers />,
        },
    ],
};
