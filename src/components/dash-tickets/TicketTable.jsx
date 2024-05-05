import React from "react";

import { Table, TableHeader, UiContainer } from "../../components/common";
import { useFilter, useTable } from "../../store";

import { TicketColumnObj } from "../../templates/column/TicketColumnObj";
import { useTickets } from "../../hooks/dashboard/tickets/useTicketsHooks";

const TicketTable = () => {
    const { filterData } = useFilter();
    const { pagenation, setDetailsId, setPagenation } = useTable();

    const { data: tickets, isLoading } = useTickets({ ...pagenation, filter: filterData }, setPagenation, setDetailsId);

    const deleteTicket = (id) => {};
    const editClient = (id) => {};

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
                    editFunction: (id) => editClient(id),
                })}
                data={tickets}
            />
        </UiContainer>
    );
};

export default TicketTable;
