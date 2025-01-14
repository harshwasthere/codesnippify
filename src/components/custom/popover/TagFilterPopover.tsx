"use client";

import React, { useState } from "react";
import { CircleAlertIcon, ListFilterIcon, Loader, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { useFetchTags } from "@/hooks/snippet/useFetchTags";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

export function TagFilterPopover() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="h-8 flex-shrink-0 rounded-full gap-1 px-3">
                    <ListFilterIcon className="size-4" />
                    <span className="max-2xs:hidden">Tags</span>
                    {selectedTags.length > 0 && (
                        <span className="text-primary bg-primary/20 group-hover:bg-primary/30 flex-shrink-0 p-1 px-1.5 h-5 min-w-5 rounded-full flex items-center justify-center">
                            {selectedTags.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                alignOffset={-24}
                sideOffset={8}
                className="max-w-96 min-w-72 w-72 sm:w-full p-4 flex flex-col gap-10 rounded-md"
            >
                <header className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-start justify-center">
                        <span className="text-sm font-semibold">Filter by Tags</span>
                        <span className="text-xs text-muted-foreground">
                            Select tags to filter snippets
                        </span>
                    </div>
                    {selectedTags.length > 0 && (
                        <Button
                            onClick={() => {
                                setSelectedTags([]);
                                setFilterTags([]);
                            }}
                            variant="destructive"
                            size="sm"
                            className="h-8 text-destructive bg-destructive/20 hover:bg-destructive/30"
                        >
                            Clear
                        </Button>
                    )}
                </header>
                <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                    {fetchedTagsLoading && !fetchedTagsSuccess ? (
                        <Loader className="size-4 animate-spin text-muted-foreground/50" />
                    ) : fetchedTags?.length === 0 ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground/50">
                            <CircleAlertIcon className="size-6" />
                            <span className="text-xs text-center">
                                Oops! There are no snippets with tags.
                            </span>
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
                <div className="flex items-center justify-center gap-2">
                    <PopoverClose
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                        Cancel
                    </PopoverClose>
                    <Button
                        onClick={handleApplyFilter}
                        className={cn(buttonVariants({ size: "sm" }))}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
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
