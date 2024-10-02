"use client";

import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import { SearchInput } from "../inputs/SearchInput";
import { ThemeToggleButton } from "../buttons/ThemeToggleButton";
import { Plus, SidebarIcon } from "lucide-react";
import { ProfileShowDropdown } from "../dropdowns/ProfileShowDropdown";
import { TagFilterDialog } from "../dialogs/TagFilterDialog";
import { ProfileSettingsDialog } from "../dialogs/ProfileSettingsDialog";
import { useFetchUserProfile } from "@/hooks/user/useFetchUserProfile";
import SnippetCreateSheet from "../sheets/SnippetCreateSheet";
import { useShallow } from "zustand/react/shallow";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";

export function Navbar() {
    const { data: userProfile } = useFetchUserProfile();
    const { toggleSidebar, setSearchTerm, searchTerm } = useGlobalStore(
        useShallow((store) => ({
            toggleSidebar: store.toggleSidebar,
            setSearchTerm: store.setSearchTerm,
            searchTerm: store.searchTerm,
        })),
    );

    const [isProfileSettingsDialogOpen, setIsProfileSettingsDialogOpen] =
        React.useState<boolean>(false);

    const handleSnippetSearchTermChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
        500,
    );

    return (
        <React.Fragment>
            <nav className="flex h-14 w-full items-center justify-between gap-2 border-b bg-background p-2 flex-shrink-0">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleSidebar}
                    className="size-8 flex-shrink-0 z-50"
                >
                    <SidebarIcon strokeWidth={1.5} className="size-5" />
                </Button>

                <div className="w-full flex items-center justify-center gap-2">
                    <div className="max-w-lg w-full">
                        <SearchInput
                            type="text"
                            placeholder="Search snippet"
                            className="h-8 w-full bg-secondary pl-8 text-xs"
                            iconClassName="size-4"
                            defaultValue={searchTerm}
                            onChange={handleSnippetSearchTermChange}
                        />
                    </div>
                    <TagFilterDialog />
                    <SnippetCreateSheet />
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                    <ThemeToggleButton className="size-8 flex-shrink-0" />
                    <ProfileShowDropdown
                        setIsProfileSettingsDialogOpen={setIsProfileSettingsDialogOpen}
                        profile={userProfile}
                    />
                </div>
            </nav>
            <ProfileSettingsDialog
                isOpen={isProfileSettingsDialogOpen}
                onOpenChange={setIsProfileSettingsDialogOpen}
                profile={userProfile}
            />
        </React.Fragment>
    );
}
