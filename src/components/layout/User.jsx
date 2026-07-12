import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useSessionStore } from "../../store";
import { SidebarUserDrop } from "../../templates/dropdown-objects/SidebarUserDrop";
import { UseSignOut } from "../../hooks/auth/useLoginHook";

const User = () => {
    const profile = useSessionStore((state) => state.profile);
    const role = useSessionStore((state) => state.role);
    const signOut = UseSignOut();
    const userMenu = SidebarUserDrop({ logout: () => signOut.mutate() });

    return (
        <Dropdown menu={{ items: userMenu }} placement="top" arrow>
            <div className="flex items-center gap-3">
                <Avatar size={44} src={profile?.avatar} icon={<UserOutlined />} />
                <div className="flex flex-col">
                    <h1 className="text-[16px]">{profile?.name}</h1>
                    <p className="text-[14px]">{role?.name}</p>
                </div>
            </div>
        </Dropdown>
    );
};

export default User;
