"use client";

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
                        "size-6 flex items-center justify-center text-sidebar-foreground cursor-pointer flex-shrink-0",
                        className,
                    )}
                >
                    <MoreHorizontal className="size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
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
