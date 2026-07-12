import { Navigate } from "react-router-dom";

import { useSessionStore } from "../store";

const Landing = () => {
    const status = useSessionStore((state) => state.status);
    const accountType = useSessionStore((state) => state.accountType);

    if (status !== "authenticated") {
        return <Navigate to="/auth" replace />;
    }

    return <Navigate to={accountType === "tenant" ? "/dashboard/submit" : "/dashboard"} replace />;
};

export default Landing;
