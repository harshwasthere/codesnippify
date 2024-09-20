import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clipboard, Heart, Pencil, Trash2 } from "lucide-react";
import { codeToHtmlShiki } from "@/lib/shiki/codeToHtmlShiki";
import { useTheme } from "next-themes";
import { BundledLanguage } from "shiki";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SnippetCardProps {
    snippet: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        code: string;
        language: string;
        created_at: string;
        updated_at: string;
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
        <Card className="break-inside-avoid max-w-lg">
            <CardHeader className="w-full flex flex-row items-center justify-between gap-2 space-y-0 p-4">
                <Button variant="ghost" size="icon" className="size-7 rounded-sm flex-shrink-0">
                    <Heart strokeWidth={1.5} className="size-5" />
                </Button>
                <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" className="size-7 rounded-sm">
                        <Pencil strokeWidth={1.5} className="size-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7 rounded-sm">
                        <Trash2 strokeWidth={1.5} className="size-5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="w-full flex flex-col gap-4 p-4 pt-0">
                <CardTitle className="text-base font-bold font-manrope">{snippet.title}</CardTitle>
                <CardDescription>{snippet.description}</CardDescription>
                <div className="w-full flex flex-wrap gap-2">
                    {snippet.tags.map((tag, index) => (
                        <Badge
                            key={index}
                            className="text-primary rounded-sm bg-primary/20 hover:bg-primary/20"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="w-full relative group">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-7 rounded-sm hidden group-hover:flex absolute top-2 right-2 items-center justify-center flex-shrink-0"
                    >
                        <Clipboard strokeWidth={1.5} className="size-4" />
                    </Button>
                    <div dangerouslySetInnerHTML={{ __html: snippetCode }} />
                </div>
            </CardContent>
        </Card>
    );
}
