import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AxiosInterceptor = ({ children }) => {
    const [cookies] = useCookies();
    const token = cookies?.token;

    axios.defaults.baseURL = "https://customerservicebe.testingelmo.com/api/v1/";
    axios.defaults.headers.post.Authorization = `Bearer ${token}`;
    axios.defaults.headers.delete.Authorization = `Bearer ${token}`;
    axios.defaults.headers.get.Authorization = `Bearer ${token}`;
    axios.defaults.headers.put.Authorization = `Bearer ${token}`;

    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, [token]);

    return <>{children}</>;
};

export default AxiosInterceptor;
