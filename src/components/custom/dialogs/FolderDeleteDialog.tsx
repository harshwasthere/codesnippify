"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import React from "react";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";
import { Trash } from "lucide-react";

interface FolderDeleteDialogProps {
    folderId: string;
}

export function FolderDeleteDialog({ folderId }: FolderDeleteDialogProps) {
    const {
        mutate: deleteFolderMutate,
        isPending: deleteFolderPending,
        isError: deleteFolderError,
    } = useDeleteFolder();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/30 cursor-pointer"
                >
                    <Trash className="size-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle>Delete Folder</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this folder? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteFolderMutate({ folderId })}
                        disabled={deleteFolderPending && !deleteFolderError}
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "border border-destructive text-destructive bg-destructive/20 hover:bg-destructive/30",
                        )}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
