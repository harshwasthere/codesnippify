import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function errorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string" && error.trim().length > 0) {
        return error;
    }
    return "An unknown error occurred";
}

export type RemoveNullOn<T, O extends keyof T = never> = {
    [P in keyof T]: P extends O ? Exclude<T[P], null> : T[P];
};
export type RemoveNullExcept<T, E extends keyof T = never> = {
    [P in keyof T]: P extends E ? T[P] : Exclude<T[P], null>;
};

export type RemoveNull<T> = {
    [P in keyof T]: Exclude<T[P], null>;
};

export const search = <
    T extends {
        [key: string]: unknown;
    },
>(
    searchTerm: string,
    data: T[] | null | undefined,
    searchKey: keyof T,
): T[] => {
    if (!data) return [];
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) return data;

    const filtered = data.filter((item) => {
        const value = item[searchKey];
        return typeof value === "string" && value.toLowerCase().includes(normalizedSearchTerm);
    });

    return filtered;
};

export function handleCopyToClipboard(text: string) {
    navigator.clipboard
        .writeText(text)
        .then(() => toast.success("Copied to clipboard"))
        .catch((error) => {
            console.error("Failed to copy text: ", error);
        });
}
