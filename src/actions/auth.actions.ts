"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import {
    ForgotPasswordFormSchemaTypes,
    LoginFormSchemaTypes,
    SignupFormSchemaTypes,
    UpdatePasswordFormSchemaTypes,
} from "@/types/zod.types";
import { errorMessage } from "@/lib/utils";

// Sign up a user with email and password
export async function signupUser(
    { email, password, confirmPassword }: SignupFormSchemaTypes,
) {
    try {
        if (password !== confirmPassword) {
            throw new Error("Passwords don't match");
        }

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// Authenticate a user with OAuth (GitHub by default) (currently only GitHub is supported)
export async function authenticateWithOAuth(provider: Provider = "github") {
    let redirectUrl: string | undefined;

    try {
        const origin = headers().get("origin");
        const supabase = createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${origin}/auth/callback?next=/snippets`,
            },
        });
        if (error) throw error;
        redirectUrl = data.url;
    } catch (error) {
        return { error: errorMessage(error) };
    } finally {
        if (redirectUrl) {
            redirect(redirectUrl);
        }
    }
}

// Authenticate a user with email and password
export async function loginUser({ email, password }: LoginFormSchemaTypes) {
    try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// Send a reset password link to the user's email
export async function sendResetPasswordLink(
    { email }: ForgotPasswordFormSchemaTypes,
) {
    try {
        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// Update the password of the user currently logged in by providing the new password
export async function updatePasswordOfUser({
    newPassword,
    confirmNewPassword,
}: UpdatePasswordFormSchemaTypes) {
    try {
        if (newPassword !== confirmNewPassword) {
            throw new Error("Passwords don't match");
        }

        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// Log out the user currently logged in
export async function logoutUser() {
    try {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}
