"use server";

import {
    ForgotPasswordFormSchemaTypes,
    LoginFormSchemaTypes,
    SignupFormSchemaTypes,
    UpdatePasswordFormSchemaTypes,
} from "@/types/zod.types";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/* ---------------------------------------------------- auth actions ---------------------------------------------------- */

export async function signUpWithPassword(data: SignupFormSchemaTypes) {
    const { email, password, confirmPassword } = data;
    if (password !== confirmPassword) throw new Error("Passwords don't match");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) throw error;
}

export async function signInUserWithOAuth(provider: "github") {
    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
    });

    if (error) throw error;
    else redirect(data.url);
}

export async function loginUser(data: LoginFormSchemaTypes) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) throw error;
}

export async function sendResetPasswordLink(data: ForgotPasswordFormSchemaTypes) {
    const { email } = data;
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
}

export async function updatePasswordOfUser(data: UpdatePasswordFormSchemaTypes) {
    const { newPassword, confirmNewPassword } = data;
    if (newPassword !== confirmNewPassword) throw new Error("Passwords don't match");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) throw error;
}

export async function logoutUser() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/* ---------------------------------------------------- user actions ---------------------------------------------------- */

export async function fetchUser() {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    return user;
}

export async function fetchUserProfie() {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user_id).single();

    if (error) throw error;
    return data;
}

export async function updateUserProfile({
    newName,
    newAvatarUrl,
    userId,
}: {
    newName: string | null;
    newAvatarUrl: string | null;
    userId: string;
}) {
    if (!newName && !newAvatarUrl) return;

    const supabase = createClient();
    const data: { full_name?: string; avatar_url?: string } = {};

    if (newName) data.full_name = newName;
    if (newAvatarUrl) data.avatar_url = newAvatarUrl;

    const { error } = await supabase.from("profiles").update(data).eq("id", userId).select();

    if (error) throw error;
}
