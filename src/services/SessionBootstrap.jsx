import { useEffect } from "react";
import { Spin } from "antd";

import { useSessionStore } from "../store";
import { clearLegacyAuthCookies, loadCurrentSession, refreshAccessToken, sessionStatusFor } from "./session";

const SessionBootstrap = ({ children }) => {
    const status = useSessionStore((state) => state.status);

    useEffect(() => {
        clearLegacyAuthCookies();
        refreshAccessToken()
            .then(loadCurrentSession)
            .catch((error) => useSessionStore.getState().clearSession(sessionStatusFor(error)));
    }, []);

    if (status === "booting") {
        return (
            <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading session">
                <Spin size="large" />
            </div>
        );
    }

    return children;
};

export default SessionBootstrap;
