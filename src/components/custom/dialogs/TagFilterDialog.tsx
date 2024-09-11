"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
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
import { dummyTags } from "@/constants/global.constants";

interface TagFilterDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TagFilterDialog({ isOpen, onOpenChange }: TagFilterDialogProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagSelection = (tagName: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName],
        );
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-shrink-0 text-xs group flex items-center gap-2 p-2"
                >
                    <span>Tags</span>
                    <span className="text-primary bg-primary/20 group-hover:bg-primary/30 p-1 size-5 rounded-full flex items-center justify-center">
                        {selectedTags.length}
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-xl flex flex-col gap-6">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                        Tags Filter
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-muted-foreground">
                        Select tags to filter snippets
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                    {dummyTags.map((tag) => (
                        <TagButton
                            key={tag.id}
                            tag={tag}
                            selected={selectedTags.includes(tag.name)}
                            onClick={() => handleTagSelection(tag.name)}
                        />
                    ))}
                </div>
                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogCancel className="text-xs h-8">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="text-xs h-8 flex items-center">
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
                selected
                    ? "text-destructive bg-destructive/30 hover:bg-destructive/40"
                    : "text-primary bg-primary/30 hover:bg-primary/40",
            )}
        >
            {tag.name}
            {selected && <X className="size-3" />}
        </Button>
    );
}
