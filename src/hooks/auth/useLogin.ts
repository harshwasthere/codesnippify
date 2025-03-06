import { loginUser } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogin() {
    const router = useRouter();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
                return;
            }

            router.push("/snippets");
            toast.success("Logged in successfully");
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
