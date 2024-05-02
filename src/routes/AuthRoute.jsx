import { Login } from "../pages";
import NotFound from "../components/NotFound";
import AuthLayout from "../templates/AuthLayout";

export const AuthRoute = {
	path: "/auth",
	element: <AuthLayout />,
	errorElement: <NotFound />,
	children: [
		{
			index: true,
			element: <Login />,
		},
	],
};
