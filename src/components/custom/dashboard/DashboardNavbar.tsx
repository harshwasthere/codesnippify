"use client";

import { DashboardSidebarTrigger } from "@/components/custom/dashboard/DashboardSidebarTrigger";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Separator } from "@/components/ui/separator";
import { useFetchUserProfile } from "@/hooks/user/useFetchUserProfile";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { ProfileShowDropdown } from "@/components/custom/dropdowns/ProfileShowDropdown";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { ListFilterIcon, PlusIcon } from "lucide-react";
// import SnippetCreateSheet from "@/components/custom/sheets/SnippetCreateSheet";
// import { TagFilterPopover } from "@/components/custom/popover/TagFilterPopover";

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
                    <Button
                        variant="secondary"
                        className="h-8 flex-shrink-0 rounded-full gap-1 px-3"
                    >
                        <ListFilterIcon className="size-4" />
                        <span className="max-2xs:hidden">Tags</span>
                        {/* {selectedTags.length > 0 && (
                            <span className="text-primary bg-primary/20 group-hover:bg-primary/30 flex-shrink-0 p-1 px-1.5 h-5 min-w-5 rounded-full flex items-center justify-center">
                                {selectedTags.length}
                            </span>
                        )} */}
                    </Button>
                    <div className="max-w-lg w-full">
                        <SearchInput
                            type="text"
                            placeholder="Search snippet"
                            className="h-8 text-xs bg-secondary"
                            iconClassName="size-4"
                            onChange={handleSnippetSearchTermChange}
                        />
                    </div>
                    <Button size="sm" className="h-8 flex-shrink-0 gap-1 max-2xs:px-2">
                        <PlusIcon className="size-4" />
                        <span className="max-2xs:hidden">Snippet</span>
                    </Button>
                </div>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <ProfileShowDropdown profile={userProfile} />
            </div>
        </header>
    );
}
