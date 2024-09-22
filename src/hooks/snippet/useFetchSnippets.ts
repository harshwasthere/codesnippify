import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface FetchSnippetsProps {
    filterTags: string[];
    folderIdToSearch?: string;
    showTrash: boolean;
    hasHydrated: boolean;
}

// fetch all snippets for a user with optional filters
export async function fetchSnippets({
    filterTags,
    folderIdToSearch,
    showTrash,
}: {
    filterTags: string[];
    folderIdToSearch?: string;
    showTrash: boolean;
}) {
    console.log("fetching snippets", filterTags, folderIdToSearch, showTrash);
    const currTime = Date.now();
    console.log(currTime);
    const supabase = createClient();

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("User not found");

    const { data, error } = await supabase.rpc("fetch_snippets_with_tags", {
        _user_id: userId,
        _tags: filterTags.length > 0 ? filterTags : undefined,
        _folder_id: folderIdToSearch,
        _trash: showTrash,
    });

    if (error) throw error;
    console.log("returned data", data);
    console.log(Date.now(), Date.now() - currTime);
    return data;
}

export function useFetchSnippets(options: FetchSnippetsProps) {
    return useQuery({
        queryKey: ["snippets", options.filterTags, options.folderIdToSearch, options.showTrash],
        queryFn: () => fetchSnippets(options),
        enabled: options.hasHydrated,
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
}
