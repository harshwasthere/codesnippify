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
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";

interface FolderDeleteDialogProps {
    isFolderDeleteDialogOpen: boolean;
    setIsFolderDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    folderId: string;
}

export function FolderDeleteDialog({
    isFolderDeleteDialogOpen,
    setIsFolderDeleteDialogOpen,
    folderId,
}: FolderDeleteDialogProps) {
    const {
        mutate: deleteFolderMutate,
        isPending: deleteFolderPending,
        isError: deleteFolderError,
    } = useDeleteFolder();

    return (
        <AlertDialog open={isFolderDeleteDialogOpen} onOpenChange={setIsFolderDeleteDialogOpen}>
            <AlertDialogContent
                className="max-w-64 w-[calc(100%-1.25rem)] p-4 rounded-xl space-y-3"
                overlayClassName="backdrop-blur-sm"
            >
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                        Delete Folder?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        This folder will be deleted permanently.
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
                        onClick={() => deleteFolderMutate({ folderId })}
                        disabled={deleteFolderPending && !deleteFolderError}
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
