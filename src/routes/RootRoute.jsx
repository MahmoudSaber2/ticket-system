import { lazy, Suspense } from "react";

import RootLayout from "../templates/RootLayout";
import NotFound from "../components/NotFound";

const Tickets = lazy(() => import("../pages/Tickets"));
const Review = lazy(() => import("../pages/Review"));
const SetupPassword = lazy(() => import("../pages/SetupPassword"));

export const RootRoute = {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
        { index: true, element: <Suspense fallback={<div>Loading…</div>}><Tickets /></Suspense> },
        { path: "review", element: <Suspense fallback={<div>Loading…</div>}><Review /></Suspense> },
        { path: "setup-password", element: <Suspense fallback={<div>Loading…</div>}><SetupPassword /></Suspense> },
    ],
};
