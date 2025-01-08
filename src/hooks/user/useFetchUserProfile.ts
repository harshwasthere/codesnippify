import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch the profile of the authenticated user
export async function fetchUserProfie() {
    const supabase = createClient();

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("User not found");

    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

    if (error) throw error;
    return data;
}

export function useFetchUserProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchUserProfie,
        refetchOnWindowFocus: false, // Prevent refetching when switching tabs
    });
}
