import { Link } from "react-router-dom";

export const SidebarUserDrop = ({ logout }) => {
    return [
        {
            key: "1",
            label: <Link to={"#"}>Profile</Link>,
        },
        {
            key: "2",
            label: "Logout",
            danger: true,
            onClick: () => logout(),
        },
    ];
};
