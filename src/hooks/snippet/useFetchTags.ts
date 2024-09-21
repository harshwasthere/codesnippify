import { fetchTags } from "@/actions/db/snippet.actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchTags({ userId }: { userId: string }) {
    return useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            return await fetchTags({ userId });
        },
    });
}
