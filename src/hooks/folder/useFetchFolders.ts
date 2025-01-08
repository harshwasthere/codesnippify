import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch all folders for a user
export async function fetchFolders() {
    const supabase = createClient();

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("User not found");

    const { data, error } = await supabase.from("folders").select("*").eq("user_id", userId);

    if (error) throw error;
    return data;
}

export function useFetchFolders() {
    return useQuery({
        queryKey: ["folders"],
        queryFn: fetchFolders,
    });
}
