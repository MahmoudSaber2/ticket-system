import React, { useState } from "react";

import { useFilter, useTable } from "../../store";
import { useAdmins, useChangeStatus, useDeleteAdmin } from "../../hooks/dashboard/admins/useAdminsHooks";
import { Modal, Table, TableHeader, UiContainer } from "../common";
import { AdminColumnObj } from "../../templates/column/AdminColumnObj";
import AdminModalForm from "./AdminModalForm";
import { GetPermission } from "../../utils/Functions";

const UsersTable = () => {
    const { filterData } = useFilter();
    const { pagenation, detailsId, setDetailsId, setPagenation } = useTable();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: admins, isLoading, refetch } = useAdmins({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);
    const { mutate: changeStatus } = useChangeStatus(() => refetch());

    const { mutate: deleteAdmin } = useDeleteAdmin(refetch);
    const editAdmin = (id) => {
        setDetailsId(id);
        setIsModalOpen(true);
    };

    return (
        <UiContainer>
            <TableHeader
                ListName={"Amministratori"}
                dataLength={pagenation?.total}
                buttonName={GetPermission("create_user") ? "Aggiungi admin" : false}
                onClick={() => setIsModalOpen(true)}
            />

            <Table
                loadingTable={isLoading}
                onChange={setPagenation}
                tableParams={pagenation}
                isPagination={true}
                columns={AdminColumnObj({
                    deleteFunction: (id) => deleteAdmin({ userId: id }),
                    editFunction: (id) => editAdmin(id),
                    changeStatus: (id, status) => changeStatus({ userId: id, status }),
                })}
                data={admins}
            />

            <Modal
                title={detailsId ? "Modifica admin" : "Aggiungi admin"}
                isModalOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setDetailsId(null);
                }}>
                <AdminModalForm
                    closeModal={() => {
                        setIsModalOpen(false);
                        refetch();
                        setDetailsId(null);
                    }}
                />
            </Modal>
        </UiContainer>
    );
};

export default UsersTable;
