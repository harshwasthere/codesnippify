import { toggleSnippetTrashStatus } from "@/actions/db/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleSnippetTrashStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSnippetTrashStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["snippets"] });
            queryClient.invalidateQueries({ queryKey: ["languages"] });
            queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Snippet moved to trash!");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
