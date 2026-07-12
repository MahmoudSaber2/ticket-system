import axios from "axios";

import { useSessionStore } from "../store";
import { createSingleFlight } from "./singleFlight";

const legacyCookieNames = ["token", "profile", "permissions", "role", "logoutTime"];

export const apiBaseUrl = import.meta.env.VITE_API_URL || "https://customerservicebe.testingelmo.com/api/v1/";

export function clearLegacyAuthCookies() {
    legacyCookieNames.forEach((name) => {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    });
}

export function sessionFromResponse(payload) {
    return {
        accessToken: payload.token ?? useSessionStore.getState().accessToken,
        profile: payload.profile,
        role: payload.role,
        roles: payload.roles || [],
        permissions: payload.permissions || [],
        accountType: payload.accountType,
        tenant: payload.tenant,
    };
}

export const refreshAccessToken = createSingleFlight(() => axios
    .post("admin/auth/refresh", null, { skipAuth: true, skipRefresh: true })
    .then(({ data }) => {
        useSessionStore.getState().setAccessToken(data.token);
        return data.token;
    }));

export async function loadCurrentSession(accessToken) {
    useSessionStore.getState().setAccessToken(accessToken);
    const { data } = await axios.get("admin/auth/me", { skipRefresh: true });
    useSessionStore.getState().setSession(sessionFromResponse(data));
}

export function sessionStatusFor(error, fallback = "unauthenticated") {
    if (error?.response?.status === 403) {
        return error.response.data?.code === "inactive_tenant" ? "disabled-tenant" : "forbidden";
    }

    return fallback;
}
