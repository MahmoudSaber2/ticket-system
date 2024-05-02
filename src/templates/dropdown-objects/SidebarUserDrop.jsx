import { Link } from "react-router-dom";

export const SidebarUserDrop = () => {
    return [
        {
            key: "1",
            label: <Link>Profile</Link>,
        },
        {
            key: "2",
            label: "Logout",
            danger: true,
        },
    ];
};
