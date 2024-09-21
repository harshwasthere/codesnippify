import { toggleSnippetFavoriteStatus } from "@/actions/db/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleSnippetFavoriteStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSnippetFavoriteStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["snippets"] });
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
