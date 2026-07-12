import { lazy, Suspense } from "react";

import RootLayout from "../templates/RootLayout";
import NotFound from "../components/NotFound";

const Landing = lazy(() => import("../pages/Landing"));
const Review = lazy(() => import("../pages/Review"));
const SetupPassword = lazy(() => import("../pages/SetupPassword"));

export const RootRoute = {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
        { index: true, element: <Suspense fallback={<div>Loading…</div>}><Landing /></Suspense> },
        { path: "review", element: <Suspense fallback={<div>Loading…</div>}><Review /></Suspense> },
        { path: "setup-password", element: <Suspense fallback={<div>Loading…</div>}><SetupPassword /></Suspense> },
    ],
};
