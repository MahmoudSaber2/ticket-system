import React from "react";
import { Image } from "antd";

import ticketImage from "../../assets/ticketing-system.png";
import TicketForm from "./TicketForm";

const TicketLayout = () => {
    return (
        <div className="flex min-h-screen justify-between gap-4">
            <div className="flex flex-1 items-center justify-center bg-white">
                <TicketForm />
            </div>
            <div className="hidden flex-1 items-center bg-white lg:flex">
                <Image
                    src={ticketImage}
                    alt="Ticketing System"
                    preview={false}
                    className="size-full object-cover"
                />
            </div>
        </div>
    );
};

export default TicketLayout;
