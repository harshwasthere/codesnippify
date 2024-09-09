import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

interface FolderButtonDropdownProps {
    isFolderDropdownMenuOpen: boolean;
    setIsFolderDropdownMenuOpen: (open: boolean) => void;
    setIsFolderRenameDialogOpen: (open: boolean) => void;
    setIsFolderDeleteDialogOpen: (open: boolean) => void;
}

export default function FolderButtonDropdown({
    isFolderDropdownMenuOpen,
    setIsFolderDropdownMenuOpen,
    setIsFolderRenameDialogOpen,
    setIsFolderDeleteDialogOpen,
}: FolderButtonDropdownProps) {
    return (
        <DropdownMenu open={isFolderDropdownMenuOpen} onOpenChange={setIsFolderDropdownMenuOpen}>
            <DropdownMenuTrigger className="h-full px-1">
                <Ellipsis
                    strokeWidth={1.5}
                    className="z-10 size-4 block md:hidden group-hover:block"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                side="right"
                alignOffset={12}
                sideOffset={-4}
                onClick={(e) => e.stopPropagation()}
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="min-w-full"
            >
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        setIsFolderRenameDialogOpen(true);
                    }}
                    className="text-xs"
                >
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        setIsFolderDeleteDialogOpen(true);
                    }}
                    className="text-xs"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
