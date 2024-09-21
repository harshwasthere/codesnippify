import { fetchLanguagesWithSnippetCount } from "@/actions/db/snippet.actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchLangsWithSnippetCount({ userId }: { userId: string }) {
    return useQuery({
        queryKey: ["languages"],
        queryFn: async () => {
            return await fetchLanguagesWithSnippetCount({ userId });
        },
    });
}
