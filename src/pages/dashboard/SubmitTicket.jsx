import TicketForm from "../../components/Tickets/TicketForm";

const SubmitTicket = () => (
    <div className="flex justify-center pr-4">
        <TicketForm authenticated />
    </div>
);

export default SubmitTicket;
