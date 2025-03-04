export interface GlobalStoreState {
    searchTerm: string;
    filterTags: string[];
}

export interface GlobalStoreActions {
    setSearchTerm: (term: string) => void;
    setFilterTags: (tags: string[]) => void;
}

export type GlobalStore = GlobalStoreState & GlobalStoreActions;
