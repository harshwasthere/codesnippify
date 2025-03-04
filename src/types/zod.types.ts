import { z } from "zod";
import {
    FolderCreateDialogSchema,
    FolderRenameDialogSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    SettingsFormSchema,
    SignupFormSchema,
    SnippetCreateFormSchema,
    UpdateNameFormSchema,
    UpdatePasswordFormSchema,
} from "@/lib/schemas";

// Authentication routes
export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type SignupFormSchemaTypes = z.infer<typeof SignupFormSchema>;
export type ForgotPasswordFormSchemaTypes = z.infer<
    typeof ForgotPasswordFormSchema
>;

// Onboarding routes
export type UpdatePasswordFormSchemaTypes = z.infer<
    typeof UpdatePasswordFormSchema
>;
export type UpdateNameFormSchemaTypes = z.infer<typeof UpdateNameFormSchema>;

// Folder related types
export type FolderRenameDialogSchemaTypes = z.infer<
    typeof FolderRenameDialogSchema
>;
export type FolderCreateDialogSchemaTypes = z.infer<
    typeof FolderCreateDialogSchema
>;

// Profile settings related types
export type SettingsFormSchemaTypes = z.infer<
    typeof SettingsFormSchema
>;

// Snippet related types
export type SnippetCreateFormSchemaTypes = z.infer<
    typeof SnippetCreateFormSchema
>;
