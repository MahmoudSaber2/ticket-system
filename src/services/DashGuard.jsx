import { Navigate, useLocation } from "react-router-dom";
import { Result } from "antd";

import { useSessionStore } from "../store";
import { canAccessRoute, routeForPath } from "./access";

const statusMessages = {
    forbidden: "Your account cannot access this application.",
    "disabled-tenant": "Your company or branch is disabled.",
    "session-expired": "Your session expired. Please sign in again.",
};

const ComponentGuard = (Component) => {
    const Wrapper = (props) => {
        const location = useLocation();
        const session = useSessionStore();
        if (session.status !== "authenticated") {
            if (statusMessages[session.status]) {
                return <Result status="403" title="Access unavailable" subTitle={statusMessages[session.status]} />;
            }
            return <Navigate to="/auth" replace />;
        }

        const route = routeForPath(location.pathname);
        return route && !canAccessRoute(route, session)
            ? <Result status="403" title="403" subTitle="You do not have permission to view this page." />
            : <Component {...props} />;
    };
    return Wrapper;
};

export default ComponentGuard;
