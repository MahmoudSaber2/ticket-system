import { lazy, Suspense } from "react";

import NotFound from "../components/NotFound";
import AuthLayout from "../templates/AuthLayout";

const Login = lazy(() => import("../pages/auth/Login"));

export const AuthRoute = {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Suspense fallback={<div>Loading…</div>}><Login /></Suspense> }],
};
