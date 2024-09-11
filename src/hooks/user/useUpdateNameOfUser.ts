import { updateNameOfUser } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUpdateNameOfUser() {
    const router = useRouter();
    return useMutation({
        mutationFn: updateNameOfUser,
        onSuccess: () => {
            toast.success("Name updated successfully");
            router.push("/dashboard");
        },
        onError: (error) => {
            console.error(error);
            toast.error(errorMessage(error));
        },
    });
}
