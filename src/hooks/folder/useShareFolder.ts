import { shareFolder } from "@/actions/folder.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useShareFolder({ folderId }: { folderId: string }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => shareFolder({ folderId }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
