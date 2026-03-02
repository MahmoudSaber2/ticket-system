import React from "react";

import { Modal, Table, TableHeader, UiContainer } from "../../components/common";
import { useFilter, useTable } from "../../store";

import { TicketColumnObj } from "../../templates/column/TicketColumnObj";
import { useDeleteTicket, useTickets, useAllTickets } from "../../hooks/dashboard/tickets/useTicketsHooks";
import TicketModalForm from "./TicketModalForm";

const TicketTable = () => {
    const { filterData } = useFilter();
    const { pagenation, setDetailsId, setPagenation } = useTable();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const { data: tickets, isLoading, refetch } = useTickets({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);
    const { mutate: deleteTicket } = useDeleteTicket(refetch);
    
    // New hook for fetching all tickets for export
    const { refetch: fetchAllTickets } = useAllTickets({ filter: filterData });

    const viewTicket = (id) => {
        setIsModalOpen(true);
        setDetailsId(id);
    };

    const columns = TicketColumnObj({
        deleteFunction: (id) => deleteTicket({ ticketId: id }),
        viewFunction: (id) => viewTicket(id),
    });

    // Function to fetch all tickets and return data for export
    const handleFetchAllForExport = async () => {
        const result = await fetchAllTickets();
        // useQuery returns { data, error, isLoading, etc. } from refetch
        return result?.data || [];
    };

    return (
        <UiContainer>
            <TableHeader
                ListName={"Tickets"}
                dataLength={pagenation?.total}
                data={tickets}
                columns={columns}
                fetchAll={handleFetchAllForExport}
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
                width={600}
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
