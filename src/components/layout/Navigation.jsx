import React from "react";
import { Cookies } from "react-cookie";

import Link from "./Link";

import { AppstoreOutlined, DiffOutlined, UserAddOutlined, UsergroupAddOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { GetPermission } from "../../utils/Functions";

const Navigation = () => {
    const cookies = new Cookies();

    const Links = [
        {
            id: 1,
            header: "",
            links: [{ id: 1, name: "Pannello", link: "/dashboard", icon: <AppstoreOutlined />, show: cookies.get("role")?.id === 1 }],
        },
        {
            id: 2,
            header: "ANAGRAFICHE",
            links: [
                { id: 2, name: "Tickets", link: "tickets", icon: <DiffOutlined />, show: GetPermission("all_tickets") },
                // { id: 3, name: "Aziende", link: "companies", icon: <InsertRowLeftOutlined /> },
                { id: 4, name: "Aggiungi utente", link: "users", icon: <UserAddOutlined />, show: GetPermission("all_customers") },
                { id: 5, name: "Admin utente", link: "admins", icon: <UsergroupAddOutlined />, show: GetPermission("all_users") },
                { id: 5, name: "Ruolo's", link: "roles", icon: <SafetyCertificateOutlined />, show: GetPermission("all_roles") },
            ],
        },
    ];

    return (
        <div className="flex w-full flex-col items-start justify-start gap-4 px-2">
            {Links.map((link) => (
                <React.Fragment key={link.id}>
                    <p className="text-[14px] font-[200] text-slate-400">{link.header}</p>
                    <div className="flex w-full flex-col items-start justify-start gap-1 px-2">
                        {link.links
                            .filter((item) => item.show)
                            .map((item) => (
                                <Link
                                    key={item.id}
                                    {...item}
                                />
                            ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Navigation;
