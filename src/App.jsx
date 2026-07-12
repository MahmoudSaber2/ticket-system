import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RootRoute } from "./routes/RootRoute";
import { DashboardRoute } from "./routes/DashboardRoute";
import { AuthRoute } from "./routes/AuthRoute";
import AxiosInterceptor from "./services/Axiosinterceptor";
import SessionBootstrap from "./services/SessionBootstrap";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([RootRoute, DashboardRoute, AuthRoute], {
    basename: "/",
});

function App() {
    return (
        <AxiosInterceptor>
            <SessionBootstrap>
                <RouterProvider router={router} />
            </SessionBootstrap>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                closeOnClick
            />
        </AxiosInterceptor>
    );
}

export default App;
