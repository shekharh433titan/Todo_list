import { QueryClient } from "@tanstack/react-query";


var queryClient = null;

function MyQueryClient() {
    if (queryClient === null) {
        queryClient = new QueryClient({
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
    }
    return queryClient;
}

export default MyQueryClient;