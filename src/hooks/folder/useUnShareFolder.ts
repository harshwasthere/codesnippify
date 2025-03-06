import { unShareFolder } from "@/actions/folder.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUnshareFolder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: unShareFolder,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
