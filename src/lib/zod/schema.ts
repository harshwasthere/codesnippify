import { langIds } from "@/constants/global.constants";
import { z } from "zod";

// Common validations
const emailValidation = z
    .string()
    .email({ message: "Enter valid email address." })
    .max(100, { message: "Email address is too long." })
    .refine(
        (value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value),
        {
            message: "Enter valid email address.",
        },
    );

const passwordValidation = z
    .string()
    .min(8, { message: "Password length is too short." })
    .max(100, { message: "Password length is too long." })
    .refine((value) => /[a-z]/.test(value), {
        message: "Include a lowercase letter.",
    })
    .refine((value) => /[A-Z]/.test(value), {
        message: "Include an uppercase letter.",
    })
    .refine((value) => /\d/.test(value), {
        message: "Include a number.",
    })
    .refine((value) => /\W|_/.test(value), {
        message: "Include a special character.",
    });

// Authentication routes
export const LoginFormSchema = z.object({
    email: emailValidation,
    password: z
        .string()
        .min(3, { message: "Password length is too short." })
        .max(100, { message: "Password length is too long." }),
});

export const SignupFormSchema = z
    .object({
        email: emailValidation,
        password: passwordValidation,
        confirmPassword: z
            .string()
            .min(1, { message: "Password is required." })
            .max(100, { message: "Password length is too long." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const ForgotPasswordFormSchema = z.object({
    email: emailValidation,
});

// Onboarding routes
export const UpdatePasswordFormSchema = z
    .object({
        newPassword: passwordValidation,
        confirmNewPassword: z
            .string()
            .min(1, { message: "Password is required." })
            .max(100, { message: "Password length is too long." }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match.",
        path: ["confirmNewPassword"],
    });

export const UpdateNameFormSchema = z.object({
    newName: z
        .string()
        .min(2, { message: "Name is required." })
        .max(30, { message: "Max length exceeded." }),
});

// Folder related schemas
export const FolderRenameDialogSchema = z.object({
    newFolderName: z
        .string()
        .min(1, { message: "Folder name is required." })
        .max(30, { message: "Max length exceeded." }),
});

export const FolderCreateDialogSchema = z.object({
    folderName: z
        .string()
        .min(1, { message: "Folder name is required." })
        .max(30, { message: "Max length exceeded." }),
});

// Profile settings related schemas
export const ProfileSettingsFormSchema = z.object({
    newFullName: z
        .string()
        .min(2, { message: "Full name is required." })
        .max(30, { message: "Max length exceeded." }),
});

// Snippet related schemas
export const SnippetCreateFormSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title is required." })
        .max(50, { message: "Max length exceeded." }),

    description: z.string().max(500, { message: "Max length exceeded." })
        .optional(),
    language: z
        .string()
        .refine((lang) => langIds.includes(lang), {
            message: "Language is required.",
        }),
    code: z.string().min(3, { message: "Code is required." }),
    tags: z.array(z.string()).refine(
        (tags) => new Set(tags).size === tags.length,
        {
            message: "Tags must be unique.",
        },
    ),
});
