"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__:
        import( "@tanstack/query-core" ).QueryClient;
    }
}

export const TanstackProvider = ( { children }: { children: ReactNode } ) => {
    const [ queryClient ] = useState( () => new QueryClient() );

    useEffect( () => {
        window.__TANSTACK_QUERY_CLIENT__ = queryClient;
    }, [ queryClient ] );

    return (
        <QueryClientProvider client={ queryClient }>{children}</QueryClientProvider>
    );
};