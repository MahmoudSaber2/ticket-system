import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Cookies } from "react-cookie";

export const useLogin = () => {
	const cookies = new Cookies();
    const logOutTime = new Date(Date.now() + 8 * 60 * 60 * 1000);

    return useMutation({
        mutationFn: (data) => {
            return axios.post("admin/auth/login", data);
        },
        onSuccess: (response) => {
            const { data } = response;
            cookies.set("token", data.token);
            cookies.set("profile", data.profile);
            cookies.set("permissions", data.permissions);
            cookies.set("role", data.role);
            cookies.set("logoutTime", logOutTime);
            toast.success("Login Successful");
        },
        onError: (error) => {
            toast.error("Login Failed");
            console.log(error);
        },
    });
};

export const UseSignOut = () => {
    const cookies = new Cookies();

    const signOutFunction = async () => {
        return await axios.post("admin/auth/logout");
    };

    return useMutation({
        mutationFn: () => signOutFunction(),

        onSuccess: () => {
            toast.success("تم تسجيل الخروج بنجاح");
            cookies.remove("token");
            cookies.remove("profile");
            cookies.remove("permissions");
            cookies.remove("role");
            cookies.remove("logoutTime");
            window.location.href = "/auth";
        },

        onError: () => {
            cookies.remove("token");
            cookies.remove("profile");
            cookies.remove("permissions");
            cookies.remove("role");
            cookies.remove("logoutTime");
            window.location.href = "/auth";
        },
    });
};
