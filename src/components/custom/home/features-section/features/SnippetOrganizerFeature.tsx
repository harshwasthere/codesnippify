import { CodeBlock, CodeBlockCode } from "@/components/custom/code-block/CodeBlock";
import { homeFeatureSectionCode } from "@/constants/constants";
import { Apple, AtomIcon, Copy, EllipsisIcon, FolderIcon, Heart, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";

// STEP 2: This is the feature section for the Snippet Organizer feature
export function SnippetOrganizerFeature() {
    const sidebarItems = {
        main: [
            {
                icon: <Apple strokeWidth={2} className="size-4 text-primary fill-primary" />,
                title: "Snippets",
            },
            {
                icon: (
                    <Heart strokeWidth={2} className="size-4 text-destructive fill-destructive" />
                ),
                title: "Favorites",
            },
            {
                icon: <Trash2Icon strokeWidth={2} className="size-4 text-muted-foreground" />,
                title: "Trash",
            },
        ],
        folders: [
            {
                icon: (
                    <FolderIcon
                        strokeWidth={2}
                        className="size-4 text-muted-foreground fill-muted-foreground"
                    />
                ),
                title: "Fundamentals",
            },
            {
                icon: (
                    <FolderIcon
                        strokeWidth={2}
                        className="size-4 text-muted-foreground fill-muted-foreground"
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
                        className="size-4 text-muted-foreground fill-muted-foreground/50"
                    />
                ),
                title: "JavaScript",
                count: 25,
            },
            {
                icon: (
                    <AtomIcon
                        strokeWidth={2}
                        className="size-4 text-muted-foreground fill-muted-foreground/50"
                    />
                ),
                title: "Rust",
                count: 13,
            },
        ],
    };
    return (
        <div className="pb-10 w-full max-w-[600px]">
            <div className="w-full h-full max-w-[600px] max-h-96 flex gap-2">
                <div className="h-full w-full max-w-56 flex flex-col px-3 py-4 rounded-xl bg-foreground/5">
                    {sidebarItems.main.map((item) => (
                        <SnippetOrganizerSidebarButton
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}

                    <SnippetOrganizerSidebarLabel>Folders</SnippetOrganizerSidebarLabel>

                    <SnippetOrganizerSidebarButton
                        icon={sidebarItems.folders[0].icon}
                        title={sidebarItems.folders[0].title}
                    />

                    <SnippetOrganizerSidebarButton
                        icon={sidebarItems.folders[1].icon}
                        title={sidebarItems.folders[1].title}
                        className="relative bg-foreground/5"
                    >
                        <EllipsisIcon className="ml-auto size-4 text-muted-foreground" />
                        <div className="absolute top-full left-full -translate-x-1 -translate-y-1 z-10 w-24 flex flex-col rounded-xl p-1 bg-foreground/5 backdrop-blur-md ">
                            <SnippetOrganizerSidebarButton
                                title="Share"
                                className="relative text-xs bg-foreground/5"
                            >
                                <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-4">
                                    <div className="relative">
                                        <Icons.ArrowHandDrawn className="w-36 h-auto fill-foreground" />
                                        <div className="absolute left-full top-full translate-x-2 -translate-y-5 min-w-full max-w-72 flex items-center gap-2 py-2 px-3 rounded-xl bg-foreground/5">
                                            <span className="truncate font-geistMono text-xs">
                                                www.codesnippify.me/share/8c83b2b7-00fb-4371-b4e1
                                            </span>
                                            <Copy className="ml-auto size-4 text-muted-foreground hover:text-primary cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </SnippetOrganizerSidebarButton>
                            <SnippetOrganizerSidebarButton title="Edit" className="text-xs" />
                            <SnippetOrganizerSidebarButton
                                title="Delete"
                                className="text-xs text-destructive"
                            />
                        </div>
                    </SnippetOrganizerSidebarButton>

                    <SnippetOrganizerSidebarLabel>Languages</SnippetOrganizerSidebarLabel>

                    {sidebarItems.languages.map((item) => (
                        <SnippetOrganizerSidebarButton
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                            count={item.count}
                        />
                    ))}
                </div>

                <CodeBlock className="relative border-none bg-foreground/5">
                    <CodeBlockCode
                        className="home-feature-code-block"
                        lightTheme="github-light"
                        darkTheme="github-dark"
                        code={homeFeatureSectionCode}
                        language="typescript"
                    />
                </CodeBlock>
            </div>
        </div>
    );
}

function SnippetOrganizerSidebarButton({
    icon,
    title,
    count,
    children,
    className,
}: {
    icon?: React.ReactNode;
    title: string;
    count?: number;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-foreground/5",
                className,
            )}
        >
            {icon}
            {title}
            {count && (
                <div className="ml-auto flex items-center justify-center py-0.5 px-1.5 text-xs rounded-full flex-shrink-0 text-primary  bg-primary-foreground/5">
                    {count}
                </div>
            )}
            {children}
        </div>
    );
}

function SnippetOrganizerSidebarLabel({ children }: { children: React.ReactNode }) {
    return <span className="text-muted-foreground text-xs py-2 px-3">{children}</span>;
}
