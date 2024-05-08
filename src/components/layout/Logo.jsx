import logo from "../../assets/logo.webp";

const Logo = () => {
    return (
        <div className="flex w-full items-center justify-center gap-2">
            <img
                src={logo}
                className="size-full max-w-6"
                alt="logo"
            />
            <h2 className="text-lg font-bold">Elmo tech</h2>
        </div>
    );
};

export default Logo;
