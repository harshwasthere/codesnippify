import { signInUserWithOAuth, signUpWithPassword } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignInUserWithOAuth() {
    return useMutation({
        mutationFn: signInUserWithOAuth,
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
