"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import SnippetUpdateSheet from "../sheets/SnippetUpdateSheet";
import { useToggleSnippetTrashStatus } from "@/hooks/snippet/useToggleSnippetTrashStatus";
import {
    ArrowUpFromLine,
    Heart,
    MoreHorizontal,
    Trash2,
    FolderIcon,
    Loader,
    FolderOutputIcon,
} from "lucide-react";
import { SnippetDeleteDialog } from "../dialogs/SnippetDeleteDialog";
import { useToggleSnippetFavoriteStatus } from "@/hooks/snippet/useToggleSnippetFavoriteStatus";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import React from "react";
import { useFetchFolders } from "@/hooks/folder/useFetchFolders";
import { Folder } from "@/types/global.types";
import { useRemoveSnippetFromFolder } from "@/hooks/snippet/useRemoveSnippetFromFolder";
import { useAddSnippetToFolder } from "@/hooks/snippet/useAddSnippetToFolder";

interface SnippetCardDropdownProps {
    isTrash: boolean;
    isDisabled: boolean;
    className?: string;
    snippet: {
        snippet_id: string;
        title: string;
        description: string;
        language: string;
        code: string;
        favorite: boolean;
        trash: boolean;
        created_at: string;
        folder_name: string;
        tags: string[];
    };
}

export function SnippetCardDropdown({
    snippet,
    isTrash,
    isDisabled,
    className,
}: SnippetCardDropdownProps) {
    const { mutate: toggleSnippetTrashMutate } = useToggleSnippetTrashStatus();

    const {
        mutate: toggleSnippetFavoriteMutate,
        isPending: toggleSnippetFavoritePending,
        isError: toggleSnippetFavoriteError,
    } = useToggleSnippetFavoriteStatus();

    const handleToggleSnippetFavoriteStatus = () => {
        toggleSnippetFavoriteMutate({
            snippetId: snippet.snippet_id,
            currentFavoriteStatus: snippet.favorite,
        });
    };

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

    const folderActionDisabled =
        (addSnippetToFolderPending && !addSnippetToFolderError) ||
        (removeSnippetFromFolderPending && !removeSnippetFromFolderError);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-7 rounded-full text-sidebar-foreground cursor-pointer data-[state=open]:bg-accent",
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
                <SnippetUpdateSheet snippet={snippet} />

                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        handleToggleSnippetFavoriteStatus();
                    }}
                    className="cursor-pointer"
                >
                    <Heart
                        className={cn("size-4", snippet.favorite && " fill-red-500 text-red-500")}
                    />
                    {snippet.favorite ? "Unfavorite" : "Favorite"}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <FolderIcon className="size-4" />
                        <span>Move to</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent sideOffset={8}>
                            <Command>
                                <CommandInput
                                    placeholder="Change status..."
                                    disabled={
                                        folderActionDisabled ||
                                        (fetchedFoldersLoading && !fetchedFoldersSuccess)
                                    }
                                />
                                <CommandList>
                                    {fetchedFoldersLoading && !fetchedFoldersSuccess ? (
                                        <CommandGroup>
                                            <div className="w-full flex flex-col items-center justify-center p-6">
                                                <Loader className="size-4 animate-spin text-muted-foreground/50" />
                                            </div>
                                        </CommandGroup>
                                    ) : (
                                        <>
                                            <CommandEmpty>No folder found.</CommandEmpty>
                                            <CommandGroup>
                                                {fetchedFolders?.map((folder: Folder) => (
                                                    <CommandItem
                                                        key={folder.id}
                                                        value={folder.id}
                                                        disabled={isDisabled}
                                                        onSelect={(value) => {
                                                            addSnippetToFolderMutate({
                                                                folderId: folder.id,
                                                                snippetId: snippet.snippet_id,
                                                            });
                                                        }}
                                                    >
                                                        <FolderIcon
                                                            className={cn(
                                                                "size-4",
                                                                folder.name ===
                                                                    snippet.folder_name &&
                                                                    "fill-primary",
                                                            )}
                                                        />
                                                        <span>{folder.name}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </>
                                    )}
                                </CommandList>
                            </Command>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                {snippet.folder_name && (
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/30">
                        <FolderOutputIcon className="size-4" />
                        <span>Remove from folder</span>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onSelect={(e) => {
                        e.stopPropagation();
                        toggleSnippetTrashMutate({
                            snippetId: snippet.snippet_id,
                            currentTrashStatus: isTrash,
                        });
                    }}
                    className={cn(
                        "cursor-pointer",
                        !isTrash &&
                            "text-destructive focus:text-destructive focus:bg-destructive/30",
                    )}
                >
                    {isTrash ? (
                        <>
                            <ArrowUpFromLine className="size-4" />
                            Restore
                        </>
                    ) : (
                        <>
                            <Trash2 className="size-4" />
                            Trash
                        </>
                    )}
                </DropdownMenuItem>

                {isTrash && <SnippetDeleteDialog snippetId={snippet.snippet_id} />}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
