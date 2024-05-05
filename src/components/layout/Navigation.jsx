import React from "react";

import Link from "./Link";

import { AppstoreOutlined, DiffOutlined, UserAddOutlined } from "@ant-design/icons";

const Navigation = () => {
    const Links = [
        { id: 1, header: "", links: [{ id: 1, name: "Pannello", link: "/dashboard", icon: <AppstoreOutlined /> }] },
        {
            id: 2,
            header: "ANAGRAFICHE",
            links: [
                { id: 2, name: "Tickets", link: "tickets", icon: <DiffOutlined /> },
                // { id: 3, name: "Aziende", link: "companies", icon: <InsertRowLeftOutlined /> },
                { id: 4, name: "Aggiungi utente", link: "users", icon: <UserAddOutlined /> },
            ],
        },
    ];

    return (
        <div className="flex w-full flex-col items-start justify-start gap-4 px-2">
            {Links.map((link) => (
                <React.Fragment key={link.id}>
                    <p className="text-[14px] font-[200] text-slate-400">{link.header}</p>
                    <div className="flex w-full flex-col items-start justify-start gap-1 px-2">
                        {link.links.map((item) => (
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
