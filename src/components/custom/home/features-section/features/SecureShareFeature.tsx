import { CodeBlock, CodeBlockCode } from "@/components/custom/code-block/CodeBlock";
import { homeFeatureSectionCode } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Apple, AtomIcon, FolderIcon, Heart, Trash2Icon } from "lucide-react";

// STEP 1: This is the feature section for the Secure Share feature
export function SecureShareFeature() {
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

                {sidebarItems.folders.map((item) => (
                    <SnippetOrganizerSidebarButton
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                    />
                ))}

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

            <CodeBlock className="border-none bg-foreground/5">
                <CodeBlockCode
                    className="home-feature-code-block"
                    lightTheme="github-light"
                    darkTheme="github-dark"
                    code={homeFeatureSectionCode}
                    language="typescript"
                />
            </CodeBlock>
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
    icon: React.ReactNode;
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
