import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch the authenticated user from supabase
export async function fetchUser() {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    return user;
}

export function useFetchUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });
}
