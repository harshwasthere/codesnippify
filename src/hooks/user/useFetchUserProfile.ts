import { fetchUserProfie } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return await fetchUserProfie();
        },
    });
}
