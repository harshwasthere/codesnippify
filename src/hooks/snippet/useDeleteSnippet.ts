import { deleteSnippet } from "@/actions/snippet.actions";
import { fetchUser } from "@/actions/user.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteSnippet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (snippetId: string) => {
            const userId = (await fetchUser())?.id;
            if (!userId) throw new Error("User not found");
            await deleteSnippet({ snippetId, userId });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet deleted successfully");
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
