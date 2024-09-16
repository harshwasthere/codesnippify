import { createSnippet } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { Snippet } from "@/types/global.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateSnippet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSnippet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["snippets"] });
            queryClient.invalidateQueries({ queryKey: ["languages"] });
            toast.success("Snippet created successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
