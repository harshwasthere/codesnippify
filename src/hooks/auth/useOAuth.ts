import { authenticateWithOAuth } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useOAuth() {
    return useMutation({
        mutationFn: authenticateWithOAuth,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
                return;
            }
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
