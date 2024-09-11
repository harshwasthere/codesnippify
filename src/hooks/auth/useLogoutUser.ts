import { logoutUser } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogoutUser() {
    const router = useRouter();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            router.push("/");
            toast.success("Logged out successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
