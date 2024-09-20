import { fetchAllSnippets } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

interface FetchSnippetsProps {
    filter_tags?: string[];
    search_folder_id?: string;
    show_trash: boolean;
}

export function useFetchSnippets(data: FetchSnippetsProps) {
    return useQuery({
        queryKey: ["snippets"],
        queryFn: async () => {
            return await fetchAllSnippets(data);
        },
    });
}
