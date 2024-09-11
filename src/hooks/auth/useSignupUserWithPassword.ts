import { signUpWithPassword } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSignupUserWithPassword() {
    const router = useRouter();
    return useMutation({
        mutationFn: signUpWithPassword,
        onSuccess: () => {
            router.push("/dashboard");
            toast.success("Verification link sent to your email");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
