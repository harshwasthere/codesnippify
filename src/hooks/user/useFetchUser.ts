import { fetchUser } from "@/actions/db/user.actions";
import { useQuery } from "@tanstack/react-query";

export function useFetchUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            return await fetchUser();
        },
    });
}
