import { deleteFolder } from "@/actions/folder.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteFolder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFolder,
        onSuccess: async (data) => {
            if (data?.error) {
                toast.error(data.error);
                return;
            }

            await queryClient.invalidateQueries({ queryKey: ["folders"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            toast.success("Folder deleted successfully");
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
