import RolesTable from "../../components/dash-roles/RolesTable";
import RoleMatrix from "../../components/dash-roles/RoleMatrix";
import { useRoleMatrix } from "../../hooks/dashboard/roles/useRolesHooks";

const Roles = () => {
    const { data } = useRoleMatrix();
    return (
        <div className="flex flex-col gap-6 pr-4 md:pr-10">
            <RoleMatrix templates={data?.templates} />
            <RolesTable />
        </div>
    );
};

export default Roles;
