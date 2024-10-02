"use client";

import { SnippetCard } from "@/components/custom/card/SnippetCard";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import ClassicLoader from "@/components/ui/classic-loader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fuseOptions } from "@/constants/global.constants";
import { useFetchSharedSnippets } from "@/hooks/snippet/useFetchSharedSnippets";
import { cn } from "@/lib/utils";
import { FilteredSnippets } from "@/types/global.types";
import Fuse from "fuse.js";
import { Snail } from "lucide-react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface FoldersPageProps {
    params: {
        shareToken: string;
    };
}

export default function FoldersPage({ params }: FoldersPageProps) {
    const { shareToken } = params;
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const handleSnippetSearchTermChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
        500,
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

    return fetchedSnippetsLoading && !fetchedSnippetsSuccess ? (
        <div className="w-full min-h-screen h-full flex items-center justify-center ">
            <ClassicLoader className="size-6 " />
        </div>
    ) : snippets?.length === 0 ? (
        <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-3 text-muted-foreground/20">
            <Snail strokeWidth={1.5} className="size-20" />
            <span className="font-bricolage text-2xl ">No snippets found</span>
        </div>
    ) : (
        <div className="w-full min-h-screen h-full">
            <nav className="flex h-14 w-full items-center justify-center  bg-background p-2 flex-shrink-0">
                <div className="w-full max-w-lg">
                    <SearchInput
                        type="text"
                        placeholder="Search snippet"
                        className="h-8 w-full bg-secondary pl-8 text-xs"
                        iconClassName="size-4"
                        defaultValue={searchTerm}
                        onChange={handleSnippetSearchTermChange}
                    />
                </div>
            </nav>
            <ScrollArea className="w-full h-[calc(100vh-3.5rem)] p-3">
                <ScrollBar orientation="vertical" />
                <div
                    className={cn(
                        "h-full w-fit rounded-md  space-y-3 gap-3  mx-auto",
                        snippets?.length < 3
                            ? "flex flex-wrap justify-center"
                            : "space-y-3 columns-1 dashboard-sheet-break-1:columns-2 dashboard-sheet-break-2:columns-3 dashboard-sheet-break-3:columns-4",
                    )}
                >
                    {snippets?.map((snippet) => (
                        <SnippetCard key={snippet.snippet_id} snippet={snippet} shared={true} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
