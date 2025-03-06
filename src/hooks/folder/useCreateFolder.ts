import { createFolder } from "@/actions/folder.actions";
import { fetchUser } from "@/actions/user.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateFolder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ folderName }: { folderName: string }) => {
            const user = await fetchUser();
            if (!user) throw new Error("User not found");
            if ("error" in user) throw new Error(user.error);
            if (!user.id) throw new Error("User not found");
            await createFolder({ folderName, userId: user.id });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Folder created successfully");
        },
        onError: (error: Error) => {
            toast.error(errorMessage(error));
        },
    });
}
