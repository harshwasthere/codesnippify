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
import { CircleSlash2Icon } from "lucide-react";

interface FolderPageProps {
    params: {
        folderId: string;
    };
}

export default function FolderPage({ params }: FolderPageProps) {
    const { folderId } = params;

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
        folderIdToSearch: folderId,
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
            <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4">
                <BounceLoader />
            </div>
        );
    }

    if (snippets.length === 0) {
        return (
            <div className="h-full w-full flex flex-col flex-1 items-center justify-center p-4 text-foreground/50 gap-4">
                <CircleSlash2Icon className="size-12" />
                <span className="w-56 text-center text-sm">
                    This folder is empty, add some snippets to get started.
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
