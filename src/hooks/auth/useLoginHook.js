import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { useLoginStore } from "../../store";

export const useLogin = () => {
	const { setLogin, setUser } = useLoginStore();

	return useMutation({
		mutationFn: (data) => {
			return axios.post("https://reqres.in/api/login", data);
		},
		onSuccess: (data) => {
			console.log(data);
			toast.success("Login Successful");
			setLogin(true);
			setUser(data.data);
		},
		onError: (error) => {
			toast.error("Login Failed");
			console.log(error);
		},
	});
};
