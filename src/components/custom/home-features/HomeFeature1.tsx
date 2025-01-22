"use client";

import { useShikiHighlighter } from "@/hooks/ui/useShikiHighlighter";
import { cn } from "@/lib/utils";
import { Apple, AtomIcon, FolderIcon, Heart, Trash2Icon } from "lucide-react";
import { BundledLanguage } from "shiki";

const sidebarItems = {
    main: [
        {
            icon: <Apple strokeWidth={2} className="size-5 text-brand fill-brand" />,
            title: "Snippets",
        },
        {
            icon: <Heart strokeWidth={2} className="size-5 text-red-400 fill-red-400" />,
            title: "Favorites",
        },
        {
            icon: <Trash2Icon strokeWidth={2} className="size-5 text-muted-foreground" />,
            title: "Trash",
        },
    ],
    folders: [
        {
            icon: (
                <FolderIcon
                    strokeWidth={2}
                    className="size-5 text-muted-foreground fill-muted-foreground"
                />
            ),
            title: "Fundamentals",
        },
        {
            icon: (
                <FolderIcon
                    strokeWidth={2}
                    className="size-5 text-muted-foreground fill-muted-foreground"
                />
            ),
            title: "React",
        },
    ],
    languages: [
        {
            icon: (
                <AtomIcon
                    strokeWidth={2}
                    className="size-5 text-muted-foreground fill-muted-foreground/50"
                />
            ),
            title: "JavaScript",
            count: 25,
        },
        {
            icon: (
                <AtomIcon
                    strokeWidth={2}
                    className="size-5 text-muted-foreground fill-muted-foreground/50"
                />
            ),
            title: "Rust",
            count: 13,
        },
    ],
};

const codeSection = {
    language: "javascript",
    code: `// Create and save a snippet
const snippet = {
  title: "Hello World",
  language: "JavaScript",
  code: "console.log('Hello, World!');",
};

// Save snippet
saveSnippet(snippet);

function saveSnippet(snippet) {
  console.log(\`Snippet saved!\`);
}
`,
};

export function HomeFeature1() {
    const html = useShikiHighlighter(codeSection.code, codeSection.language as BundledLanguage);
    return (
        <div className="w-full h-full max-w-[592px] max-h-[384px] flex gap-2">
            <div className="w-full h-full bg-brand/20 flex flex-col rounded-3xl p-4 max-w-56">
                {sidebarItems.main.map((item) => (
                    <div
                        key={item.title}
                        className={cn(
                            "flex items-center gap-2 rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/5",
                            item.title === "Snippets" && "bg-black/5 dark:bg-white/5",
                        )}
                    >
                        {item.icon}
                        {item.title}
                    </div>
                ))}
                <span className="text-muted-foreground text-sm p-2">Folders</span>
                {sidebarItems.folders.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center gap-2 rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        {item.icon}
                        {item.title}
                    </div>
                ))}

                <span className="text-muted-foreground text-sm p-2">Languages</span>

                {sidebarItems.languages.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center gap-2 rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        {item.icon}
                        {item.title}
                        <div className="ml-auto flex items-center justify-center flex-shrink-0 text-brand text-xs bg-brand-foreground/20 p-1 px-2 rounded-full">
                            {item.count}
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-full bg-brand/20 rounded-3xl p-3">
                <div className="shikicode-homepage" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}
