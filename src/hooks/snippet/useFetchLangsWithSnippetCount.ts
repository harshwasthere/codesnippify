import { fetchLanguagesWithSnippetCount } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchLangsWithSnippetCount() {
    return useQuery({
        queryKey: ["languages"],
        queryFn: async () => {
            return await fetchLanguagesWithSnippetCount();
        },
    });
}
