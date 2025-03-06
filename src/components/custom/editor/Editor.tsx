"use client";

import React from "react";
import { useTheme } from "next-themes";
import { hookScroll } from "@/hooks/ui/use-scroll";
import { cn } from "@/lib/utils";

interface EditorProps {
    value: string;
    language: string;
    lightTheme?: string;
    darkTheme?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

export function Editor({
    value,
    language,
    lightTheme = "github-light",
    darkTheme = "github-dark",
    onChange,
    disabled = false,
    className,
}: EditorProps) {
    const [highlightedHtml, setHighlightedHtml] = React.useState<string | null>(null);
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? darkTheme : lightTheme;
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        async function highlight() {
            try {
                // Import shiki dynamically only on client side
                const { codeToHtml } = await import("shiki");

                // Ensure empty lines are preserved by replacing them with a non-breaking space
                const codeForHighlighting = value.replace(/\n$/g, "\n ").replace(/\n\n/g, "\n \n");

                const html = await codeToHtml(codeForHighlighting, { lang: language, theme });
                setHighlightedHtml(html);
            } catch (error) {
                // Fallback to plain text if highlighting fails
                setHighlightedHtml(`<pre><code>${value}</code></pre>`);
            }
        }
        highlight();
    }, [value, language, theme]);

    React.useEffect(() => {
        const input = document.querySelector(".shiki-editor-input") as HTMLElement;
        const output = document.querySelector(".shiki-editor-output") as HTMLElement;

        if (input && output) {
            // Ensure both elements have the same padding and box model
            output.style.paddingBottom = window.getComputedStyle(input).paddingBottom;

            const cleanup = hookScroll(input, output);

            // Add resize observer to handle content changes
            const resizeObserver = new ResizeObserver(() => {
                // Force realignment when content size changes
                output.scrollTop = input.scrollTop;
            });

            resizeObserver.observe(input);

            return () => {
                cleanup();
                resizeObserver.disconnect();
            };
        }
    }, [highlightedHtml]);

    return (
        <div
            className={cn(
                "relative w-full h-full flex-grow min-h-[60px] rounded-md border border-input px-3 py-2 text-sm shadow-sm !bg-foreground/5",
                isFocused && "ring-1 ring-ring",
                disabled && "cursor-not-allowed opacity-50",
                className,
            )}
        >
            <textarea
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="shiki-editor-input !not-prose absolute top-2 right-3 bottom-2 left-3 w-[calc(100%-24px)] h-[calc(100%-16px)] flex flex-grow z-10  placeholder:text-muted-foreground font-geistMono text-sm overflow-auto resize-none !text-transparent !caret-foreground outline-none border-none margin-none bg-transparent"
                placeholder="Type your content here..."
            />

            {highlightedHtml ? (
                <div
                    className="shiki-editor-output !not-prose absolute top-2 right-3 bottom-2 left-3 w-[calc(100%-24px)] h-[calc(100%-16px)] flex flex-grow [&>pre]:!font-geistMono [&>pre]:!text-sm [&_code]:!font-geistMono [&_code]:!text-sm [&>pre]:!bg-transparent [&>pre]:whitespace-pre [&_code]:whitespace-pre overflow-hidden pointer-events-none bg-transparent"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
            ) : (
                <div className="shiki-editor-output !not-prose absolute top-2 right-3 bottom-2 left-3 w-[calc(100%-24px)] h-[calc(100%-16px)] flex flex-grow [&>pre]:!font-geistMono [&>pre]:!text-sm [&_code]:!font-geistMono [&_code]:!text-sm [&>pre]:!bg-transparent [&>pre]:whitespace-pre [&_code]:whitespace-pre overflow-hidden pointer-events-none">
                    <pre>
                        <code>{value}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}
