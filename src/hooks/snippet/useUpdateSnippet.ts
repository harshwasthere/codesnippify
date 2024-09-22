import { updateSnippet } from "@/actions/db/snippet.actions";
import { fetchUser } from "@/actions/db/user.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdateSnippetProps {
    snippetId: string;
    title: string;
    description?: string;
    language: string;
    code: string;
    tags: string[];
}

export function useUpdateSnippet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateSnippetProps) => {
            const userId = (await fetchUser())?.id;
            if (!userId) throw new Error("User not found");
            await updateSnippet({ userId, ...data });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet updated successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
