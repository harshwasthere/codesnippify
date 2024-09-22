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
