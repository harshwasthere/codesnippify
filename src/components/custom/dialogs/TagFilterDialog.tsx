"use client";

import React, { useState } from "react";
import { Frown, Loader, X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { useFetchTags } from "@/hooks/snippet/useFetchTags";
import { useQueryClient } from "@tanstack/react-query";

export function TagFilterDialog() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const { setFilterTags, filterTags } = useGlobalStore(
        useShallow((store) => ({
            setFilterTags: store.setFilterTags,
            filterTags: store.filterTags,
        })),
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(filterTags);

    const {
        data: fetchedTags,
        isLoading: fetchedTagsLoading,
        isSuccess: fetchedTagsSuccess,
    } = useFetchTags();

    React.useEffect(() => {
        if (fetchedTagsSuccess) {
            setSelectedTags(filterTags);
        }
    }, [fetchedTags, fetchedTagsSuccess, filterTags]);

    const handleTagSelection = (tagName: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName],
        );
    };

    const handleApplyFilter = async () => {
        setFilterTags(selectedTags);
        setIsOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-shrink-0 text-xs group flex items-center gap-2 p-2"
                >
                    <span>Tags</span>
                    <span className="text-primary text-xs bg-primary/20 group-hover:bg-primary/30 p-1 px-2 h-5 min-w-5 rounded-full flex items-center justify-center flex-shrink-0">
                        {selectedTags.length}
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-6 rounded-xl flex flex-col gap-10">
                <AlertDialogHeader className="space-y-0 flex-row items-center justify-between gap-2">
                    <div className="flex flex-col items-start justify-center">
                        <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                            Tags Filter
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-muted-foreground">
                            Select tags to filter snippets
                        </AlertDialogDescription>
                    </div>
                    <Button
                        onClick={() => {
                            setSelectedTags([]);
                            setFilterTags([]);
                        }}
                        variant="destructive"
                        size="sm"
                        className="text-xs h-8 flex items-center text-destructive bg-destructive/20 hover:bg-destructive/30"
                    >
                        Clear
                    </Button>
                </AlertDialogHeader>
                <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                    {fetchedTagsLoading && !fetchedTagsSuccess ? (
                        <div className="w-full h-full flex items-center justify-center ">
                            <Loader
                                strokeWidth={1.5}
                                className="size-4 animate-spin text-muted-foreground/50"
                            />
                        </div>
                    ) : fetchedTags?.length === 0 ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/20">
                            <Frown strokeWidth={1.5} className="size-8" />
                            <span className="font-bricolage text-base ">No snippets found</span>
                        </div>
                    ) : (
                        fetchedTags?.map((tag) => (
                            <TagButton
                                key={tag.id}
                                tag={tag}
                                selected={selectedTags.includes(tag.name)}
                                onClick={() => handleTagSelection(tag.name)}
                            />
                        ))
                    )}
                </div>
                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogCancel className="text-xs h-8 flex items-center">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleApplyFilter}
                        className="text-xs h-8 flex items-center"
                    >
                        Filter
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

interface TagButtonProps {
    tag: { id: string; name: string };
    selected: boolean;
    onClick: () => void;
}

function TagButton({ tag, selected, onClick }: TagButtonProps) {
    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={onClick}
            className={cn(
                "p-2 h-7 text-xs flex items-center justify-center gap-1",
                selected && "text-primary bg-primary/30 hover:bg-primary/40",
            )}
        >
            {tag.name}
            {selected && <X className="size-3" />}
        </Button>
    );
}
