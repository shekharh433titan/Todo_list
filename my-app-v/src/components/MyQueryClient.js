import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const myQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});

export default myQueryClient;