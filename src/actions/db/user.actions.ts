"use server";

import { createClient } from "@/utils/supabase/server";

// fetch the authenticated user from supabase
export async function fetchUser() {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    return user;
}

// fetch the profile of the authenticated user
export async function fetchUserProfie({ userId }: { userId: string }) {
    const supabase = createClient();

    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

    if (error) throw error;
    return data;
}

// update the profile of the authenticated user
export async function updateUserProfile({
    fullName,
    avatarUrl,
    userId,
}: {
    fullName?: string | null;
    avatarUrl?: string;
    userId: string;
}) {
    if (!userId) throw new Error("User not found");
    if (!fullName && !avatarUrl) throw new Error("Already up to date");

    const supabase = createClient();

    const data: { full_name?: string; avatar_url?: string } = {};
    if (fullName) data.full_name = fullName;
    if (avatarUrl) data.avatar_url = avatarUrl;

    const { error } = await supabase.from("profiles").update(data).eq("id", userId);
    if (error) throw error;
}
