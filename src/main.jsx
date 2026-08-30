import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();
const showReactQueryDevtools = import.meta.env.DEV && import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === "true";

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<App />
		{showReactQueryDevtools && <ReactQueryDevtools />}
	</QueryClientProvider>
);
