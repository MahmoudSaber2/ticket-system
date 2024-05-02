import React from "react";
import { Link as RLink, useLocation } from "react-router-dom";
import { useCurrentPageName } from "../../store";

const Link = ({ ...props }) => {
    const { pathname } = useLocation();
    const { setCurrentPageName } = useCurrentPageName();

    const { link, name, icon } = props;

    const correctPath = pathname.replace("/dashboard", "").replace("/", "");
    // const changeTo = to.replace("/", "");
    const changeTo = link;

    const isActive = pathname === link || correctPath.startsWith(changeTo) || correctPath?.includes(`${changeTo}/`);

    return (
        <RLink
            to={link}
            onClick={() => setCurrentPageName(name)}
            className={`flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-200 ${isActive && "bg-slate-200"}`}>
            {icon} {name}
        </RLink>
    );
};

export default Link;
