"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SnippetUpdateSheet } from "../sheets/SnippetUpdateSheet";
import { useToggleSnippetTrashStatus } from "@/hooks/snippet/useToggleSnippetTrashStatus";
import {
    ArrowUpFromLine,
    Heart,
    MoreHorizontal,
    Trash2,
    FolderIcon,
    FolderUpIcon,
    FolderDownIcon,
} from "lucide-react";
import { useToggleSnippetFavoriteStatus } from "@/hooks/snippet/useToggleSnippetFavoriteStatus";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import React from "react";
import { useFetchFolders } from "@/hooks/folder/useFetchFolders";
import { Folder } from "@/types/common.types";
import { useRemoveSnippetFromFolder } from "@/hooks/snippet/useRemoveSnippetFromFolder";
import { useAddSnippetToFolder } from "@/hooks/snippet/useAddSnippetToFolder";
import { SnippetDeleteDialog } from "../dialogs/SnippetDeleteDialog";

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
    const {
        data: fetchedFolders,
        isLoading: fetchedFoldersLoading,
        isSuccess: fetchedFoldersSuccess,
    } = useFetchFolders();

    const { mutate: addSnippetToFolderMutate } = useAddSnippetToFolder();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "rounded-full size-8 text-sidebar-foreground cursor-pointer data-[state=open]:bg-accent",
                        className,
                    )}
                >
                    <MoreHorizontal className="size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-full min-w-[12rem]"
                side="right"
                align="start"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <DropdownMenuLabel className="text-xs font-semibold">Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <SnippetUpdateSheet snippet={snippet} />
                    <FavoriteButton
                        snippetId={snippet.snippet_id}
                        currentFavoriteStatus={snippet.favorite}
                    />
                    <TrashButton snippetId={snippet.snippet_id} isTrash={snippet.trash} />
                    {isTrash && <SnippetDeleteDialog snippetId={snippet.snippet_id} />}
                </DropdownMenuGroup>

                <DropdownMenuLabel className="text-xs font-semibold">
                    Folder Management
                </DropdownMenuLabel>

                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <FolderDownIcon className="size-4" />
                            <span>Move to</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent sideOffset={8} className="min-w-20 w-full">
                                <Command>
                                    <CommandInput
                                        placeholder="Search folder..."
                                        disabled={fetchedFoldersLoading && !fetchedFoldersSuccess}
                                    />
                                    <CommandList>
                                        <CommandEmpty>No folder found.</CommandEmpty>
                                        <CommandGroup>
                                            {fetchedFolders?.map((folder: Folder) => (
                                                <CommandItem
                                                    key={folder.id}
                                                    value={folder.id}
                                                    disabled={isDisabled}
                                                    onSelect={() => {
                                                        addSnippetToFolderMutate({
                                                            folderId: folder.id,
                                                            snippetId: snippet.snippet_id,
                                                        });
                                                    }}
                                                >
                                                    <FolderIcon
                                                        className={cn(
                                                            "size-4",
                                                            folder.name === snippet.folder_name &&
                                                                "fill-muted-foreground text-muted-foreground",
                                                        )}
                                                    />
                                                    <span>{folder.name}</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {snippet.folder_name && <MoveOutButton snippetId={snippet.snippet_id} />}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function FavoriteButton({
    snippetId,
    currentFavoriteStatus,
}: {
    snippetId: string;
    currentFavoriteStatus: boolean;
}) {
    const { mutate: toggleSnippetFavoriteMutate } = useToggleSnippetFavoriteStatus();

    return (
        <DropdownMenuItem
            onSelect={(e) => {
                e.stopPropagation();
                toggleSnippetFavoriteMutate({
                    snippetId: snippetId,
                    currentFavoriteStatus: currentFavoriteStatus,
                });
            }}
            className="cursor-pointer"
        >
            <Heart className={cn("size-4", currentFavoriteStatus && "fill-red-500 text-red-500")} />
            {currentFavoriteStatus ? "Unfavorite" : "Favorite"}
        </DropdownMenuItem>
    );
}

function TrashButton({ snippetId, isTrash }: { snippetId: string; isTrash: boolean }) {
    const { mutate: toggleSnippetTrashMutate, isPending: toggleSnippetTrashPending } =
        useToggleSnippetTrashStatus();

    return (
        <DropdownMenuItem
            onSelect={(e) => {
                e.stopPropagation();
                toggleSnippetTrashMutate({
                    snippetId: snippetId,
                    currentTrashStatus: isTrash,
                });
            }}
            disabled={toggleSnippetTrashPending}
            className={cn(
                "cursor-pointer",
                !isTrash && "text-destructive focus:text-destructive focus:bg-destructive/10",
            )}
        >
            {isTrash ? (
                <>
                    <ArrowUpFromLine className="size-4" />
                    <span>Restore</span>
                </>
            ) : (
                <>
                    <Trash2 className="size-4" />
                    <span>Trash</span>
                </>
            )}
        </DropdownMenuItem>
    );
}

function MoveOutButton({ snippetId }: { snippetId: string }) {
    const { mutate: removeSnippetFromFolderMutate } = useRemoveSnippetFromFolder();

    return (
        <DropdownMenuItem
            onSelect={(e) => {
                e.stopPropagation();
                removeSnippetFromFolderMutate({
                    snippetId: snippetId,
                });
            }}
            className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
            <FolderUpIcon className="size-4" />
            <span>Move out</span>
        </DropdownMenuItem>
    );
}
