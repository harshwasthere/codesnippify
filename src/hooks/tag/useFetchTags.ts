import { fetchTags } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchTags() {
    return useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            return await fetchTags();
        },
    });
}
