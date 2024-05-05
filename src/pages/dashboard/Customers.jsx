import React from "react";

import CustomersFilter from "../../components/dash-customers/CustomersFilter";
import CustomersTable from "../../components/dash-customers/CustomersTable";

const Users = () => {
    return (
        <div className="flex flex-col gap-10 pr-10">
            <CustomersFilter />
            <CustomersTable />
        </div>
    );
};

export default Users;
