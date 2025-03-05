"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader, Trash2 } from "lucide-react";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogFooter,
} from "../responsive-dialog/ResponsiveDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteSnippet } from "@/hooks/snippet/useDeleteSnippet";

export function SnippetDeleteDialog({ snippetId }: { snippetId: string }) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const {
        mutate: deleteSnippetMutate,
        isPending: deleteSnippetPending,
        isError: deleteSnippetError,
    } = useDeleteSnippet();
    const isSubmitting = deleteSnippetPending && !deleteSnippetError;

    return (
        <ResponsiveDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Delete Snippet"
            description=" Are you sure you want to delete this snippet? This action cannot be undone."
            trigger={
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            }
        >
            <ResponsiveDialogFooter className="px-0">
                <ResponsiveDialogClose className={cn(buttonVariants({ variant: "outline" }))}>
                    Cancel
                </ResponsiveDialogClose>
                <Button
                    variant="destructive"
                    disabled={isSubmitting}
                    onClick={() =>
                        deleteSnippetMutate(snippetId, { onSuccess: () => setIsOpen(false) })
                    }
                >
                    {isSubmitting && <Loader className="size-4 animate-spin" />}
                    Delete
                </Button>
            </ResponsiveDialogFooter>
        </ResponsiveDialog>
    );
}
