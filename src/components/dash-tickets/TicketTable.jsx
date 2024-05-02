import React from "react";

import { Table, TableHeader, UiContainer } from "../../components/common";
import { useFilter, useTable } from "../../store";

import { TicketColumnObj } from "../../templates/column/TicketColumnObj";

const TicketTable = () => {
    const { filterData } = useFilter();
    const { pagenation, setDetailsId, setPagenation } = useTable();

    const deleteTicket = (id) => {};
    const editClient = (id) => {};

    return (
        <UiContainer>
            <TableHeader
                ListName={"Tickets"}
                dataLength={pagenation?.total}
            />

            <Table
                loadingTable={false}
                onChange={setPagenation}
                tableParams={pagenation}
                isPagination={true}
                columns={TicketColumnObj({
                    deleteFunction: (id) => deleteTicket(id),
                    editFunction: (id) => editClient(id),
                })}
                data={[]}
            />
        </UiContainer>
    );
};

export default TicketTable;
