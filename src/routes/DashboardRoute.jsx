import { lazy, Suspense } from "react";

import NotFound from "../components/NotFound";
import DashboardLayout from "../templates/DashboardLayout";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const ManagementTickets = lazy(() => import("../pages/dashboard/ManagementTickets"));
const Customers = lazy(() => import("../pages/dashboard/Customers"));
const Admins = lazy(() => import("../pages/dashboard/Admins"));
const Roles = lazy(() => import("../pages/dashboard/Roles"));
const SubmitTicket = lazy(() => import("../pages/dashboard/SubmitTicket"));
const Companies = lazy(() => import("../pages/dashboard/Companies"));
const Onboarding = lazy(() => import("../pages/dashboard/Onboarding"));
const load = (Page) => <Suspense fallback={<div>Loading…</div>}><Page /></Suspense>;

export const DashboardRoute = {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
        { index: true, element: load(Dashboard) },
        { path: "tickets", element: load(ManagementTickets) },
        { path: "submit", element: load(SubmitTicket) },
        { path: "users", element: load(Customers) },
        { path: "admins", element: load(Admins) },
        { path: "roles", element: load(Roles) },
        { path: "companies", element: load(Companies) },
        { path: "onboarding", element: load(Onboarding) },
    ],
};
