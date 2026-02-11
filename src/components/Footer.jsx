import logo from "../assets/logo.webp";

const Footer = () => {
    return (
        <footer className="flex h-[64px] items-center justify-center border-t bg-white px-10 shadow-md">
            <div className="flex items-center gap-2">
                <span>© 2023 - {new Date().getFullYear()},</span>
                <div className="flex items-center justify-center gap-2 text-lg">
                    <img src={logo} className="max-w-6" alt="logo" />
                    <h2 className="text-lg font-bold">Elmo tech</h2>
                </div>
                <span>- All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
