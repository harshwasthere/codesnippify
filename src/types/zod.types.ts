import { z } from "zod";
import {
    FolderRenameDialogSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    SignupFormSchema,
    UpdateNameFormSchema,
    UpdatePasswordFormSchema,
} from "@/lib/zod/schema";

// authentication routes
export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type SignupFormSchemaTypes = z.infer<typeof SignupFormSchema>;
export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;

//onboarding routes
export type UpdatePasswordFormSchemaTypes = z.infer<typeof UpdatePasswordFormSchema>;
export type UpdateNameFormSchemaTypes = z.infer<typeof UpdateNameFormSchema>;

//folder
export type FolderRenameDialogSchemaTypes = z.infer<typeof FolderRenameDialogSchema>;