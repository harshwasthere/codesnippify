import { useTheme } from "next-themes"; // or your theme provider
import React from "react";
import { BundledLanguage, codeToHtml } from "shiki";

export function useShikiHighlighter(code: string, language: BundledLanguage) {
    const { theme } = useTheme();
    const [snippetCode, setSnippetCode] = React.useState("");
    const shikiTheme = theme === "light" ? "github-light" : "catppuccin-mocha";

    React.useEffect(() => {
        const codeToHtmlShiki = async () => {
            const html = await codeToHtml(code, {
                lang: language,
                theme: shikiTheme,
            });
            setSnippetCode(html);
        };
        codeToHtmlShiki();
    }, [code, language, shikiTheme]);

    return snippetCode;
}
