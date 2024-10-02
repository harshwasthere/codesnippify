import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface FetchSharedSnippetsProps {
    showTrash: boolean;
    shareToken: string;
}

// fetch all snippets for a user with optional filters
export async function fetchSharedSnippets({
    shareToken,
    showTrash,
}: {
    shareToken: string;
    showTrash: boolean;
}) {
    const supabase = createClient();

    const { data: folder, error: folderError } = await supabase
        .from("folders")
        .select("id")
        .eq("share_token", shareToken)
        .single()
        .setHeader("share_token", shareToken);

    if (folderError) throw folderError;

    const { data, error } = await supabase
        .rpc("fetch_shared_snippets", {
            _folder_id: folder.id,
            _trash: showTrash,
        })
        .setHeader("share_token", shareToken);

    if (error) throw error;
    return data;
}

export function useFetchSharedSnippets(options: FetchSharedSnippetsProps) {
    return useQuery({
        queryKey: ["sharedSnippets", options.showTrash],
        queryFn: () => fetchSharedSnippets(options),
        refetchOnWindowFocus: false, // Avoid refetching when switching tabs
    });
}
