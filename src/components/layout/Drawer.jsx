import { Drawer as AntdDrawer } from "antd";

import Logo from "./Logo";
import Navigation from "./Navigation";
import User from "./User";
import { CloseOutlined } from "@ant-design/icons";

const Drawer = ({ open, onClose, placement = "left" }) => {
    return (
        <AntdDrawer
            placement={"left"}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}>
            <div className="relative flex size-full flex-col items-center justify-between gap-10">
                <div className="absolute left-0 top-0 h-1/4 w-full border-b border-b-white">
                    <CloseOutlined
                        onClick={onClose}
                        className="absolute right-0"
                    />
                </div>
                <div className="flex w-full grow-0 items-center justify-center border-b pb-5">
                    <Logo />
                </div>
                <div className="flex flex-1">
                    <Navigation />
                </div>
                <div className="flex h-[64px] w-full grow-0 items-center border-t">
                    <User />
                </div>
            </div>
        </AntdDrawer>
    );
};

export default Drawer;
