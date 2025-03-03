import {
    fetchUser,
    fetchUserProfie,
    updateUserProfile,
} from "@/actions/user.actions";
import { errorMessage } from "@/lib/utils";
import {
    deleteImgFromStorage,
    uploadImgToStorage,
} from "@/utils/supabase/storage/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export async function updateProfile({
    newName,
    newAvatar,
}: {
    newName: string;
    newAvatar?: File | null;
}) {
    const userId = (await fetchUser())?.id;
    if (!userId) throw new Error("User not found");

    const profile = await fetchUserProfie({ userId });
    if (!profile) throw new Error("Profile not found");

    // if newAvatar is provided then update the avatar where we will first upload the new avatar to the storage and then update the profile with the new avatar url and then delete the old avatar from the storage
    if (newAvatar) {
        if (newAvatar.size > 200 * 1024) {
            throw new Error("Avatar size should be less than 200KB");
        }

        const currentAvatarUrl = profile?.avatar_url;
        if (!currentAvatarUrl) throw new Error("Current avatar not found");

        const { image_url: newAvatarUrl, error: uploadError } =
            await uploadImgToStorage({
                file: newAvatar,
                bucket: "avatars",
                folder: userId,
            });

        if (uploadError) throw uploadError;
        if (!newAvatarUrl) throw new Error("Failed to upload image");

        await updateUserProfile({
            fullName: newName,
            avatarUrl: newAvatarUrl,
            userId,
        });

        if (
            currentAvatarUrl.startsWith(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
            )
        ) {
            const { error: deleteError } = await deleteImgFromStorage(
                currentAvatarUrl,
            );
            if (deleteError) throw deleteError;
        }
    } else {
        await updateUserProfile({ fullName: newName, userId });
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
