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
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";
import { Loader, Trash2 } from "lucide-react";

interface FolderDeleteDialogProps {
    folderId: string;
}

export function FolderDeleteDialog({ folderId }: FolderDeleteDialogProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const {
        mutate: deleteFolderMutate,
        isPending: deleteFolderPending,
        isError: deleteFolderError,
    } = useDeleteFolder();

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
                    <DialogTitle>Delete Folder</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this folder? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="max-sm:gap-2">
                    <DialogClose className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                        Cancel
                    </DialogClose>
                    <Button
                        onClick={() =>
                            deleteFolderMutate({ folderId }, { onSuccess: () => setIsOpen(false) })
                        }
                        disabled={deleteFolderPending && !deleteFolderError}
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "border border-destructive text-destructive bg-destructive/20 hover:bg-destructive/30",
                        )}
                    >
                        {deleteFolderPending && !deleteFolderError && (
                            <Loader className="size-4 animate-spin" />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
