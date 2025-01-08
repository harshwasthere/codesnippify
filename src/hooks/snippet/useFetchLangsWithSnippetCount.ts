import { Language } from "@/types/global.types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch all languages with snippet count for a user
export async function fetchLanguagesWithSnippetCount() {
    const supabase = createClient();

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("User not found");

    const { data, error } = await supabase
        .from("language_counts")
        .select("*")
        .eq("user_id", userId);

    if (error) throw error;
    return data as Language[];
}

export function useFetchLangsWithSnippetCount() {
    return useQuery({
        queryKey: ["languages"],
        queryFn: fetchLanguagesWithSnippetCount,
        refetchOnWindowFocus: false, // Avoid refetching when switching tab
    });
}
