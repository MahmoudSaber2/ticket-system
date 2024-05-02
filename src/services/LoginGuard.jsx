import { Navigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const LoginGuard = (Component) => {
	const Wrapper = (props) => {
		const [cookies] = useCookies();

		return cookies?.user > 0 ? <Navigate to="/dashboard" /> : <Component {...props} />;
	};
	return Wrapper;
};

export default LoginGuard;
