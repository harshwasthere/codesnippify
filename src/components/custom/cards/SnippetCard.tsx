import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useShikiHighlighter } from "@/lib/hooks/useShikiHighlighter";
import { cn, handleCopyToClipboard } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import { BundledLanguage } from "shiki";
import { SnippetCardDropdown } from "../dropdowns/SnippetCardDropdown";

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
    shared?: boolean;
}

export default function SnippetCard({ snippet, className, shared }: SnippetCardProps) {
    const html = useShikiHighlighter(snippet.code, snippet.language as BundledLanguage);

    return (
        <Card className={cn("w-full max-w-2xl group relative", className)}>
            <CardHeader className="space-y-3">
                <CardTitle className="font-ubuntu font-medium pr-8">{snippet.title}</CardTitle>
                <CardDescription className="italic">{snippet.description}</CardDescription>

                <SnippetCardDropdown
                    className="absolute top-1 right-4"
                    snippet={snippet}
                    isTrash={snippet.trash}
                    isDisabled={false}
                />

                <div className="w-full flex flex-wrap items-center gap-2 !mt-4">
                    <SnippetCardBadge>{snippet.language}</SnippetCardBadge>
                    {snippet.tags.map((tag) => (
                        <SnippetCardBadge variant="secondary" key={tag}>
                            {tag}
                        </SnippetCardBadge>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full h-full relative group rounded-md">
                    <ScrollBar orientation="horizontal" />
                    <ScrollBar orientation="vertical" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyToClipboard(snippet.code)}
                        className="absolute top-0 right-2 size-6 rounded-sm group-hover:flex hidden items-center justify-center flex-shrink-0 z-10"
                    >
                        <Clipboard strokeWidth={1.5} className="!size-3" />
                    </Button>
                    <div
                        className="shikicode-readonly"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

function SnippetCardBadge({
    children,
    variant,
}: {
    children: React.ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
}) {
    return (
        <Badge className="rounded-full font-medium" variant={variant}>
            {children}
        </Badge>
    );
}
