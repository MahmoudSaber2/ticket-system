import { useEffect } from "react";
import axios from "axios";

const AxiosInterceptor = ({ children }) => {
    // We still use useCookies to trigger a re-render if needed,
    // but the actual token for the request is read dynamically.

    axios.defaults.baseURL = "https://customerservicebe.testingelmo.com/api/v1/";
    
    // It's better not to set default headers dynamically here on every render,
    // we'll let the interceptor handle it for all methods.

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                // Dynamically read the token from cookies just before the request is sent.
                const match = document.cookie.match(/(^| )token=([^;]+)/);
                const latestToken = match ? match[2] : null;

                if (latestToken) {
                    config.headers.Authorization = `Bearer ${latestToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, []); // Empty dependency array so we only set this interceptor up once

    return <>{children}</>;
};

export default AxiosInterceptor;
