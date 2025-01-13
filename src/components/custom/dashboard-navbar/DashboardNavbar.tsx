"use client";

import { DashboardSidebarTrigger } from "@/components/custom/dashboard-sidebar/DashboardSidebarTrigger";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Separator } from "@/components/ui/separator";
import { useFetchUserProfile } from "@/hooks/user/useFetchUserProfile";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { ProfileShowDropdown } from "../dropdowns/ProfileShowDropdown";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { TagFilterDialog } from "../dialogs/TagFilterDialog";
import SnippetCreateSheet from "../sheets/SnippetCreateSheet";

export function DashboardNavbar() {
    const { data: userProfile } = useFetchUserProfile();
    const { setSearchTerm } = useGlobalStore(
        useShallow((store) => ({
            setSearchTerm: store.setSearchTerm,
        })),
    );

    const handleSnippetSearchTermChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
        500,
    );

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="w-full flex items-center gap-2 px-4">
                <DashboardSidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="w-full flex items-center justify-center gap-2">
                    <TagFilterDialog />
                    <div className="max-w-lg w-full">
                        <SearchInput
                            type="text"
                            placeholder="Search snippet"
                            className="h-8 text-xs bg-secondary"
                            iconClassName="size-4"
                            onChange={handleSnippetSearchTermChange}
                        />
                    </div>
                    <SnippetCreateSheet />
                </div>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <ProfileShowDropdown profile={userProfile} />
            </div>
        </header>
    );
}
