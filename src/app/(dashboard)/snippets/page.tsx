"use client";

import { SnippetCard } from "@/components/custom/card/SnippetCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchSnippets } from "@/hooks/snippet/useFetchSnippets";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { Loader, Snail } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export default function AllSnippetsPage() {
    const { filterTags } = useGlobalStore(
        useShallow((store) => ({
            filterTags: store.filterTags,
        })),
    );

    const {
        data: fetchedSnippets,
        isLoading: fetchedSnippetsLoading,
        isSuccess: fetchedSnippetsSuccess,
    } = useFetchSnippets({ filter_tags: filterTags, show_trash: false });

    console.log(fetchedSnippets);

    return fetchedSnippetsLoading && !fetchedSnippetsSuccess ? (
        <div className="w-full h-full flex items-center justify-center ">
            <Loader strokeWidth={1.5} className="size-7 animate-spin text-muted-foreground/50" />
        </div>
    ) : fetchedSnippets?.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/20">
            <Snail strokeWidth={1.5} className="size-24" />
            <span className="font-bricolage text-2xl ">No snippets found</span>
        </div>
    ) : (
        <div className="w-full h-full">
            <ScrollArea className="w-full h-[calc(100vh-3.5rem)] p-3">
                <ScrollBar orientation="vertical" />
                <div
                    className={`h-full w-fit rounded-md space-y-3 columns-1 dashboard-break-1:columns-2 dashboard-break-2:columns-3 gap-3 mx-auto`}
                >
                    {fetchedSnippets?.map((snippet) => (
                        <SnippetCard key={snippet.id} snippet={snippet} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
