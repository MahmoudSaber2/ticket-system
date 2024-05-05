import React, { useState } from "react";

import { useFilter, useTable } from "../../store";
import { useCustomes, useDeleteCustomer } from "../../hooks/dashboard/customers/useCustomersHooks";
import { Modal, Table, TableHeader, UiContainer } from "../common";
import { CustomerColumnObj } from "../../templates/column/CustomerColumnObj";
import CustomerModalForm from "./CustomerModalForm";

const UsersTable = () => {
    const { filterData } = useFilter();
    const { pagenation, detailsId, setDetailsId, setPagenation } = useTable();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: users, isLoading, refetch } = useCustomes({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);

    const { mutate: deleteUser } = useDeleteCustomer(refetch);
    const editUser = (id) => {
        setDetailsId(id);
        setIsModalOpen(true);
    };

    return (
        <UiContainer>
            <TableHeader
                ListName={"Utenti"}
                dataLength={pagenation?.total}
                buttonName={"Aggiungi utente"}
                onClick={() => setIsModalOpen(true)}
            />

            <Table
                loadingTable={isLoading}
                onChange={setPagenation}
                tableParams={pagenation}
                isPagination={true}
                columns={CustomerColumnObj({
                    deleteFunction: (id) => deleteUser({ customerId: id }),
                    editFunction: (id) => editUser(id),
                })}
                data={users}
            />

            <Modal
                title={detailsId ? "Modifica utente" : "Aggiungi utente"}
                isModalOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setDetailsId(null);
                }}>
                <CustomerModalForm
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
