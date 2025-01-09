/**
 * This file contains the types for the GlobalStore (zustand store).
 * GlobalStore is a store that contains global state for the application.
 *
 * @interface GlobalStoreState - The state of the GlobalStore
 * @interface GlobalStoreActions - The actions that can be performed on the GlobalStore
 * @type GlobalStore - The combined state and actions of the GlobalStore
 */

export interface GlobalStoreState {
    searchTerm: string;
    filterTags: string[];
}

export interface GlobalStoreActions {
    setSearchTerm: (term: string) => void;
    setFilterTags: (tags: string[]) => void;
}

export type GlobalStore = GlobalStoreState & GlobalStoreActions;
