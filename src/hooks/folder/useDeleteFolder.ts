import { deleteFolder } from "@/actions/db/folder.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteFolder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFolder,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
            await queryClient.invalidateQueries({ queryKey: ["languages"] });
            await queryClient.invalidateQueries({ queryKey: ["tags"] });
            await queryClient.invalidateQueries({ queryKey: ["snippets"] });
            toast.success("Folder deleted successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error(errorMessage(error));
        },
    });
}
