import { Tickets, Review } from "../pages";
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
            path: "review",
            element: <Review />,
        },
    ],
};
