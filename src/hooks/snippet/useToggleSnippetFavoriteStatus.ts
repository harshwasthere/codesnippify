import { toggleSnippetFavoriteStatus } from "@/actions/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleSnippetFavoriteStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSnippetFavoriteStatus,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
