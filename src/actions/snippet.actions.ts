"use server";

import { createClient } from "@/utils/supabase/server";
import { Language, Tags } from "@/types/common.types";
import { errorMessage } from "@/lib/utils";

// fetch all snippets for a user with optional filters
export async function fetchSnippets({
    userId,
    filterTags,
    folderIdToSearch,
    showTrash,
}: {
    userId: string;
    filterTags: string[];
    folderIdToSearch?: string;
    showTrash: boolean;
}) {
    try {
        const supabase = createClient();

        const { data, error } = await supabase.rpc("fetch_snippets_with_tags", {
            _user_id: userId,
            _tags: filterTags.length > 0 ? filterTags : undefined,
            _folder_id: folderIdToSearch,
            _trash: showTrash,
        });

        if (error) throw error;
        return data;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// create a new snippet for a user
export async function createNewSnippet({
    userId,
    title,
    tags,
    description,
    language,
    code,
}: {
    userId: string;
    title: string;
    tags: string[];
    description?: string;
    language: string;
    code: string;
}) {
    try {
        const supabase = createClient();

        const { error } = await supabase.rpc("create_snippet_with_tags", {
            p_user_id: userId,
            p_title: title,
            p_description: description,
            p_language: language,
            p_code: code,
            p_tags: tags,
        });

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// update a snippet for a user
export async function updateSnippet({
    userId,
    snippetId,
    title,
    description,
    language,
    code,
    tags,
}: {
    userId: string;
    snippetId: string;
    title: string;
    description?: string;
    language: string;
    code: string;
    tags: string[];
}) {
    try {
        const supabase = createClient();

        const { error } = await supabase.rpc("update_snippet_with_tags", {
            p_user_id: userId,
            p_snippet_id: snippetId,
            p_title: title,
            p_description: description,
            p_language: language,
            p_code: code,
            p_tags: tags,
        });

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// delete a snippet for a user
export async function deleteSnippet(
    { snippetId, userId }: { snippetId: string; userId: string },
) {
    try {
        const supabase = createClient();

        const { error } = await supabase.rpc("delete_snippet_with_tags", {
            p_user_id: userId,
            p_snippet_id: snippetId,
        });

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// toggle favorite status of a snippet for a user (favorite/unfavorite)
export async function toggleSnippetFavoriteStatus({
    snippetId,
    currentFavoriteStatus,
}: {
    snippetId: string;
    currentFavoriteStatus: boolean;
}) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("snippets")
            .update({ favorite: !currentFavoriteStatus })
            .eq("id", snippetId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// toggle trash status of a snippet for a user (trash/restore)
export async function toggleSnippetTrashStatus({
    snippetId,
    currentTrashStatus,
}: {
    snippetId: string;
    currentTrashStatus: boolean;
}) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("snippets")
            .update({ trash: !currentTrashStatus })
            .eq("id", snippetId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

export async function addSnippetToFolder({
    snippetId,
    folderId,
}: {
    snippetId: string;
    folderId: string | null;
}) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("snippets")
            .update({ folder_id: folderId })
            .eq("id", snippetId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

export async function removeSnippetFromFolder(
    { snippetId }: { snippetId: string },
) {
    try {
        const supabase = createClient();

        const { error } = await supabase
            .from("snippets")
            .update({ folder_id: null })
            .eq("id", snippetId);

        if (error) throw error;
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// fetch all languages with snippet count for a user
export async function fetchLanguagesWithSnippetCount(
    { userId }: { userId: string },
) {
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from("language_counts")
            .select("*")
            .eq("user_id", userId);

        if (error) throw error;
        return data as Language[];
    } catch (error) {
        return { error: errorMessage(error) };
    }
}

// fetch all tags for a user
export async function fetchTags(
    { userId }: { userId: string },
): Promise<Tags[] | { error: string }> {
    try {
        const supabase = createClient();

        const { data, error } = await supabase.from("user_tags").select("*").eq(
            "user_id",
            userId,
        );

        if (error) throw error;
        return data as Tags[];
    } catch (error) {
        return { error: errorMessage(error) };
    }
}
