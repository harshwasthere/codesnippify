import { createNewSnippet } from "@/actions/snippet.actions";
import { fetchUser } from "@/actions/user.actions";
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
            const user = await fetchUser();
            if (!user) throw new Error("User not found");
            if ("error" in user) throw new Error(user.error);
            if (!user.id) throw new Error("User not found");
            await createNewSnippet({ userId: user.id, ...data });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet created successfully");
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
