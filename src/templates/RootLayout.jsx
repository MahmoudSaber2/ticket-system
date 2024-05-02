import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";

const RootLayout = () => {
	return (
		<div>
			<Outlet />
			<Footer />
		</div>
	);
};

export default RootLayout;
