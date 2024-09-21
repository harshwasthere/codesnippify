"use server";

import { createClient } from "@/utils/supabase/server";

// fetch all folders for a user
export async function fetchFolders({ userId }: { userId: string }) {
    const supabase = createClient();

    const { data, error } = await supabase.from("folders").select("*").eq("user_id", userId);

    if (error) throw error;
    return data;
}

// create a new folder for a user
export async function createFolder({ folderName, userId }: { folderName: string; userId: string }) {
    const supabase = createClient();

    const { error } = await supabase
        .from("folders")
        .insert([{ name: folderName, user_id: userId }]);

    if (error) throw error;
}

// update a folder name for a user
export async function updateFolder({
    folderId,
    folderName,
}: {
    folderId: string;
    folderName: string;
}) {
    const supabase = createClient();

    const { error } = await supabase
        .from("folders")
        .update({ name: folderName })
        .eq("id", folderId);

    if (error) throw error;
}

// delete a folder for a user
export async function deleteFolder({ folderId }: { folderId: string }) {
    const supabase = createClient();

    const { error } = await supabase.from("folders").delete().eq("id", folderId);

    if (error) throw error;
}
