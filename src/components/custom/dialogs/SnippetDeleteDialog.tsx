import React from "react";
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
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";
import { useDeleteSnippet } from "@/hooks/snippet/useDeleteSnippet";
import { Trash2 } from "lucide-react";

interface SnippetDeleteDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    snippetId: string;
}

export function SnippetDeleteDialog({ isOpen, setIsOpen, snippetId }: SnippetDeleteDialogProps) {
    const {
        mutate: deleteSnippetMutate,
        isPending: deleteSnippetPending,
        isError: deleteSnippetError,
    } = useDeleteSnippet();

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent
                className="max-w-64 w-[calc(100%-1.25rem)] p-4 rounded-xl space-y-3"
                overlayClassName="backdrop-blur-sm"
            >
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                        Delete Snippet?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        This snippet will be deleted permanently.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={cn(
                            buttonVariants({ variant: "secondary", size: "sm" }),
                            "w-full text-sm h-8",
                        )}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteSnippetMutate(snippetId)}
                        disabled={deleteSnippetPending && !deleteSnippetError}
                        className={cn(
                            buttonVariants({ variant: "destructive", size: "sm" }),
                            "w-full text-sm h-8",
                        )}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
