"use server";

import {
    ForgotPasswordFormSchemaTypes,
    LoginFormSchemaTypes,
    SignupFormSchemaTypes,
    UpdatePasswordFormSchemaTypes,
} from "@/types/zod.types";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Sign up a user with email and password
export async function signupUser(
    { email, password, confirmPassword }: SignupFormSchemaTypes,
) {
    if (password !== confirmPassword) throw new Error("Passwords don't match");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) throw error;
}

// Authenticate a user with OAuth (GitHub by default) (currently only GitHub is supported)
export async function authenticateWithOAuth(provider: Provider = "github") {
    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: `${origin}/auth/callback?next=/snippets`,
        },
    });
    if (error) throw error;
    else redirect(data.url);
}

// Authenticate a user with email and password
export async function loginUser({ email, password }: LoginFormSchemaTypes) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
}

// Send a reset password link to the user's email
export async function sendResetPasswordLink(
    { email }: ForgotPasswordFormSchemaTypes,
) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
}

// Update the password of the user currently logged in by providing the new password
export async function updatePasswordOfUser({
    newPassword,
    confirmNewPassword,
}: UpdatePasswordFormSchemaTypes) {
    if (newPassword !== confirmNewPassword) {
        throw new Error("Passwords don't match");
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
}

// Log out the user currently logged in
export async function logoutUser() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}
