import { toggleSnippetTrashStatus } from "@/actions/snippet.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleSnippetTrashStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSnippetTrashStatus,
        onSuccess: async (data) => {
            if (data?.error) {
                toast.error(data.error);
                return;
            }

            await queryClient.invalidateQueries({ queryKey: ["folders"] });
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
