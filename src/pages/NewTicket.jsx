import NewTicketForm from "../components/Tickets/NewTicketForm";
import TicketLayout from "../components/Tickets/TicketLayout";

const NewTicket = () => {
    return <TicketLayout form={<NewTicketForm />} />;
};

export default NewTicket;
