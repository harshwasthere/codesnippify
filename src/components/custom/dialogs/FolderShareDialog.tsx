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
import { cn, handleCopyToClipboard } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CircleAlertIcon, Clipboard, Loader, LoaderIcon, Share2Icon, Trash } from "lucide-react";
import { useShareFolder } from "@/hooks/folder/useShareFolder";
import { useUnshareFolder } from "@/hooks/folder/useUnShareFolder";

interface FolderShareDialogProps {
    folderId: string;
    folderShareToken: string | null;
}

export function FolderShareDialog({ folderId, folderShareToken }: FolderShareDialogProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const {
        mutateAsync: shareFolder,
        isPending: shareFolderPending,
        isError: shareFolderError,
    } = useShareFolder({ folderId });

    const shareLink = `${window.location.origin}/share/${folderShareToken}`;

    const {
        mutate: unshareFolder,
        isPending: unshareFolderPending,
        isError: unshareFolderError,
    } = useUnshareFolder();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                        if (folderShareToken === null) {
                            shareFolder();
                        }
                    }}
                    className="cursor-pointer"
                >
                    <Share2Icon className="size-4" />
                    <span>{folderShareToken ? "Shared link" : "Share"}</span>
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="max-w-md w-[calc(100%-1.25rem)] p-4 flex flex-col rounded-md">
                <DialogHeader>
                    <DialogTitle>Share Folder</DialogTitle>
                    <DialogDescription>
                        Share this folder with others by copying the link below. Anyone with the
                        link can view your folder snippets.
                    </DialogDescription>
                </DialogHeader>
                {shareFolderPending && !shareFolderError ? (
                    <div className="w-full flex justify-center items-center p-4">
                        <LoaderIcon className="size-4 animate-spin text-muted-foreground/50" />
                    </div>
                ) : folderShareToken ? (
                    <div className="w-full flex justify-center items-center gap-2 bg-secondary rounded-md p-2 text-xs font-ubuntuMono">
                        <span className="w-full truncate">{shareLink}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCopyToClipboard(shareLink)}
                            disabled={unshareFolderPending && !unshareFolderError}
                            className="size-5 flex items-center justify-center flex-shrink-0"
                        >
                            <Clipboard className="!size-3" />
                        </Button>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-xs text-muted-foreground/50">
                        <CircleAlertIcon className="size-6" />
                        <span className="text-xs text-center">
                            Oops! This folder is not shared.
                        </span>
                    </div>
                )}
                <DialogFooter className="max-sm:gap-2">
                    <DialogClose className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                        Cancel
                    </DialogClose>
                    <Button
                        onClick={() =>
                            unshareFolder({ folderId }, { onSuccess: () => setIsOpen(false) })
                        }
                        disabled={unshareFolderPending && !unshareFolderError}
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "border border-destructive text-destructive bg-destructive/20 hover:bg-destructive/30",
                        )}
                    >
                        {unshareFolderPending && !unshareFolderError && (
                            <Loader className="size-4 animate-spin" />
                        )}
                        Unshare
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
