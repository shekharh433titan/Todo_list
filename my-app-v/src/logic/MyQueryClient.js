import { QueryClient } from "@tanstack/react-query";


// The QueryClient is the central object in the React Query ecosystem. It acts as a global manager that handles:
// Fetching Data: It knows how to fetch data from your API or backend.
// Caching Data: It automatically caches responses, reducing redundant network requests.
// Stale Data Management: It determines when data is "stale" and needs to be refetched.
// Automatic Refetching: It refetches data in the background when necessary (e.g., on window focus or network reconnect).
// State Sharing: The QueryClient allows you to share cached server state across different components of your app.

var queryClient = null;

function MyQueryClient() {
    if (queryClient === null) {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    // refetchOnWindowFocus: false: This disables automatic refetching of queries 
                    // when the browser window regains focus. 
                    // (The default behavior in React Query is true.)
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