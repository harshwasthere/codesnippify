import { deleteFolder } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteFolder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFolder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Folder deleted successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error(errorMessage(error));
        },
    });
}
