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
            redirectTo: `${origin}/auth/callback?next=/snippets`,
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

/* ---------------------------------------------------- folder actions ---------------------------------------------------- */

export async function fetchFolders() {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data, error } = await supabase.from("folders").select("*").eq("user_id", user_id);

    if (error) throw error;
    return data;
}

export async function createFolder({ folderName }: { folderName: string }) {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data, error } = await supabase
        .from("folders")
        .insert([{ name: folderName, user_id: user.id }])
        .select();

    if (error) throw error;
    return data;
}

export async function updateFolder({
    folderId,
    folderName,
}: {
    folderId: string;
    folderName: string;
}) {
    const supabase = createClient();

    const { error } = await supabase
        .from("folders")
        .update({ name: folderName })
        .eq("id", folderId)
        .select();

    if (error) throw error;
}

export async function deleteFolder({ folderId }: { folderId: string }) {
    const supabase = createClient();

    const { error } = await supabase.from("folders").delete().eq("id", folderId).select();

    if (error) throw error;
}

/* ---------------------------------------------------- language actions ---------------------------------------------------- */

export async function fetchLanguagesWithSnippetCount() {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data, error } = await supabase.rpc("get_languages_with_snippet_count", {
        p_user_id: user_id,
    });

    if (error) throw error;
    return data;
}

/* ---------------------------------------------------- snippet actions ---------------------------------------------------- */

interface FetchAllSnippetsProps {
    filter_tags?: string[];
    search_folder_id?: string;
    show_trash: boolean;
}

export async function fetchAllSnippets({
    filter_tags,
    search_folder_id,
    show_trash,
}: FetchAllSnippetsProps) {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data, error } = await supabase.rpc("get_snippets_with_filters", {
        search_user_id: user_id,
        filter_tags: filter_tags ?? [],
        search_folder_id: search_folder_id,
        show_trash: show_trash,
    });

    if (error) throw error;
    return data;
}

export async function createSnippet({
    title,
    tags,
    description,
    language,
    code,
}: {
    title: string;
    tags: string[];
    description?: string;
    language: string;
    code: string;
}) {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data: snippetData, error: snippetError } = await supabase
        .from("snippets")
        .insert({ user_id, title, description, language, code })
        .select()
        .single();

    if (snippetError) throw snippetError;

    const snippet_id = snippetData?.id;
    if (!snippet_id) throw new Error("Snippet not found");

    const { data: tagData, error: tagError } = await supabase
        .from("tags")
        .upsert(
            tags.map((tag: string) => ({ name: tag })),
            { onConflict: "name" },
        )
        .select("id, name");

    if (tagError) throw tagError;
    if (!tagData) throw new Error("Tag not found");

    const snippetTags = tagData.map((tag) => ({
        snippet_id,
        tag_id: tag.id,
        user_id,
    }));

    const { error: linkError } = await supabase.from("snippet_tags").insert(snippetTags);

    if (linkError) throw linkError;
}

/* ---------------------------------------------------- tags actions ---------------------------------------------------- */

export async function fetchTags() {
    const supabase = createClient();

    const user = await fetchUser();
    const user_id = user?.id;
    if (!user_id) throw new Error("User not found");

    const { data, error } = await supabase.rpc("get_all_tags_of_user", { search_user_id: user_id });

    if (error) throw error;
    return data;
}
