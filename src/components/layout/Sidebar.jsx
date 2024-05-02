import React from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import User from "./User";

const Sidebar = () => {
    return (
        <div className="flex size-full flex-col items-center justify-between gap-1">
            <div className="flex h-[64px] w-full grow-0 items-center justify-center border-b">
                <Logo />
            </div>
            <div className="flex w-full flex-1">
                <Navigation />
            </div>
            <div className="flex h-[64px] w-full grow-0 items-center border-t px-5">
                <User />
            </div>
        </div>
    );
};

export default Sidebar;
