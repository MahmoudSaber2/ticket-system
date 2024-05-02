import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RootRoute } from "./routes/RootRoute";
import { DashboardRoute } from "./routes/DashboardRoute";
import { AuthRoute } from "./routes/AuthRoute";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([RootRoute, DashboardRoute, AuthRoute]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer position="bottom-right" />
		</>
	);
}

export default App;
