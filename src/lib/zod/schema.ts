import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Enter valid email" })
        .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
            message: "Enter valid email",
        }),
    password: z.string().min(3, { message: "Password length is too short" }),
});

export const SignupFormSchema = z
    .object({
        email: z
            .string()
            .email({ message: "Enter valid email" })
            .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
                message: "Enter valid email",
            }),
        password: z
            .string()
            .min(8, { message: "Password length is too short" })
            .refine((value) => /[a-z]/.test(value), {
                message: "Include a lowercase letter",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Include an uppercase letter",
            })
            .refine((value) => /\d/.test(value), {
                message: "Include a number",
            })
            .refine((value) => /\W|_/.test(value), {
                message: "Include a special character",
            }),
        confirmPassword: z.string().min(1, { message: "Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const ForgotPasswordFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Enter valid email" })
        .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
            message: "Enter valid email",
        }),
});

export const UpdatePasswordFormSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, { message: "Password length is too short" })
            .refine((value) => /[a-z]/.test(value), {
                message: "Include a lowercase letter",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Include an uppercase letter",
            })
            .refine((value) => /\d/.test(value), {
                message: "Include a number",
            })
            .refine((value) => /\W|_/.test(value), {
                message: "Include a special character",
            }),
        confirmNewPassword: z.string().min(1, { message: "Password is required" }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });

export const UpdateNameFormSchema = z.object({
    newName: z.string().min(2, { message: "Name is required" }),
});

export const FolderRenameDialogSchema = z.object({
    newFolderName: z.string().min(1, { message: "Folder name is required" }),
});


export const ProfileSettingsFormSchema = z.object({
    newFullName: z.string().min(2, { message: "Full name is required." }).max(30 , {message: "Max length exceeded"}),
});