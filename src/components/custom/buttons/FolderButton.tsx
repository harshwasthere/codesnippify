"use client";

import { buttonVariants } from "@/components/ui/button";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Folder } from "@/types/global.types";
import { FolderIcon } from "lucide-react";
import FolderButtonDropdown from "../dropdowns/FolderButtonDropdown";
import { FolderDeleteDialog } from "../dialogs/FolderDeleteDialog";
import { FolderRenameDialog } from "../dialogs/FolderRenameDialog";

interface FolderButtonProps {
    className?: string;
    folder: Folder;
    onClick?: () => void;
}

export function FolderButton({ className, folder, onClick }: FolderButtonProps) {
    const [isFolderDropdownMenuOpen, setIsFolderDropdownMenuOpen] = useState<boolean>(false);
    const [isFolderRenameDialogOpen, setIsFolderRenameDialogOpen] = useState<boolean>(false);
    const [isFolderDeleteDialogOpen, setIsFolderDeleteDialogOpen] = useState<boolean>(false);

    return (
        <React.Fragment>
            <div
                className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full h-8 group gap-2 cursor-pointer max-w-[235px]",
                )}
            >
                <FolderIcon
                    strokeWidth={1.5}
                    className="size-4 text-muted-foreground/50 fill-muted-foreground/10 group-hover:stroke-2 flex-shrink-0"
                />
                <span className="w-full text-start text-foreground/70 group-hover:text-foreground truncate capitalize">
                    {folder?.name}
                </span>

                <FolderButtonDropdown
                    isFolderDropdownMenuOpen={isFolderDropdownMenuOpen}
                    setIsFolderDropdownMenuOpen={setIsFolderDropdownMenuOpen}
                    setIsFolderRenameDialogOpen={setIsFolderRenameDialogOpen}
                    setIsFolderDeleteDialogOpen={setIsFolderDeleteDialogOpen}
                />
            </div>

            <FolderRenameDialog
                isOpen={isFolderRenameDialogOpen}
                onOpenChange={setIsFolderRenameDialogOpen}
                oldFolderName={folder?.name}
                folderId={folder?.id}
            />

            <FolderDeleteDialog
                isFolderDeleteDialogOpen={isFolderDeleteDialogOpen}
                setIsFolderDeleteDialogOpen={setIsFolderDeleteDialogOpen}
                folderId={folder?.id}
            />
        </React.Fragment>
    );
}
