import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RootRoute } from "./routes/RootRoute";
import { DashboardRoute } from "./routes/DashboardRoute";
import { AuthRoute } from "./routes/AuthRoute";
import AxiosInterceptor from "./services/Axiosinterceptor";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([RootRoute, DashboardRoute, AuthRoute]);

function App() {
    return (
        <AxiosInterceptor>
            <RouterProvider router={router} />
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
