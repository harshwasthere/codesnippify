import { bundledLanguagesInfo } from "shiki";

export const langs = bundledLanguagesInfo.map((lang) => ({
    id: lang.id,
    name: lang.name,
}));

export const langIds = langs.map((lang) => lang.id);

export const langsEnum = langs.reduce((acc, lang) => {
    acc[lang.id] = lang.name;
    return acc;
}, {} as Record<string, string>);

export const fuseOptions = {
    threshold: 0.1,
    ignoreLocation: true,
    distance: 100,
    keys: ["title", "description", "language", "code", "tags"],
};
