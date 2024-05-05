import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ComponentGuard = (Component) => {
    const Wrapper = (props) => {
        const [cookies] = useCookies();
        const profile = cookies?.profile;

        return profile?.userId > 0 ? <Component {...props} /> : <Navigate to="/auth" />;
    };
    return Wrapper;
};

export default ComponentGuard;
