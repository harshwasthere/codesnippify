"use server";

import { createClient } from "@/utils/supabase/server";
import { errorMessage } from "@/lib/utils";

// fetch the authenticated user from supabase
export async function fetchUser() {
    try {
        const supabase = createClient();
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error) throw error;
        return user;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// fetch the profile of the authenticated user
export async function fetchUserProfie({ userId }: { userId: string }) {
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        return { error: errorMessage(error) };
    }
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
    try {
        if (!userId) throw new Error("User not found");
        if (!fullName && !avatarUrl) throw new Error("Already up to date");

        const supabase = createClient();

        const data: { full_name?: string; avatar_url?: string } = {};
        if (fullName) data.full_name = fullName;
        if (avatarUrl) data.avatar_url = avatarUrl;

        const { error } = await supabase.from("profiles").update(data).eq(
            "id",
            userId,
        );
        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}
