"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader, Trash2 } from "lucide-react";
import { useDeleteSnippet } from "@/hooks/snippet/useDeleteSnippet";

interface SnippetDeleteDialogProps {
    snippetId: string;
}

export function SnippetDeleteDialog({ snippetId }: SnippetDeleteDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const {
        mutate: deleteSnippetMutate,
        isPending: deleteSnippetPending,
        isError: deleteSnippetError,
    } = useDeleteSnippet();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/30 cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <DialogHeader>
                    <DialogTitle>Delete Snippet</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this snippet? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                        Cancel
                    </DialogClose>
                    <Button
                        onClick={() =>
                            deleteSnippetMutate(snippetId, { onSuccess: () => setIsOpen(false) })
                        }
                        disabled={deleteSnippetPending && !deleteSnippetError}
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "border border-destructive text-destructive bg-destructive/20 hover:bg-destructive/30",
                        )}
                    >
                        {deleteSnippetPending && !deleteSnippetError && (
                            <Loader className="size-4 animate-spin" />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
