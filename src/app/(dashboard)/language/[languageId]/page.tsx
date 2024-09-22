"use client";

import { SnippetCard } from "@/components/custom/card/SnippetCard";
import ClassicLoader from "@/components/ui/classic-loader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchSnippets } from "@/hooks/snippet/useFetchSnippets";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { FilteredSnippets, Snippet } from "@/types/global.types";
import { Snail } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/react/shallow";

interface LanguagePageProps {
    params: {
        languageId: string;
    };
}

export default function LanguagePage({ params }: LanguagePageProps) {
    const { languageId } = params;
    const { filterTags, hasHydrated, isSidebarOpen, sidebarType } = useGlobalStore(
        useShallow((store) => ({
            filterTags: store.filterTags,
            hasHydrated: store._hasHydrated,
            isSidebarOpen: store.isSidebarOpen,
            sidebarType: store.sidebarType,
        })),
    );

    const {
        data: fetchedSnippets,
        isLoading: fetchedSnippetsLoading,
        isSuccess: fetchedSnippetsSuccess,
    } = useFetchSnippets({
        filterTags: filterTags,
        showTrash: false,
        hasHydrated: hasHydrated,
    });

    const [snippets, setSnippets] = React.useState<FilteredSnippets>([]);

    React.useEffect(() => {
        if (fetchedSnippetsSuccess) {
            const filteredSnippets = fetchedSnippets.filter(
                (snippet) => snippet.language === languageId,
            );
            setSnippets(filteredSnippets);
        }
    }, [fetchedSnippets, fetchedSnippetsSuccess, languageId]);

    return (fetchedSnippetsLoading && !fetchedSnippetsSuccess) || !hasHydrated ? (
        <div className="w-full h-full flex items-center justify-center ">
            <ClassicLoader className="size-6 " />
        </div>
    ) : snippets?.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/20">
            <Snail strokeWidth={1.5} className="size-20" />
            <span className="font-bricolage text-2xl ">No snippets found</span>
        </div>
    ) : (
        <div className="w-full h-full">
            <ScrollArea className="w-full h-[calc(100vh-3.5rem)] p-3">
                <ScrollBar orientation="vertical" />
                <div
                    className={cn(
                        "h-full w-fit rounded-md columns-1 space-y-3 gap-3  mx-auto",
                        isSidebarOpen && sidebarType === "side"
                            ? "dashboard-sidebar-break-1:columns-2 dashboard-sidebar-break-2:columns-3 dashboard-sidebar-break-3:columns-4"
                            : "dashboard-sheet-break-1:columns-2 dashboard-sheet-break-2:columns-3 dashboard-sheet-break-3:columns-4",
                    )}
                >
                    {snippets?.map((snippet) => (
                        <SnippetCard key={snippet.snippet_id} snippet={snippet} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
