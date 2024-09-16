import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki

type Props = {
    code: string;
    lang?: BundledLanguage;
    theme?: string;
};

export async function codeToHtmlShiki({ code, lang = "javascript", theme = "system" }: Props) {
    const html = await codeToHtml(code, {
        lang,
        theme: theme === "dark" || theme === "system" ? "vitesse-dark" : "vitesse-light",
    });

    return html;
}
