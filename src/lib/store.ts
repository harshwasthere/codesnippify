import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { GlobalStore, GlobalStoreState } from "@/types/store.types";

const initialGlobalStore: GlobalStoreState = {
    searchTerm: "",
    filterTags: [],
};

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
