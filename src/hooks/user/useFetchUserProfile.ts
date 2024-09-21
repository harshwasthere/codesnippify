import { fetchUserProfie } from "@/actions/db/user.actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserProfile({ userId }: { userId: string }) {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return await fetchUserProfie({ userId });
        },
    });
}
