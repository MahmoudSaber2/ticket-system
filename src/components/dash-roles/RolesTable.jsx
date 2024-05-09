import React, { useState } from "react";

import { useFilter, useTable } from "../../store";
import { useRoles } from "../../hooks/dashboard/roles/useRolesHooks";
import { Modal, Table, TableHeader, UiContainer } from "../common";
import { RoleColumnObj } from "../../templates/column/RolesColumnObj";
import RoleModalForm from "./RoleModalForm";
import { GetPermission } from "../../utils/Functions";

const RolesTable = () => {
    const { filterData } = useFilter();
    const { pagenation, detailsId, setDetailsId, setPagenation } = useTable();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: admins, isLoading, refetch } = useRoles({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);

    const editAdmin = (id) => {
        setDetailsId(id);
        setIsModalOpen(true);
    };

    return (
        <UiContainer>
            <TableHeader
                ListName={"Ruoli"}
                dataLength={pagenation?.total}
                buttonName={GetPermission("create_role") ? "Aggiungi Ruolo" : false}
                onClick={() => setIsModalOpen(true)}
            />

            <Table
                loadingTable={isLoading}
                onChange={setPagenation}
                tableParams={pagenation}
                isPagination={true}
                columns={RoleColumnObj({
                    editFunction: (id) => editAdmin(id),
                })}
                data={admins}
            />

            <Modal
                title={detailsId ? "Modifica Ruolo" : "Aggiungi Ruolo"}
                isModalOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setDetailsId(null);
                }}>
                <RoleModalForm
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

export default RolesTable;
