import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch all folders for a user

export async function fetchFolder({ folderId }: { folderId: string }) {
    const supabase = createClient();

    const { data, error } = await supabase.from("folders").select("*").eq(
        "id",
        folderId,
    );

    if (error) throw error;
    return data;
}

export function useFetchFolder({ folderId }: { folderId: string }) {
    return useQuery({
        queryKey: ["folders"],
        queryFn: () => fetchFolder({ folderId }),
    });
}
