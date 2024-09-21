import { fetchSnippets } from "@/actions/db/snippet.actions";
import { useQuery } from "@tanstack/react-query";

interface FetchSnippetsProps {
    userId: string;
    filterTags?: string[];
    folderIdToSearch?: string;
    showTrash: boolean;
}

export function useFetchSnippets(data: FetchSnippetsProps) {
    return useQuery({
        queryKey: ["snippets"],
        queryFn: async () => {
            return await fetchSnippets(data);
        },
        enabled: !!data.filterTags,
    });
}
