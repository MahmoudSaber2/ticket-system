import { Avatar, Dropdown } from "antd";
import React from "react";
import { useCookies, Cookies } from "react-cookie";

import { UserOutlined } from "@ant-design/icons";
import { SidebarUserDrop } from "../../templates/dropdown-objects/SidebarUserDrop";

const User = () => {
    const cookie = new Cookies();
    const [cookies, setCookie] = useCookies();
    const profile = cookies?.profile;

    const handleLogout = () => {
        setCookie("token", "", { path: "/" });
        setCookie("profile", "", { path: "/" });
        setCookie("permissions", "", { path: "/" });
        setCookie("role", "", { path: "/" });
        cookie.remove("token");
        cookie.remove("profile");
        cookie.remove("permissions");
        cookie.remove("role");
    };

    const userMenu = SidebarUserDrop({ logout: () => handleLogout() });

    return (
        <Dropdown
            menu={{ items: userMenu }}
            placement="top"
            arrow>
            <div className="flex items-center gap-3">
                <Avatar
                    size={44}
                    src={profile?.avatar}
                    icon={<UserOutlined />}
                />
                <div className="flex flex-col">
                    <h1 className="text-[16px]">{profile?.name}</h1>
                    <p className="text-[14px]">{cookies?.role?.name}</p>
                </div>
            </div>
        </Dropdown>
    );
};

export default User;
