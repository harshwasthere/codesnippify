import { sendResetPasswordLink } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSendResetPasswordLink() {
    const router = useRouter();
    return useMutation({
        mutationFn: sendResetPasswordLink,
        onSuccess: () => {
            router.push("/login");
            toast.success("Reset password link sent successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
