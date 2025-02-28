"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export type CodeBlockProps = {
    children?: React.ReactNode;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    return (
        <div
            className={cn(
                "not-prose flex w-full flex-col overflow-clip border",
                "border-border bg-card text-card-foreground rounded-xl",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export type CodeBlockCodeProps = {
    code: string;
    language?: string;
    lightTheme?: string;
    darkTheme?: string;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

export function CodeBlockCode({
    code,
    language = "tsx",
    lightTheme = "github-light",
    darkTheme = "github-dark",
    className,
    ...props
}: CodeBlockCodeProps) {
    const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? darkTheme : lightTheme;

    useEffect(() => {
        async function highlight() {
            try {
                // Import shiki dynamically only on client side
                const { codeToHtml } = await import("shiki");
                const html = await codeToHtml(code, { lang: language, theme });
                setHighlightedHtml(html);
            } catch (error) {
                console.error("Error highlighting code:", error);
                // Fallback to plain text if highlighting fails
                setHighlightedHtml(`<pre><code>${code}</code></pre>`);
            }
        }
        highlight();
    }, [code, language, theme]);

    const classNames = cn(
        "w-full overflow-x-auto text-[13px] [&>pre]:px-4 [&>pre]:py-4",
        className,
    );

    // SSR fallback: render plain code if not hydrated yet
    return highlightedHtml ? (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            {...props}
        />
    ) : (
        <div className={classNames} {...props}>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function CodeBlockGroup({ children, className, ...props }: CodeBlockGroupProps) {
    return (
        <div className={cn("flex items-center justify-between", className)} {...props}>
            {children}
        </div>
    );
}
