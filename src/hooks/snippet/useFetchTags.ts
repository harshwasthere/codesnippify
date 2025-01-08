import { Tags } from "@/types/global.types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch all tags for a user
export async function fetchTags(): Promise<Tags[]> {
    const supabase = createClient();

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("User not found");

    const { data, error } = await supabase.from("user_tags").select("*").eq("user_id", userId);

    if (error) throw error;
    return data as Tags[];
}

export function useFetchTags() {
    return useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}
