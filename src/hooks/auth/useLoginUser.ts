import { loginUser } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


// login mutation
export function useLoginUser() {
    const router = useRouter();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            router.push("/snippets");
            toast.success("Logged in successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
