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
import { useFetchFolders } from "@/hooks/folder/useFetchFolders";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Frown, Loader } from "lucide-react";
import { Folder } from "@/types/global.types";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAddSnippetToFolder } from "@/hooks/snippet/useAddSnippetToFolder";
import { useRemoveSnippetFromFolder } from "@/hooks/snippet/useRemoveSnippetFromFolder";

interface SnippetFolderDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    currentFolderName: string;
    snippetId: string;
}

export function SnippetFolderDialog({
    isOpen,
    setIsOpen,
    currentFolderName,
    snippetId,
}: SnippetFolderDialogProps) {
    const {
        data: fetchedFolders,
        isLoading: fetchedFoldersLoading,
        isSuccess: fetchedFoldersSuccess,
    } = useFetchFolders();

    const {
        mutate: addSnippetToFolderMutate,
        isPending: addSnippetToFolderPending,
        isError: addSnippetToFolderError,
    } = useAddSnippetToFolder();

    const {
        mutate: removeSnippetFromFolderMutate,
        isPending: removeSnippetFromFolderPending,
        isError: removeSnippetFromFolderError,
    } = useRemoveSnippetFromFolder();

    const isDisabled =
        (addSnippetToFolderPending && !addSnippetToFolderError) ||
        (removeSnippetFromFolderPending && !removeSnippetFromFolderError);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-64 w-[calc(100%-1.25rem)] p-4 rounded-xl flex flex-col">
                <AlertDialogHeader className="space-y-0 flex flex-col items-center">
                    <AlertDialogTitle className="font-bricolage font-semibold ">
                        Add to Folder
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        Choose a folder to add this snippet to.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <ScrollArea className="w-full h-full flex-grow min-h-0">
                    <div className="w-full max-w-56 flex flex-col">
                        {fetchedFoldersLoading && !fetchedFoldersSuccess ? (
                            <div className="w-full flex flex-col items-center justify-center">
                                <Loader
                                    strokeWidth={1.5}
                                    className="size-4 animate-spin text-muted-foreground/50"
                                />
                            </div>
                        ) : fetchedFolders?.length === 0 ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/20">
                                <Frown strokeWidth={1.5} className="size-8" />
                                <span className="font-bricolage text-base ">No folders found</span>
                            </div>
                        ) : (
                            fetchedFolders?.map((folder: Folder) => (
                                <Button
                                    key={folder.id}
                                    variant="ghost"
                                    onClick={() =>
                                        addSnippetToFolderMutate({ folderId: folder.id, snippetId })
                                    }
                                    disabled={isDisabled}
                                    size="sm"
                                    className={cn(
                                        "w-full h-8",
                                        folder.name === currentFolderName && "hidden",
                                    )}
                                >
                                    <span className="w-full text-xs truncate capitalize">
                                        {folder?.name}
                                    </span>
                                </Button>
                            ))
                        )}
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
                <AlertDialogFooter className="sm:flex-col-reverse sm:justify-center sm:space-x-0 sm:gap-2">
                    <AlertDialogCancel
                        className={cn(
                            buttonVariants({ variant: "secondary", size: "sm" }),
                            "w-full text-sm h-8",
                        )}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => removeSnippetFromFolderMutate({ snippetId })}
                        className={cn(
                            buttonVariants({ variant: "destructive", size: "sm" }),
                            "w-full text-sm h-8",
                        )}
                    >
                        Remove from Folder
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
