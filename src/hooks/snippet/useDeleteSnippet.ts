import { deleteSnippet } from "@/actions/db/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteSnippet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSnippet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["snippets"] });
            queryClient.invalidateQueries({ queryKey: ["languages"] });
            queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
