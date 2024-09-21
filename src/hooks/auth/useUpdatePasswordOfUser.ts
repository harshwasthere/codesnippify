import { updatePasswordOfUser } from "@/actions/auth.actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUpdatePasswordOfUser() {
    const router = useRouter();
    return useMutation({
        mutationFn: updatePasswordOfUser,
        onSuccess: () => {
            toast.success("Password updated successfully");
            router.push("/login");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
