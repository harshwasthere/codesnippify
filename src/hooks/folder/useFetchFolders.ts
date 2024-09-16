import { fetchFolders } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchFolders() {
    return useQuery({
        queryKey: ["folders"],
        queryFn: async () => {
            return await fetchFolders();
        },
    });
}
