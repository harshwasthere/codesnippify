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
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";

export function FolderDeleteDialog({ folderId }: { folderId: string }) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const {
        mutate: deleteFolderMutate,
        isPending: deleteFolderPending,
        error: deleteFolderError,
    } = useDeleteFolder();
    const isSubmitting = deleteFolderPending && !deleteFolderError;

    return (
        <ResponsiveDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Delete Folder"
            description="Are you sure you want to delete this folder? This action cannot be undone."
            trigger={
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/30 cursor-pointer"
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
                    disabled={isSubmitting}
                    onClick={() =>
                        deleteFolderMutate({ folderId }, { onSuccess: () => setIsOpen(false) })
                    }
                    className="border border-destructive text-destructive bg-destructive/20 hover:bg-destructive/30"
                >
                    {isSubmitting && <Loader className="size-4 animate-spin" />}
                    Delete
                </Button>
            </ResponsiveDialogFooter>
        </ResponsiveDialog>
    );
}
