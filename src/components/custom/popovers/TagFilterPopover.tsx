"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ListFilterIcon } from "lucide-react";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useFetchTags } from "@/hooks/snippet/useFetchTags";
import { Separator } from "@/components/ui/separator";

export function TagFilterPopover() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const { setFilterTags, filterTags } = useGlobalStore(
        useShallow((store) => ({
            setFilterTags: store.setFilterTags,
            filterTags: store.filterTags,
        })),
    );

    const [selectedTags, setSelectedTags] = React.useState<string[]>(filterTags);

    const {
        data: fetchedTags,
        // isLoading: fetchedTagsLoading,
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

    const handleClearFilter = () => {
        setSelectedTags([]);
        setFilterTags([]);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="h-8 flex-shrink-0 rounded-full gap-1 px-3">
                    <ListFilterIcon className="size-4" />
                    <span className="max-2xs:hidden">Tags</span>
                    {selectedTags.length > 0 && (
                        <span className="text-primary bg-primary/10 group-hover:bg-primary/20 flex-shrink-0 p-1 px-1.5 h-5 min-w-5 rounded-full flex items-center justify-center">
                            {selectedTags.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search tag..." />
                    <CommandList>
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup>
                            {fetchedTags?.map((tag) => (
                                <CommandItem
                                    value={tag.name}
                                    key={tag.id}
                                    onSelect={() => {
                                        handleTagSelection(tag.name);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-4",
                                            selectedTags.includes(tag.name)
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <Separator />
                <div className="flex items-center justify-center gap-2 p-1">
                    <Button
                        variant="secondary"
                        className="w-full"
                        disabled={selectedTags.length === 0}
                        onClick={handleClearFilter}
                    >
                        Clear
                    </Button>
                    <Button
                        className="w-full"
                        disabled={selectedTags.length === 0}
                        onClick={handleApplyFilter}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
