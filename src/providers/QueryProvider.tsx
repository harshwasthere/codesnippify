"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 1000 * 60, // 1 minute
                gcTime: 1000 * 60 * 5, // 5 minutes
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
