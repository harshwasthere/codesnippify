import { createNewSnippet } from "@/actions/db/snippet.actions";
import { fetchUser } from "@/actions/db/user.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CreateNewSnippetProps {
    title: string;
    tags: string[];
    description?: string;
    language: string;
    code: string;
}

export function useCreateNewSnippet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateNewSnippetProps) => {
            const userId = (await fetchUser())?.id;
            if (!userId) throw new Error("User not found");
            await createNewSnippet({ userId, ...data });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet created successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
