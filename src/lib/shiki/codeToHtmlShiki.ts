import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki

type Props = {
    code: string;
    lang?: BundledLanguage;
    theme?: string;
};

/**
 * Converts code to HTML using the Shiki library
 * @param {string} code - The code to convert to HTML
 * @param {string} lang - The language of the code
 * @param {string} theme - The theme of the code
 */

export async function codeToHtmlShiki({ code, lang = "javascript", theme = "system" }: Props) {
    const html = await codeToHtml(code, {
        lang,
        theme: theme === "dark" || theme === "system" ? "vitesse-dark" : "catppuccin-latte",
    });

    return html;
}
