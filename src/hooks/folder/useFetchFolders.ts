import { fetchFolders } from "@/actions/db/folder.actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchFolders({ userId }: { userId: string }) {
    return useQuery({
        queryKey: ["folders"],
        queryFn: async () => {
            return await fetchFolders({ userId });
        },
    });
}
