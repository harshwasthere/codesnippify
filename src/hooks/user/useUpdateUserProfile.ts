import { fetchUserProfie, updateUserProfile } from "@/app/actions";
import { errorMessage } from "@/lib/utils";
import { deleteImgFromStorage, uploadImgToStorage } from "@/utils/supabase/storage/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export async function updateProfile({
    newName,
    newAvatar,
}: {
    newName: string;
    newAvatar?: File | null;
}) {
    const profile = await fetchUserProfie();

    if (!profile) throw new Error("Profile not found");
    const userId = profile?.id;
    if (!userId) throw new Error("User not found");

    if (newAvatar) {
        if (newAvatar.size > 200 * 1024) throw new Error("Avatar size should be max 200KB");

        const currentAvatarUrl = profile?.avatar_url;
        if (!currentAvatarUrl) throw new Error("Current avatar not found");

        const { image_url: newAvatarUrl, error: uploadError } = await uploadImgToStorage({
            file: newAvatar,
            bucket: "avatars",
            folder: userId,
        });

        if (uploadError) throw uploadError;
        if (!newAvatarUrl) throw new Error("Failed to upload image");

        if (currentAvatarUrl.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`)) {
            const { error: deleteError } = await deleteImgFromStorage(currentAvatarUrl);
            if (deleteError) throw deleteError;
        }

        await updateUserProfile({ newName, newAvatarUrl, userId });
    } else {
        await updateUserProfile({ newName, newAvatarUrl: null, userId });
    }
}

export function useUpdateUserProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error(errorMessage(error));
        },
    });
}
