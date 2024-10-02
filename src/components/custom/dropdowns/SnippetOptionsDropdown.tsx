import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ArrowUpFromLine,
    Ellipsis,
    EllipsisVertical,
    FolderIcon,
    FolderUpIcon,
    Pencil,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggleSnippetTrashStatus } from "@/hooks/snippet/useToggleSnippetTrashStatus";

interface SnippetOptionsDropdownProps {
    isSnippetOptionDropdownOpen: boolean;
    setIsSnippetOptionDropdownOpen: (open: boolean) => void;
    setSnippetUpdateSheetOpen: (open: boolean) => void;
    setSnippetFolderDialogOpen: (open: boolean) => void;
    setSnippetDeleteDialogOpen: (open: boolean) => void;
    isTrash: boolean;
    isDisabled: boolean;
    snippetId: string;
}

export default function SnippetOptionsDropdown({
    isSnippetOptionDropdownOpen,
    setIsSnippetOptionDropdownOpen,
    setSnippetUpdateSheetOpen,
    setSnippetFolderDialogOpen,
    setSnippetDeleteDialogOpen,
    isTrash,
    isDisabled,
    snippetId,
}: SnippetOptionsDropdownProps) {
    const { mutate: toggleSnippetTrashMutate } = useToggleSnippetTrashStatus();

    return (
        <DropdownMenu
            open={isSnippetOptionDropdownOpen}
            onOpenChange={setIsSnippetOptionDropdownOpen}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    disabled={isDisabled}
                    size="icon"
                    className="size-7 rounded-sm"
                >
                    <EllipsisVertical strokeWidth={1.5} className="size-4" />
                </Button>
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
                        setSnippetUpdateSheetOpen(true);
                    }}
                    className="text-xs flex items-center gap-2"
                >
                    <Pencil strokeWidth={1.5} className="size-3.5" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        setSnippetFolderDialogOpen(true);
                    }}
                    className="text-xs flex items-center gap-2"
                >
                    <FolderUpIcon strokeWidth={1.5} className="size-3.5" />
                    Folder
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        toggleSnippetTrashMutate({
                            snippetId: snippetId,
                            currentTrashStatus: isTrash,
                        });
                    }}
                    className="text-xs flex items-center gap-2"
                >
                    {isTrash ? (
                        <>
                            <ArrowUpFromLine strokeWidth={1.5} className="size-3.5" />
                            Restore
                        </>
                    ) : (
                        <>
                            <Trash2 strokeWidth={1.5} className="size-3.5" />
                            Trash
                        </>
                    )}
                </DropdownMenuItem>
                {isTrash && (
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.stopPropagation();
                            setSnippetDeleteDialogOpen(true);
                        }}
                        className="text-xs flex items-center gap-2"
                    >
                        <Trash2 strokeWidth={1.5} className="size-3.5" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
