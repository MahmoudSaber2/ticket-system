import { useEffect } from "react";
import axios from "axios";

import { useSessionStore } from "../store";
import { apiBaseUrl, refreshAccessToken } from "./session";

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.withCredentials = true;

const AxiosInterceptor = ({ children }) => {
    useEffect(() => {
        const requestId = axios.interceptors.request.use((config) => {
            const accessToken = useSessionStore.getState().accessToken;
            if (accessToken && !config.skipAuth) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });
        const responseId = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const request = error.config;
                if (error.response?.status !== 401 || request?.skipRefresh || request?._retried) {
                    return Promise.reject(error);
                }
                request._retried = true;
                try {
                    const accessToken = await refreshAccessToken();
                    request.headers.Authorization = `Bearer ${accessToken}`;
                    return axios(request);
                } catch (refreshError) {
                    useSessionStore.getState().clearSession("session-expired");
                    return Promise.reject(refreshError);
                }
            },
        );

        return () => {
            axios.interceptors.request.eject(requestId);
            axios.interceptors.response.eject(responseId);
        };
    }, []);

    return children;
};

export default AxiosInterceptor;
