import axios from "axios";

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL || "https://customerservicebe.testingelmo.com/api/v1/",
    headers: {
        Accept: "application/json",
    },
    withCredentials: false,
});

export default publicApi;
