import { Image } from "antd";

import logo from "../../assets/logo.webp";

const Logo = () => {
    return (
        <div className="flex items-center gap-3 text-lg">
            <Image
                src={logo}
                preview={false}
                className="max-w-6"
                alt="logo"
            />
            <h2 className="text-lg font-bold">Elmo tech</h2>
        </div>
    );
};

export default Logo;
