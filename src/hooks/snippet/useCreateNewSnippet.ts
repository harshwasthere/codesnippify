import { createNewSnippet } from "@/actions/db/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateNewSnippet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNewSnippet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["snippets"] });
            queryClient.invalidateQueries({ queryKey: ["languages"] });
            queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet created successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
