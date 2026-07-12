import React from "react";
import { Outlet } from "react-router-dom";

import LoginGuard from "../services/LoginGuard";
import Footer from "../components/Footer";

const AuthLayout = () => {
	return (
		<>
			<div className="flex h-screen items-center justify-center bg-white">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default LoginGuard(AuthLayout);
