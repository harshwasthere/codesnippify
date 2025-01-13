import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useShikiHighlighter } from "@/lib/hooks/useShikiHighlighter";
import { handleCopyToClipboard } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import { BundledLanguage } from "shiki";
import { SnippetCardDropdown } from "../dropdowns/SnippetCardDropdown";

const snippet = {
    snippet_id: "1",
    title: "Generate Random UUID in JavaScript",
    favorite: true,
    trash: true,
    created_at: new Date().toISOString(),
    folder_name: "JavaScript",
    description:
        "This snippet demonstrates how to generate a random UUID (Universally Unique Identifier) in JavaScript using the crypto module. UUIDs are commonly used as unique identifiers in databases and applications.",
    tags: ["javascript", "uuid", "random", "utilities"],
    language: "javascript",
    code: `function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

// Example usage:
const uuid = generateUUID();
console.log('Generated UUID:', uuid);
`,
};

export default function SnippetCard() {
    const html = useShikiHighlighter(snippet.code, snippet.language as BundledLanguage);

    return (
        <Card className="w-full max-w-2xl group relative">
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
