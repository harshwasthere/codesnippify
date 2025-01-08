import { addSnippetToFolder } from "@/actions/db/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddSnippetToFolder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addSnippetToFolder,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet added to folder successfully");
        },
        onError: (error: Error) => {
            console.log(error);
            toast.error(errorMessage(error));
        },
    });
}
