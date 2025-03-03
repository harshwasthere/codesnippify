"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { FolderRenameDialog } from "../dialogs/FolderRenameDialog";
import { FolderDeleteDialog } from "../dialogs/FolderDeleteDialog";
import { FolderShareDialog } from "../dialogs/FolderShareDialog";
import { Folder } from "@/types/common.types";

interface SidebarFolderButtonDropdownProps {
    currentFolder: Folder;
    className?: string;
}

export function SidebarFolderButtonDropdown({
    currentFolder,
    className,
}: SidebarFolderButtonDropdownProps) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                        "h-5 w-6 p-0 rounded-sm text-sidebar-foreground bg-muted-foreground/10 hover:bg-muted-foreground/15 cursor-pointer flex-shrink-0",
                        className,
                    )}
                >
                    <MoreHorizontal className="size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-[6.5rem]"
                side="right"
                align="start"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <FolderRenameDialog
                    folderId={currentFolder.id}
                    oldFolderName={currentFolder.name}
                />
                <FolderShareDialog
                    folderId={currentFolder.id}
                    folderShareToken={currentFolder.share_token}
                />
                <FolderDeleteDialog folderId={currentFolder.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
