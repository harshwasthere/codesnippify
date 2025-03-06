"use client";

import React from "react";
import Fuse from "fuse.js";
import Masonry from "react-layout-masonry";
import { SnippetCard } from "@/components/custom/cards/SnippetCard";
import BounceLoader from "@/components/ui/bounce-loader";
import { CircleSlash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { useShallow } from "zustand/react/shallow";
import { useDebouncedCallback } from "use-debounce";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { ThemeToggleDropdown } from "@/components/custom/buttons/ThemeToggleButton";
import { fuseOptions } from "@/constants/constants";
import { FilteredSnippets } from "@/types/common.types";
import { useFetchSharedSnippets } from "@/hooks/snippet/useFetchSharedSnippets";

interface ShareSnippetsPageProps {
    params: {
        shareToken: string;
    };
}

export default function ShareSnippetsPage({ params }: ShareSnippetsPageProps) {
    const { shareToken } = params;

    const { searchTerm } = useGlobalStore(
        useShallow((store) => ({
            searchTerm: store.searchTerm,
        })),
    );

    const {
        data: fetchedSnippets,
        isLoading: fetchedSnippetsLoading,
        isSuccess: fetchedSnippetsSuccess,
    } = useFetchSharedSnippets({
        showTrash: false,
        shareToken: shareToken,
    });

    const [snippets, setSnippets] = React.useState<FilteredSnippets>(fetchedSnippets || []);

    React.useEffect(() => {
        if (fetchedSnippetsSuccess) {
            if (!searchTerm) {
                setSnippets(fetchedSnippets);
                return;
            }
            const fuse = new Fuse(fetchedSnippets, fuseOptions);
            const result = fuse.search(searchTerm);
            setSnippets(result.map((r) => r.item));
        }
    }, [searchTerm, fetchedSnippetsSuccess, fetchedSnippets]);

    if (fetchedSnippetsLoading && !fetchedSnippetsSuccess) {
        return (
            <ShareSnippetsPageWrapper>
                <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4">
                    <BounceLoader />
                </div>
            </ShareSnippetsPageWrapper>
        );
    }

    if (snippets.length === 0) {
        return (
            <ShareSnippetsPageWrapper>
                <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4 text-foreground/50 gap-4">
                    <CircleSlash2Icon className="size-12" />
                    <span className="w-56 text-center text-sm">
                        This folder is empty, add some snippets to get started.
                    </span>
                </div>
            </ShareSnippetsPageWrapper>
        );
    }

    return (
        <ShareSnippetsPageWrapper>
            <div className="w-full h-full flex flex-col 3xl:items-center gap-6 px-2 md:px-4 py-4 mx-auto">
                <Masonry
                    className="relative"
                    columns={{ 640: 1, 768: 2, 1024: 3 }}
                    gap={16}
                    columnProps={{
                        className: "min-w-[calc(33.3333%-16px)] w-full",
                    }}
                >
                    {snippets.map((snippet) => {
                        return (
                            <SnippetCard
                                key={snippet.snippet_id}
                                snippet={snippet}
                                className="bg-foreground/5 border-none"
                                shared={true}
                            />
                        );
                    })}
                </Masonry>
            </div>
        </ShareSnippetsPageWrapper>
    );
}

function ShareSnippetsPageWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex min-h-svh w-full bg-sidebar">
            <div
                className="relative flex h-[calc(100svh-theme(spacing.4))] min-h-svh flex-1 flex-col bg-background 
            md:min-h-[calc(100svh-theme(spacing.4))] md:m-2  md:rounded-xl md:shadow overflow-hidden"
            >
                <ShareSnippetsPageNavbar />
                <div className="w-full h-full flex flex-1 flex-col overflow-auto">{children}</div>
            </div>
        </main>
    );
}

function ShareSnippetsPageNavbar() {
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
                <div className="w-full flex items-center justify-center gap-2">
                    <div className="max-w-lg w-full">
                        <SearchInput
                            type="text"
                            placeholder="Search snippet"
                            className="h-8 text-xs bg-secondary"
                            iconClassName="size-4"
                            onChange={handleSnippetSearchTermChange}
                        />
                    </div>
                </div>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <ThemeToggleDropdown />
            </div>
        </header>
    );
}
