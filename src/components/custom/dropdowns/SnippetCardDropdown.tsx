"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import SnippetUpdateSheet from "../sheets/SnippetUpdateSheet";
import { useToggleSnippetTrashStatus } from "@/hooks/snippet/useToggleSnippetTrashStatus";
import { ArrowUpFromLine, Heart, MoreHorizontal, Trash2 } from "lucide-react";
import { SnippetDeleteDialog } from "../dialogs/SnippetDeleteDialog";
import { useToggleSnippetFavoriteStatus } from "@/hooks/snippet/useToggleSnippetFavoriteStatus";

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
