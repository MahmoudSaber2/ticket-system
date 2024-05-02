import { Avatar, Dropdown } from "antd";
import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { SidebarUserDrop } from "../../templates/dropdown-objects/SidebarUserDrop";

const User = () => {
    const userMenu = SidebarUserDrop();

    return (
        <Dropdown
            menu={{ items: userMenu }}
            placement="top"
            arrow>
            <div className="flex items-center gap-3">
                <Avatar
                    size={44}
                    icon={<UserOutlined />}
                />
                <div className="flex flex-col">
                    <h1 className="text-[16px]">Mahmoud Saber</h1>
                    <p className="text-[14px]">Developer</p>
                </div>
            </div>
        </Dropdown>
    );
};

export default User;
