import { useCallback, useEffect } from "react";

import { useCookies } from "react-cookie";
import { UseSignOut } from "../hooks/auth/useLoginHook";

export function AutoLogout() {
    const [cookies] = useCookies();
    const logoutTime = cookies?.logoutTime;
    const profile = cookies?.profile;
    const { userId } = profile;

    const signOut = UseSignOut();

    const logout = useCallback(() => {
        signOut.mutate();
    }, [signOut]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const logoutTimes = new Date(logoutTime);
        const now = new Date();

        if (now > logoutTimes) {
            logout();
        }

        // Add a listener for the onbeforeunload event
        window.addEventListener("onbeforeunload", logout);

        // Remove the listener when the component unmounts
        return () => {
            window.removeEventListener("onbeforeunload", logout);
        };
    }, [logoutTime, userId, logout]);

    return null;
}
