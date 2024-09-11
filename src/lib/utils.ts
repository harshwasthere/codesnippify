import { clsx, type ClassValue } from "clsx";
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
