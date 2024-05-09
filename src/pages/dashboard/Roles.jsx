import React from "react";

// import RolesFilter from "../../components/dash-roles/RolesFilter";
import RolesTable from "../../components/dash-roles/RolesTable";

const Roles = () => {
    return (
        <div className="flex flex-col gap-10 pr-10">
            {/* <RolesFilter /> */}
            <RolesTable />
        </div>
    );
};

export default Roles;
