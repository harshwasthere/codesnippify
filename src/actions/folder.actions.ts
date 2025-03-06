"use server";

import { errorMessage } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

// fetch all folders for a user
export async function fetchFolders({ userId }: { userId: string }) {
    try {
        const supabase = createClient();

        const { data, error } = await supabase.from("folders").select("*").eq(
            "user_id",
            userId,
        );

        if (error) throw error;
        return data;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// create a new folder for a user
export async function createFolder(
    { folderName, userId }: { folderName: string; userId: string },
) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("folders")
            .insert([{ name: folderName, user_id: userId }]);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// update a folder name for a user
export async function updateFolder({
    folderId,
    folderName,
}: {
    folderId: string;
    folderName: string;
}) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("folders")
            .update({ name: folderName })
            .eq("id", folderId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// delete a folder for a user
export async function deleteFolder({ folderId }: { folderId: string }) {
    try {
        const supabase = createClient();

        const { error } = await supabase.from("folders").delete().eq(
            "id",
            folderId,
        );

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

export async function shareFolder({ folderId }: { folderId: string }) {
    try {
        const supabase = createClient();

        const uuid = uuidv4();
        const { error } = await supabase
            .from("folders")
            .update({ share_token: uuid })
            .eq("id", folderId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

export async function unShareFolder({ folderId }: { folderId: string }) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("folders")
            .update({ share_token: null })
            .eq("id", folderId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

export async function fetchFolder({ folderId }: { folderId: string }) {
    try {
        const supabase = createClient();

        const { data, error } = await supabase.from("folders").select("*").eq(
            "id",
            folderId,
        );

        if (error) throw error;
        return data;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}
