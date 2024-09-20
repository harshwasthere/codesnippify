"use client";

import { Snippet } from "@/types/global.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { codeToHtmlShiki } from "@/lib/shiki/codeToHtmlShiki";
import { useTheme } from "next-themes";
import { BundledLanguage } from "shiki";
import { fetchAllSnippets } from "@/app/actions";
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useFetchSnippets } from "@/hooks/snippet/useFetchSnippets";
import { useShallow } from "zustand/react/shallow";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

const snippet = {
    title: "Debouncing a Search Input",
    description:
        "This function helps in reducing the frequency of API calls by debouncing the user’s input in a search bar.",
    tags: ["javascript", "react", "debounce"],
    language: "javascript",
    code: `function debounce(fn, delay) {
let timeoutId;
return function (...args) {
if (timeoutId) clearTimeout(timeoutId);
timeoutId = setTimeout(() => fn(...args), delay) will bemroe than expected what can we do about it;
};
}

// Usage
const search = debounce((query) => {
console.log("Searching for:", query);
}, 300);
`,
    created_at: "2024-09-16 21:55:35.37732",
    updated_at: "2024-09-16 21:55:35.37732",
};

export default function SnippetPage() {
    const { filterTags } = useGlobalStore(
        useShallow((store) => ({
            filterTags: store.filterTags,
        })),
    );

    const {
        data: fetchedSnippets,
        isLoading: fetchedSnippetsLoading,
        isSuccess: fetchedSnippetsSuccess,
    } = useFetchSnippets({ filter_tags: filterTags, show_trash: false });

    console.log(fetchedSnippets);

    const [snippetCode, setSnippetCode] = React.useState<string>("");
    const theme = useTheme().theme;
    codeToHtmlShiki({
        code: snippet.code,
        theme: theme,
        lang: snippet.language as BundledLanguage,
    }).then((value) => setSnippetCode(value));

    React.useEffect(() => {
        async function runCommand() {
            const data = await fetchAllSnippets({ show_trash: false });
            console.log(data);
        }

        runCommand();
    }, []);

    return (
        <div
            className={`h-full w-full rounded-md space-y-3 columns-1 dashboard-break-1:columns-2 dashboard-break-2:columns-3 gap-3 mx-auto`}
        >
            {fetchedSnippets?.map((snippet) => (
                <Card
                    key={snippet.id}
                    className="break-inside-avoid"
                >
                    <CardHeader
                        className={cn("flex flex-col p-4 space-y-4 w-full overflow-hidden ")}
                    >
                        <div className="w-full flex space-y-0 items-center justify-between gap-1">
                            <Button variant="ghost" size="icon" className="size-7 rounded-sm">
                                <Heart strokeWidth={1.5} className="size-5" />
                            </Button>
                            <div className="flex justify-center items-center gap-1">
                                <Button variant="ghost" size="icon" className="size-7 rounded-sm">
                                    <Pencil strokeWidth={1.5} className="size-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="size-7 rounded-sm">
                                    <Trash2 strokeWidth={1.5} className="size-5" />
                                </Button>
                            </div>
                        </div>
                        <CardTitle className="text-base font-bold font-manrope">
                            {snippet.title}
                        </CardTitle>
                        <CardDescription>{snippet.description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                            {snippet.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    className="text-primary rounded-sm bg-primary/20 hover:bg-primary/20"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: snippetCode }} />
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}

/**
 * favorite, trash , edit
 */
