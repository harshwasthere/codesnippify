import { useRouter } from "next/navigation";
import { errorMessage } from "@/lib/utils";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/actions/auth.actions";

export function useLogout() {
    const router = useRouter();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
                return;
            }

            router.push("/");
            toast.success("Logged out successfully");
        },
        onError: (error) => {
            toast.error(errorMessage(error));
        },
    });
}
