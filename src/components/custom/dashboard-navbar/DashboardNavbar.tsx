"use client";

import { DashboardSidebarTrigger } from "@/components/custom/dashboard-sidebar/DashboardSidebarTrigger";
import { ProfileSettingsDialog } from "@/components/custom/dialogs/ProfileSettingsDialog";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Separator } from "@/components/ui/separator";
import { useFetchUserProfile } from "@/hooks/user/useFetchUserProfile";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { ProfileShowDropdown } from "../dropdowns/ProfileShowDropdown";

export function DashboardNavbar() {
    const { data: userProfile } = useFetchUserProfile();
    // const { toggleSidebar, setSearchTerm, searchTerm } = useGlobalStore(
    //     useShallow((store) => ({
    //         toggleSidebar: store.toggleSidebar,
    //         setSearchTerm: store.setSearchTerm,
    //         searchTerm: store.searchTerm,
    //     })),
    // );

    // const handleSnippetSearchTermChange = useDebouncedCallback(
    //     (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    //     500,
    // );

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="w-full flex items-center gap-2 px-4">
                <DashboardSidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="w-full flex items-center justify-center gap-2">
                    <div className="max-w-lg w-full">
                        <SearchInput
                            type="text"
                            placeholder="Search snippet"
                            className="h-8 text-xs"
                            iconClassName="size-4"
                        />
                    </div>
                </div>
                <ProfileShowDropdown profile={userProfile} />
            </div>
        </header>
    );
}
