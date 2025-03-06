import { signupUser } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSignup() {
    const router = useRouter();
    return useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
                return;
            }

            router.push("/login");
            toast.success("Verification link sent to your email");
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
