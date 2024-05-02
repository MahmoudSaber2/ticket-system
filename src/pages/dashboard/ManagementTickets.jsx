import TicketFilter from "../../components/dash-tickets/TicketFilter";
import TicketTable from "../../components/dash-tickets/TicketTable";

const ManagementTickets = () => {
    return (
        <div className="flex flex-col gap-10 pr-10">
            <TicketFilter />
            <TicketTable />
        </div>
    );
};

export default ManagementTickets;
