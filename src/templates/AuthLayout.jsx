import React from "react";
import { Outlet } from "react-router-dom";

import LoginGuard from "../services/LoginGuard";
import Footer from "../components/Footer";

const AuthLayout = () => {
	return (
		<>
			<div className="bg-white flex items-center justify-center h-screen">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default LoginGuard(AuthLayout);
