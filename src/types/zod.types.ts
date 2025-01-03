import { z } from "zod";
import {
    FolderCreateDialogSchema,
    // SnippetCreateFormSchema,
    FolderRenameDialogSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    ProfileSettingsFormSchema,
    SignupFormSchema,
    SnippetFolderSelectSchema,
    UpdateNameFormSchema,
    UpdatePasswordFormSchema,
} from "@/lib/zod/schema";

/**
 * This file contains the types of zod schemas.
 *
 * Authentication routes
 * @type LoginFormSchemaTypes - The type of the LoginFormSchema
 * @type SignupFormSchemaTypes - The type of the SignupFormSchema
 * @type ForgotPasswordFormSchemaTypes - The type of the ForgotPasswordFormSchema
 *
 * Onboarding routes
 * @type UpdatePasswordFormSchemaTypes - The type of the UpdatePasswordFormSchema
 * @type UpdateNameFormSchemaTypes - The type of the UpdateNameFormSchema
 *
 * Folder related schemas
 * @type FolderRenameDialogSchemaTypes - The type of the FolderRenameDialogSchema
 * @type FolderCreateDialogSchemaTypes - The type of the FolderCreateDialogSchema
 *
 * Profile settings related schemas
 * @type ProfileSettingsFormSchemaTypes - The type of the ProfileSettingsFormSchema
 *
 * Snippet related schemas
 * @type SnippetCreateFormSchemaTypes - The type of the SnippetCreateFormSchema
 * @type SnippetFolderSelectSchemaTypes - The type of the SnippetFolderSelectSchema
 */

export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type SignupFormSchemaTypes = z.infer<typeof SignupFormSchema>;
export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;

export type UpdatePasswordFormSchemaTypes = z.infer<typeof UpdatePasswordFormSchema>;
export type UpdateNameFormSchemaTypes = z.infer<typeof UpdateNameFormSchema>;

export type FolderRenameDialogSchemaTypes = z.infer<typeof FolderRenameDialogSchema>;
export type FolderCreateDialogSchemaTypes = z.infer<typeof FolderCreateDialogSchema>;

export type ProfileSettingsFormSchemaTypes = z.infer<typeof ProfileSettingsFormSchema>;

// export type SnippetCreateFormSchemaTypes = z.infer<typeof SnippetCreateFormSchema>;
export type SnippetFolderSelectSchemaTypes = z.infer<typeof SnippetFolderSelectSchema>;
