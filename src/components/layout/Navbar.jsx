import React, { useState } from "react";

import { useCurrentPageName } from "../../store";
import Drawer from "./Drawer";

import { AlignLeftOutlined } from "@ant-design/icons";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { currentPageName } = useCurrentPageName();

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex w-full items-center gap-10">
            <AlignLeftOutlined
                className="block cursor-pointer text-xl lg:hidden"
                onClick={() => setOpen(true)}
            />
            <h1 className="w-full text-center text-xl font-bold lg:text-left">{currentPageName}</h1>

            <Drawer
                open={open}
                onClose={onClose}
            />
        </div>
    );
};

export default Navbar;
