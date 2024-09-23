import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpFromLine, Clipboard, Heart, Pencil, Trash2 } from "lucide-react";
import { codeToHtmlShiki } from "@/lib/shiki/codeToHtmlShiki";
import { useTheme } from "next-themes";
import { BundledLanguage } from "shiki";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { langsEnum } from "@/constants/global.constants";
import { useToggleSnippetFavoriteStatus } from "@/hooks/snippet/useToggleSnippetFavoriteStatus";
import { cn } from "@/lib/utils";
import { useToggleSnippetTrashStatus } from "@/hooks/snippet/useToggleSnippetTrashStatus";
import EditSnippetSheet from "../sheets/EditSnippetSheet";
import { useDeleteSnippet } from "@/hooks/snippet/useDeleteSnippet";
import { SnippetDeleteDialog } from "../dialogs/SnippetDeleteDialog";
import toast from "react-hot-toast";

interface SnippetCardProps {
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
    className?: string;
}

export function SnippetCard({ snippet, className }: SnippetCardProps) {
    const [snippetCode, setSnippetCode] = React.useState<string>("");
    const theme = useTheme().theme;
    codeToHtmlShiki({
        code: snippet.code,
        theme: theme,
        lang: snippet.language as BundledLanguage,
    }).then((value) => setSnippetCode(value));

    const {
        mutate: toggleSnippetFavoriteMutate,
        isPending: toggleSnippetFavoritePending,
        isError: toggleSnippetFavoriteError,
    } = useToggleSnippetFavoriteStatus();

    const {
        mutate: toggleSnippetTrashMutate,
        isPending: toggleSnippetTrashPending,
        isError: toggleSnippetTrashError,
    } = useToggleSnippetTrashStatus();

    const isDisabled =
        (toggleSnippetFavoritePending && !toggleSnippetFavoriteError) ||
        (toggleSnippetTrashPending && !toggleSnippetTrashError);

    const handleToggleSnippetFavoriteStatus = () => {
        toggleSnippetFavoriteMutate({
            snippetId: snippet.snippet_id,
            currentFavoriteStatus: snippet.favorite,
        });
    };

    const handleToggleSnippetTrashStatus = () => {
        toggleSnippetTrashMutate({
            snippetId: snippet.snippet_id,
            currentTrashStatus: snippet.trash,
        });
    };

    const handleCopyToClipboard = () => {
        // Use the original code (not HTML) for copying
        navigator.clipboard
            .writeText(snippet.code)
            .then(() => toast.success("Code copied to clipboard"))
            .catch((error) => {
                console.error("Failed to copy text: ", error);
            });
    };

    return (
        <Card className="break-inside-avoid  max-w-72 snippet-card-break-1:max-w-96 sm:max-w-lg">
            <CardHeader className="w-full flex flex-row items-center justify-between gap-2 space-y-0 p-4">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleToggleSnippetFavoriteStatus}
                    disabled={isDisabled}
                    className={cn(
                        "size-7 rounded-sm flex-shrink-0 hover:bg-destructive/10",
                        snippet.favorite &&
                            "bg-destructive/10 hover:bg-destructive/20 text-destructive",
                    )}
                >
                    <Heart
                        strokeWidth={1.5}
                        className={cn(
                            "size-4",
                            snippet.favorite && " fill-destructive hover:stroke-2",
                        )}
                    />
                </Button>
                <div className="flex items-center justify-center gap-2">
                    <EditSnippetSheet snippet={snippet} isDisabled={isDisabled} />
                    <Button
                        variant="secondary"
                        onClick={handleToggleSnippetTrashStatus}
                        disabled={isDisabled}
                        size="icon"
                        className="size-7 rounded-sm"
                    >
                        {snippet.trash ? (
                            <ArrowUpFromLine strokeWidth={1.5} className="size-4" />
                        ) : (
                            <Trash2 strokeWidth={1.5} className="size-4" />
                        )}
                    </Button>
                    {snippet.trash && (
                        <SnippetDeleteDialog
                            snippetId={snippet.snippet_id}
                            isDisabled={isDisabled}
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className="w-full flex flex-col gap-4 p-4 pt-0">
                <div className="flex flex-col">
                    <CardTitle className="text-lg font-bold font-manrope text-foreground/80">
                        {snippet.title}
                    </CardTitle>
                    <CardDescription>{snippet.description}</CardDescription>
                </div>
                <div className="w-full flex flex-wrap gap-2">
                    <Badge className="py-1 bg-green-400 text-foreground/70 dark:text-foreground dark:bg-green-600">
                        {langsEnum[snippet.language]}
                    </Badge>
                    {snippet.tags.map((tag, index) => (
                        <Badge
                            key={index}
                            className="text-primary rounded-sm bg-primary/20 hover:bg-primary/20 py-1"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                <ScrollArea className="w-full h-full relative group rounded-md">
                    <ScrollBar orientation="horizontal" />
                    <ScrollBar orientation="vertical" />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopyToClipboard}
                        className="size-7 rounded-sm hidden group-hover:flex absolute top-2 right-2 items-center justify-center flex-shrink-0"
                    >
                        <Clipboard strokeWidth={1.5} className="size-4" />
                    </Button>
                    <div dangerouslySetInnerHTML={{ __html: snippetCode }} />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
