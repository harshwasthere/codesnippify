import { authenticateWithOAuth } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignInUserWithOAuth() {
    return useMutation({
        mutationFn: authenticateWithOAuth,
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
