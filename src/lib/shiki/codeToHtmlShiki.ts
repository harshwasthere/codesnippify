import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki

type Props = {
    code: string;
    lang?: BundledLanguage;
    theme?: BundledTheme;
};

export async function codeToHtmlShiki({ code, lang = "javascript", theme = "nord" }: Props) {
    const html = await codeToHtml(code, {
        lang,
        theme: theme,
    });

    return html;
}
