import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ComponentGuard = (Component) => {
	const Wrapper = (props) => {
		const [cookies] = useCookies();

		return cookies?.user > 0 ? <Component {...props} /> : <Navigate to="/auth" />;
	};
	return Wrapper;
};

export default ComponentGuard;
