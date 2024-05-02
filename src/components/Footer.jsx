import { Image } from "antd";
import logo from "../assets/logo.webp";

const Footer = () => {
	return (
		<footer className="h-[64px] flex items-center justify-center bg-white shadow-md px-10 border-t">
			<div className="flex gap-2 items-center">
				<span>© 2022 - {new Date().getFullYear()},</span>
				<div className="flex items-center gap-3 text-lg">
					<Image
						src={logo}
						preview={false}
						className="max-w-6"
						alt="logo"
					/>
					<h2 className="text-lg font-bold">Elmo tech</h2>
				</div>
				<span>- All Rights Reserved.</span>
			</div>
		</footer>
	);
};

export default Footer;
