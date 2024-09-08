import { z } from "zod";
import { ForgotPasswordFormSchema, LoginFormSchema, SignupFormSchema } from "@/lib/zod/schema";

export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type SignupFormSchemaTypes = z.infer<typeof SignupFormSchema>;
export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;
