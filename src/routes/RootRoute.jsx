import { Tickets, NewTicket, Review } from "../pages";
import RootLayout from "../templates/RootLayout";
import NotFound from "../components/NotFound";

export const RootRoute = {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
        {
            index: true,
            element: <Tickets />,
        },
        {
            path: "new-ticket",
            element: <NewTicket />,
        },
        {
            path: "review",
            element: <Review />,
        },
    ],
};
