import { createStore } from "zustand/vanilla";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { GlobalStore, GlobalStoreState } from "@/types/store.types";

/**
 * Initial state for the UI store
 */
const initialGlobalStore: GlobalStoreState = {
    isSidebarOpen: true,
    sidebarType: "side",

    searchTerm: "",
    filterTags: [],
};

/**
 * Creates and configures the store
 */
export const createGlobalStore = (initialStore: GlobalStoreState = initialGlobalStore) => {
    return createStore<GlobalStore>()(
        persist(
            devtools(
                immer((set) => ({
                    ...initialStore,
                    setSearchTerm: (term: string) =>
                        set((state) => {
                            state.searchTerm = term;
                        }),
                    setFilterTags: (tags: string[]) =>
                        set((state) => {
                            state.filterTags = tags;
                        }),

                    toggleSidebar: () =>
                        set((state) => {
                            state.isSidebarOpen = !state.isSidebarOpen;
                        }),

                    setSidebarType: (type: "sheet" | "side") =>
                        set((state) => {
                            state.sidebarType = type;
                        }),
                })),
            ),
            { name: "global-store" }, // Persist configuration
        ),
    );
};
