import React from "react";

import { Modal, Table, TableHeader, UiContainer } from "../../components/common";
import { useFilter, useTable } from "../../store";

import { TicketColumnObj } from "../../templates/column/TicketColumnObj";
import { useDeleteTicket, useTickets } from "../../hooks/dashboard/tickets/useTicketsHooks";
import { useTicketExport } from "../../hooks/dashboard/useReportingHooks";
import TicketModalForm from "./TicketModalForm";

const TicketTable = () => {
    const { filterData } = useFilter();
    const { pagenation, setDetailsId, setPagenation } = useTable();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const { data: tickets, isLoading, refetch } = useTickets({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);
    const { mutate: deleteTicket } = useDeleteTicket(refetch);
    const ticketExport = useTicketExport();

    const viewTicket = (id) => {
        setIsModalOpen(true);
        setDetailsId(id);
    };

    const columns = TicketColumnObj({
        deleteFunction: (id) => deleteTicket({ ticketId: id }),
        viewFunction: (id) => viewTicket(id),
    });

    return (
        <UiContainer>
            <TableHeader
                ListName={"Tickets"}
                dataLength={pagenation?.total}
                exportAction={() => ticketExport.mutate(filterData)}
                exporting={ticketExport.isPending}
            />

            <Table
                loadingTable={isLoading}
                onChange={setPagenation}
                tableParams={pagenation}
                isPagination={true}
                columns={columns}
                data={tickets}
            />

            <Modal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width={900}
                title={"Ticket details"}>
                <TicketModalForm
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

export default TicketTable;
