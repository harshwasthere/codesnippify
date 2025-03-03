import { createFolder } from "@/actions/folder.actions";
import { fetchUser } from "@/actions/user.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateFolder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ folderName }: { folderName: string }) => {
            const userId = (await fetchUser())?.id;
            if (!userId) throw new Error("User not found");
            await createFolder({ folderName, userId });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Folder created successfully");
        },
        onError: (error: Error) => {
            console.log(error);
            toast.error(errorMessage(error));
        },
    });
}
