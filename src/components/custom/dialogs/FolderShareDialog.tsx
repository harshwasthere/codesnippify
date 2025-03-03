"use client";

import React from "react";
import { cn, handleCopyToClipboard } from "@/lib/utils";
import { Clipboard, Loader, Share2Icon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogFooter,
} from "../responsive-dialog/ResponsiveDialog";
import { useShareFolder } from "@/hooks/folder/useShareFolder";
import { useUnshareFolder } from "@/hooks/folder/useUnShareFolder";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

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

    const {
        mutate: unshareFolder,
        isPending: unshareFolderPending,
        isError: unshareFolderError,
    } = useUnshareFolder();

    const isPending =
        (shareFolderPending && !shareFolderError) || (unshareFolderPending && !unshareFolderError);

    const sharedLink = `${window.location.origin}/share/${folderShareToken}`;

    return (
        <ResponsiveDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Share Folder"
            description="Share this folder with others by copying the link below. Anyone with the link can view your folder snippets."
            trigger={
                <Button onSelect={(e) => e.preventDefault()}>
                    <Share2Icon className="size-4" />
                    <span>Share</span>
                </Button>
            }
        >
            <div className="w-full flex flex-col gap-4">
                <AnimatePresence mode="wait">
                    {folderShareToken && sharedLink && (
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: -10,
                                    scale: 0.95,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{
                                duration: 0.15,
                                ease: "easeOut",
                            }}
                            className="w-full flex justify-center items-center gap-2 py-2 px-3 bg-secondary text-secondary-foreground rounded-md"
                        >
                            <motion.span className="w-full truncate font-geist text-sm">
                                {sharedLink}
                            </motion.span>
                            <Button
                                size="icon"
                                disabled={isPending}
                                onClick={() => handleCopyToClipboard(sharedLink)}
                                className="size-5 flex items-center justify-center flex-shrink-0 bg-foreground/5 hover:bg-foreground/10"
                            >
                                <Clipboard className="!size-3" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ResponsiveDialogFooter className="px-0">
                    <ResponsiveDialogClose className={cn(buttonVariants({ variant: "outline" }))}>
                        Close
                    </ResponsiveDialogClose>
                    <Button
                        disabled={isPending}
                        onClick={() => {
                            if (folderShareToken) {
                                unshareFolder({ folderId });
                            } else {
                                shareFolder();
                            }
                        }}
                    >
                        {isPending && <Loader className="size-4 animate-spin" />}
                        {folderShareToken ? "Unshare" : "Share"}
                    </Button>
                </ResponsiveDialogFooter>
            </div>
        </ResponsiveDialog>
    );
}
