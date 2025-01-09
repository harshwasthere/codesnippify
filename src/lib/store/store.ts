import { createStore } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { GlobalStore, GlobalStoreState } from "@/types/store.types";

// Initial state for the UI store
const initialGlobalStore: GlobalStoreState = {
    searchTerm: "",
    filterTags: [],
};

// Creates and configures the store
export const createGlobalStore = (
    initialStore: GlobalStoreState = initialGlobalStore,
) => {
    return createStore<GlobalStore>()(
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
            })),
        ),
    );
};
