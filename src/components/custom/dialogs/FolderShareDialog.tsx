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
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, handleCopyToClipboard } from "@/lib/utils";
import { Clipboard, Loader } from "lucide-react";
import { useUnshareFolder } from "@/hooks/folder/useUnShareFolder";

interface FolderShareDialogProps {
    isFolderShareDialogOpen: boolean;
    setIsFolderShareDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    folderId: string;
    folderShareToken: string | null;
    shareFolderPending: boolean;
    shareFolderError: boolean;
}

export function FolderShareDialog({
    isFolderShareDialogOpen,
    setIsFolderShareDialogOpen,
    folderId,
    folderShareToken,
    shareFolderPending,
    shareFolderError,
}: FolderShareDialogProps) {
    const shareLink = `${window.location.origin}/share/${folderShareToken}`;

    const {
        mutate: unshareFolder,
        isPending: unshareFolderPending,
        isError: unshareFolderError,
    } = useUnshareFolder();

    return (
        <AlertDialog open={isFolderShareDialogOpen} onOpenChange={setIsFolderShareDialogOpen}>
            <AlertDialogContent
                className="max-w-xl w-[calc(100%-1.25rem)] p-4 rounded-xl space-y-3 flex flex-col"
                overlayClassName="backdrop-blur-sm"
            >
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                        Send this folder to anyone.
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        Anyone with this link will can view your folder snippets.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {shareFolderPending && !shareFolderError ? (
                    <div className="w-full flex justify-center items-center bg-secondary rounded-md p-2">
                        <Loader
                            strokeWidth={1.5}
                            className="size-4 animate-spin text-muted-foreground/50"
                        />
                    </div>
                ) : folderShareToken ? (
                    <div className="w-full bg-secondary rounded-md p-2 text-xs font-mono flex justify-between gap-2 items-center">
                        <span className="w-full truncate">{shareLink}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCopyToClipboard(shareLink)}
                            disabled={unshareFolderPending && !unshareFolderError}
                            className="size-5 rounded flex items-center justify-center flex-shrink-0"
                        >
                            <Clipboard strokeWidth={1.5} className="size-3" />
                        </Button>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-md p-2 text-xs font-mono">
                        <span className="text-muted-foreground/20">This folder is not shared.</span>
                    </div>
                )}

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
                        onClick={() => unshareFolder({ folderId })}
                        className={cn(
                            buttonVariants({ variant: "destructive", size: "sm" }),
                            "w-full text-sm h-8",
                        )}
                    >
                        Unlink
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
