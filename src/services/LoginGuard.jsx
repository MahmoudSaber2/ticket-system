import { Navigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const LoginGuard = (Component) => {
    const Wrapper = (props) => {
        const [cookies] = useCookies();
        const profile = cookies?.profile;

        return profile?.userId > 0 ? <Navigate to="/dashboard" /> : <Component {...props} />;
    };
    return Wrapper;
};

export default LoginGuard;
