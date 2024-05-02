import { ManagementTickets } from "../pages";
import NotFound from "../components/NotFound";
import DashboardLayout from "../templates/DashboardLayout";

export const DashboardRoute = {
	path: "/dashboard",
	element: <DashboardLayout />,
	errorElement: <NotFound />,
	children: [
		{
			index: true,
			element: <ManagementTickets />,
		},
	],
};
