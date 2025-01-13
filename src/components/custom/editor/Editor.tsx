"use client";

import { hookScroll } from "@/hooks/ui/useScroll";
import { cn } from "@/lib/utils";
import React from "react";
import { BundledLanguage, codeToHtml } from "shiki";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    theme?: "light" | "dark" | "system";
    language?: BundledLanguage;
    className?: string;
}

export default function Editor({
    value,
    onChange,
    theme = "light",
    language = "typescript",
    className,
}: EditorProps) {
    const shikiTheme = theme === "light" ? "github-light" : "catppuccin-mocha";

    const [snippetCode, setSnippetCode] = React.useState("");

    React.useEffect(() => {
        const codeToHtmlShiki = async () => {
            const html = await codeToHtml(value, {
                lang: language,
                theme: shikiTheme,
            });
            setSnippetCode(html);
        };
        codeToHtmlShiki();
    }, [value, language, shikiTheme]);

    React.useEffect(() => {
        const input = document.querySelector(".shikicode.input") as HTMLElement;
        const output = document.querySelector(".shikicode.output") as HTMLElement;

        if (input && output) {
            const cleanup = hookScroll(input, output);
            return cleanup;
        }
    }, []);

    return (
        <div className={cn("h-56 rounded-md px-3", className)}>
            <div className="h-full w-full relative">
                <textarea
                    className="shikicode input"
                    style={{
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        tabSize: 2,
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
                <div
                    className="shikicode output"
                    style={{
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        tabSize: 2,
                    }}
                    dangerouslySetInnerHTML={{ __html: snippetCode }}
                ></div>
            </div>
        </div>
    );
}
