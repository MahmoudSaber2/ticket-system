import React from "react";

import AdminsFilter from "../../components/dash-admins/AdminsFilter";
import AdminsTable from "../../components/dash-admins/AdminsTable";

const Admins = () => {
    return (
        <div className="flex flex-col gap-10 pr-10">
            <AdminsFilter />
            <AdminsTable />
        </div>
    );
};

export default Admins;
