import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, handleCopyToClipboard } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import { SnippetCardDropdown } from "../dropdowns/SnippetCardDropdown";
import { CodeBlock } from "../code-block/CodeBlock";
import { CodeBlockCode } from "../code-block/CodeBlock";

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

export function SnippetCard({ snippet, className, shared }: SnippetCardProps) {
    return (
        <Card className={cn("w-full max-w-2xl group relative", className)}>
            <CardHeader className="space-y-3 font-geist">
                <CardTitle className="pr-8">{snippet.title}</CardTitle>
                <CardDescription className="italic">{snippet.description}</CardDescription>
                <div className="w-full flex flex-wrap items-center gap-2 !mt-4">
                    <Badge className="font-geistMono font-medium">{snippet.language}</Badge>
                    {snippet.tags.map((tag) => (
                        <Badge className="font-geistMono font-medium" variant="secondary" key={tag}>
                            {tag}
                        </Badge>
                    ))}
                </div>

                <SnippetCardDropdown
                    className="absolute top-0 right-4"
                    snippet={snippet}
                    isTrash={snippet.trash}
                    isDisabled={false}
                />
            </CardHeader>
            <CardContent>
                <CodeBlock
                    className={cn(
                        "relative max-h-[300px] w-full h-full border-none rounded-none bg-inherit overflow-auto",
                    )}
                >
                    <CodeBlockCode
                        className="home-feature-code-block"
                        lightTheme="github-light"
                        darkTheme="github-dark"
                        code={snippet.code}
                        language={snippet.language}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyToClipboard(snippet.code)}
                        className="absolute top-4 right-4 size-7"
                    >
                        <Clipboard strokeWidth={1.5} className="size-4" />
                    </Button>
                </CodeBlock>
            </CardContent>
        </Card>
    );
}
