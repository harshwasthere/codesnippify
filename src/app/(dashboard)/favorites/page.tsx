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
import BounceLoader from "@/components/ui/bounce-loader";
import { HeartCrackIcon } from "lucide-react";

export default function AllFavoritesPage() {
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

    const [snippets, setSnippets] = React.useState<FilteredSnippets>(fetchedSnippets || []);

    React.useEffect(() => {
        if (fetchedSnippetsSuccess) {
            const filteredSnippets = fetchedSnippets.filter((snippet) => snippet.favorite === true);
            if (!searchTerm) {
                setSnippets(filteredSnippets);
                return;
            }
            const fuse = new Fuse(filteredSnippets, fuseOptions);
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
            <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4 text-foreground/50 gap-4">
                <HeartCrackIcon className="size-12" />
                <span className="w-56 text-center text-sm">
                    There are no favorite snippets, add some to your favorites.
                </span>
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
