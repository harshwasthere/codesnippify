import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clipboard, Heart, Pencil, Trash2 } from "lucide-react";
import { codeToHtmlShiki } from "@/lib/shiki/codeToHtmlShiki";
import { useTheme } from "next-themes";
import { BundledLanguage } from "shiki";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { langsEnum } from "@/constants/global.constants";

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

    return (
        <Card className="break-inside-avoid  max-w-72 snippet-card-break-1:max-w-96 sm:max-w-lg">
            <CardHeader className="w-full flex flex-row items-center justify-between gap-2 space-y-0 p-4">
                <Button variant="secondary" size="icon" className="size-7 rounded-sm flex-shrink-0">
                    <Heart strokeWidth={1.5} className="size-4" />
                </Button>
                <div className="flex items-center justify-center gap-2">
                    <Button variant="secondary" size="icon" className="size-7 rounded-sm">
                        <Pencil strokeWidth={1.5} className="size-4" />
                    </Button>
                    <Button variant="secondary" size="icon" className="size-7 rounded-sm">
                        <Trash2 strokeWidth={1.5} className="size-4" />
                    </Button>
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
