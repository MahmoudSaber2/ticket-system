import React from "react";

import { Modal, Table, TableHeader, UiContainer } from "../../components/common";
import { useFilter, useTable } from "../../store";

import { TicketColumnObj } from "../../templates/column/TicketColumnObj";
import { useTickets } from "../../hooks/dashboard/tickets/useTicketsHooks";

const TicketTable = () => {
    const { filterData } = useFilter();
    const { pagenation, setDetailsId, setPagenation } = useTable();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [description, setDescription] = React.useState("");

    const { data: tickets, isLoading } = useTickets({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);

    const deleteTicket = (id) => {};
    const viewDesc = (desc) => {
        setIsModalOpen(true);
        setDescription(desc);
    };

    return (
        <UiContainer>
            <TableHeader
                ListName={"Tickets"}
                dataLength={pagenation?.total}
            />

            <Table
                loadingTable={isLoading}
                onChange={setPagenation}
                tableParams={pagenation}
                isPagination={true}
                columns={TicketColumnObj({
                    deleteFunction: (id) => deleteTicket(id),
                    viewDesc: (desc) => viewDesc(desc),
                })}
                data={tickets}
            />

            <Modal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={"Descrizione"}>
                <pre
                    className="whitespace-pre-wrap text-xl font-bold"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </Modal>
        </UiContainer>
    );
};

export default TicketTable;
