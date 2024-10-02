/**
 * This file contains the types for the GlobalStore (zustand store).
 * GlobalStore is a store that contains global state for the application.
 *
 * @interface GlobalStoreState - The state of the GlobalStore
 * @interface GlobalStoreActions - The actions that can be performed on the GlobalStore
 * @type GlobalStore - The combined state and actions of the GlobalStore
 */

export interface GlobalStoreState {
    _hasHydrated: boolean;

    isSidebarOpen: boolean;
    sidebarType: "sheet" | "side";

    searchTerm: string;
    filterTags: string[];
}

export interface GlobalStoreActions {
    setHasHydrated: (state: boolean) => void;

    toggleSidebar: () => void;
    setSidebarType: (type: "sheet" | "side") => void;

    setSearchTerm: (term: string) => void;
    setFilterTags: (tags: string[]) => void;
}

export type GlobalStore = GlobalStoreState & GlobalStoreActions;
