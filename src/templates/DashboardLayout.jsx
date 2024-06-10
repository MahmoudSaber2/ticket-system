import { Outlet } from "react-router-dom";

import ComponentGuard from "../services/DashGuard";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { AutoLogout } from "../services/AutoLogout";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen w-full bg-white">
            <AutoLogout />
            <div className="fixed m-2 hidden h-[98vh] w-[300px] items-start justify-center overflow-y-auto rounded-md border bg-white shadow-md lg:flex">
                <Sidebar />
            </div>
            <div className="flex w-full flex-col px-2 lg:pl-[350px]">
                <div className="fixed flex h-[64px] w-full items-center">
                    <Navbar />
                </div>

                <div className="pt-[74px]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ComponentGuard(DashboardLayout);
