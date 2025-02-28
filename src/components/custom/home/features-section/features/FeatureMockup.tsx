import { CodeBlock, CodeBlockCode } from "@/components/custom/code-block/CodeBlock";
import { homeFeatureSectionCode } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Apple, AtomIcon, Copy, EllipsisIcon, FolderIcon, Heart, Trash2Icon } from "lucide-react";
import { Icons } from "@/assets/icons";
import React from "react";

type FeatureMockupProps = {
    step: 1 | 2 | 3;
};

// 1. Move static data outside the component
const SIDEBAR_ITEMS = {
    main: [
        {
            icon: <Apple strokeWidth={2} className="size-4 text-primary fill-primary" />,
            title: "Snippets",
        },
        {
            icon: <Heart strokeWidth={2} className="size-4 text-destructive fill-destructive" />,
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
} as const;

// 2. Memoize helper components
const MemoizedSnippetOrganizerSidebarButton = React.memo(SnippetOrganizerSidebarButton);

export function FeatureMockup({ step }: FeatureMockupProps) {
    // 3. Memoize render functions
    const renderCodeBlock = React.useCallback(
        () => (
            <CodeBlock className={cn("border-none bg-foreground/5", step === 2 && "relative")}>
                <CodeBlockCode
                    className="home-feature-code-block"
                    lightTheme="github-light"
                    darkTheme="github-dark"
                    code={homeFeatureSectionCode}
                    language="typescript"
                />
            </CodeBlock>
        ),
        [step],
    );

    // 4. Memoize sidebar render function
    const renderSidebar = React.useCallback(
        () => (
            <div className="h-full w-full max-w-56 flex flex-col px-3 py-4 rounded-xl bg-foreground/5">
                {SIDEBAR_ITEMS.main.map((item) => (
                    <MemoizedSnippetOrganizerSidebarButton
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                    />
                ))}

                <SnippetOrganizerSidebarLabel>Folders</SnippetOrganizerSidebarLabel>

                {step === 2 ? (
                    <>
                        <SnippetOrganizerSidebarButton
                            icon={SIDEBAR_ITEMS.folders[0].icon}
                            title={SIDEBAR_ITEMS.folders[0].title}
                        />
                        <SnippetOrganizerSidebarButton
                            icon={SIDEBAR_ITEMS.folders[1].icon}
                            title={SIDEBAR_ITEMS.folders[1].title}
                            className="relative bg-foreground/5"
                        >
                            <EllipsisIcon className="ml-auto size-4 text-muted-foreground" />
                            <div className="absolute top-full left-full -translate-x-1 -translate-y-1 z-10 w-24 flex flex-col rounded-xl p-1 bg-foreground/5 backdrop-blur-md">
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
                    </>
                ) : (
                    SIDEBAR_ITEMS.folders.map((item) => (
                        <SnippetOrganizerSidebarButton
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))
                )}

                <SnippetOrganizerSidebarLabel>Languages</SnippetOrganizerSidebarLabel>

                {SIDEBAR_ITEMS.languages.map((item) => (
                    <SnippetOrganizerSidebarButton
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        count={item.count}
                    />
                ))}
            </div>
        ),
        [step],
    );

    // 5. Memoize computed classNames
    const containerClassName = React.useMemo(
        () => cn("w-full h-full max-w-[600px]", step === 2 && "pb-10", step === 1 && "max-h-96"),
        [step],
    );

    const contentClassName = React.useMemo(
        () => cn("w-full h-full max-w-[600px] flex gap-2", step === 1 && "max-h-96", "sm:gap-1"),
        [step],
    );

    if (step === 3) {
        return (
            <div className={cn("w-full h-full max-w-[600px] pb-12 pr-4")}>
                <div className="relative w-full lg:w-[524px] h-full min-h-[348px] max-h-96 max-w-[600px] flex">
                    <div className="absolute bottom-8 right-10 translate-x-1/2 translate-y-1/2 flex flex-col items-center justify-center">
                        <Icons.LogoShiki className="size-28" />
                        <span className="font-semibold mt-2">Shiki 式</span>
                        <span className="text-xs text-muted-foreground">Syntax highlighter</span>
                    </div>
                    {renderCodeBlock()}
                </div>
            </div>
        );
    }

    return (
        <div className={containerClassName}>
            <div className={contentClassName}>
                {renderSidebar()}
                {renderCodeBlock()}
            </div>
        </div>
    );
}

// Helper components remain the same
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
