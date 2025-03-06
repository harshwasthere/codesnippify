"use client";

import { fuseOptions } from "@/constants/constants";
import { useFetchSnippets } from "@/hooks/snippet/useFetchSnippets";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { FilteredSnippets } from "@/types/common.types";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import Fuse from "fuse.js";
import Masonry from "react-layout-masonry";
import { SnippetCard } from "@/components/custom/cards/SnippetCard";
import { SparklesIcon } from "lucide-react";
import BounceLoader from "@/components/ui/bounce-loader";

export default function AllSnippetsPage() {
    const { filterTags, searchTerm } = useGlobalStore(
        useShallow((store) => ({
            filterTags: store.filterTags,
            searchTerm: store.searchTerm,
        })),
    );

    const {
        data: fetchedSnippets,
        isLoading: fetchedSnippetsLoading,
        isSuccess: fetchedSnippetsSuccess,
    } = useFetchSnippets({
        filterTags: filterTags,
        showTrash: false,
    });

    console.log(fetchedSnippets);

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
            <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4">
                <BounceLoader />
            </div>
        );
    }

    if (snippets.length === 0) {
        return (
            <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4 text-muted-foreground/50">
                <SparklesIcon className="size-8" />
                <span className="text-lg font-medium">No snippets found</span>
                <span className="text-sm">Create a new snippet to get started </span>
            </div>
        );
    }

    return (
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
                        />
                    );
                })}
            </Masonry>
        </div>
    );
}
