"use client";

import { Icons } from "@/assets/icons";
import { useShikiHighlighter } from "@/hooks/ui/useShikiHighlighter";
import { cn } from "@/lib/utils";
import { Apple, AtomIcon, EllipsisIcon, FolderIcon, Heart, Trash2Icon } from "lucide-react";
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

export function HomeFeature2() {
    const html = useShikiHighlighter(codeSection.code, codeSection.language as BundledLanguage);
    return (
        <div className="w-full h-full  max-w-[592px] max-h-[384px] flex gap-2">
            <div className="w-full h-full bg-brand/20 flex flex-col rounded-3xl p-4 max-w-56">
                {sidebarItems.main.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center gap-2 rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        {item.icon}
                        {item.title}
                    </div>
                ))}
                <span className="text-muted-foreground text-sm p-2">Folders</span>
                <div className="flex items-center gap-2 rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/5">
                    {sidebarItems.folders[0].icon}
                    {sidebarItems.folders[0].title}
                </div>
                <div className="flex items-center gap-2 rounded-xl p-2 bg-black/5 dark:bg-white/5">
                    {sidebarItems.folders[1].icon}
                    {sidebarItems.folders[1].title}
                    <div className="ml-auto">
                        <div className="w-fit h-full relative">
                            <EllipsisIcon className="ml-auto size-5 text-muted-foreground" />
                            <div className="absolute top-full left-full mt-1 w-28 bg-muted-foreground/10 backdrop-blur-lg flex flex-col rounded-xl p-2 z-10 shadow-black/50 shadow-2xl">
                                <div className="relative">
                                    <button className="w-full text-left flex items-center gap-2 rounded-lg p-2 bg-black/5 dark:bg-white/5 text-sm">
                                        Share
                                    </button>
                                    <Icons.ArrowHandDrawn className="absolute top-4 -right-3 translate-x-full size-5 w-32 h-auto !fill-foreground/80 transform -scale-x-100 -rotate-90" />
                                </div>

                                <button className="w-full text-left flex items-center gap-2 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm">
                                    Edit
                                </button>
                                <button className="w-full text-left flex items-center gap-2 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm text-red-500">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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

            <div className="w-full h-full bg-brand/20 rounded-3xl p-3 relative">
                <div className="shikicode-homepage" dangerouslySetInnerHTML={{ __html: html }} />
                <div className="absolute -bottom-5 translate-y-full w-max right-0 rounded-3xl p-4 text-sm bg-muted-foreground/10 backdrop-blur-lg z-10 shadow-black/50 shadow-2xl text-muted-foreground font-semibold">
                    www.codesnippify.me/share/8c83b2b7-00fb-4371-b4e1
                </div>
            </div>
        </div>
    );
}
