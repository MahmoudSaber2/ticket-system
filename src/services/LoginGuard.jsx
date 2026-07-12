import { Navigate } from "react-router-dom";

import { useSessionStore } from "../store";

const LoginGuard = (Component) => {
    const Wrapper = (props) => {
        const status = useSessionStore((state) => state.status);
        return status === "authenticated" ? <Navigate to="/dashboard/tickets" replace /> : <Component {...props} />;
    };
    return Wrapper;
};

export default LoginGuard;
