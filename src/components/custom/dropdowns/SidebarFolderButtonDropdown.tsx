"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Folder } from "@/types/global.types";
import { MoreHorizontal } from "lucide-react";
import { FolderRenameDialog } from "../dialogs/FolderRenameDialog";
import { FolderDeleteDialog } from "../dialogs/FolderDeleteDialog";
import { FolderShareDialog } from "../dialogs/FolderShareDialog";

interface SidebarFolderButtonDropdownProps {
    currentFolder: Folder;
    className?: string;
}

export function SidebarFolderButtonDropdown({
    currentFolder,
    className,
}: SidebarFolderButtonDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-5 w-6 p-0 rounded-sm text-sidebar-foreground cursor-pointer hover:bg-transparent",
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
                onCloseAutoFocus={(e) => e.preventDefault()}
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
