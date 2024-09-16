import { createFolder } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateFolder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFolder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Folder created successfully");
        },
        onError: (error: Error) => {
            console.log(error);
            toast.error(errorMessage(error));
        },
    });
}
