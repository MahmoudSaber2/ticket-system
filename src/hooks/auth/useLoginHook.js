import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Cookies } from "react-cookie";

export const useLogin = () => {
	const cookies = new Cookies();
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
            toast.success("Login Successful");
        },
        onError: (error) => {
            toast.error("Login Failed");
            console.log(error);
        },
    });
};
