"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type GlobalStore } from "@/types/store.types";
import { createGlobalStore } from "@/lib/store";

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(undefined);

export const GlobalStoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<GlobalStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createGlobalStore();
    }

    return (
        <GlobalStoreContext.Provider value={storeRef.current}>
            {children}
        </GlobalStoreContext.Provider>
    );
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
    const globalStoreContext = useContext(GlobalStoreContext);

    if (!globalStoreContext) {
        throw new Error(`useGlobalStore must be used within GlobalStoreProvider`);
    }

    return useStore(globalStoreContext, selector);
};
