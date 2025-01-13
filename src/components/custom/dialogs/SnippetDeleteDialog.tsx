"use client";

import { buttonVariants } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import { useDeleteSnippet } from "@/hooks/snippet/useDeleteSnippet";

interface SnippetDeleteDialogProps {
    snippetId: string;
}

export function SnippetDeleteDialog({ snippetId }: SnippetDeleteDialogProps) {
    const {
        mutate: deleteSnippetMutate,
        isPending: deleteSnippetPending,
        isError: deleteSnippetError,
    } = useDeleteSnippet();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive focus:bg-destructive/30 cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle>Delete Snippet</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this snippet? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteSnippetMutate(snippetId)}
                        disabled={deleteSnippetPending && !deleteSnippetError}
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
