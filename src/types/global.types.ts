import { Database } from "./supabase.types";
import { RemoveNull, RemoveNullExcept } from "../lib/utils";

/**
 *  This file contains the types of supabse database tables, views, stored procedures and functions.
 *
 * @type Profile - The type of a profile row in the profiles table.
 * @type Folder - The type of a folder row in the folders table.
 * @type Snippet - The type of a snippet row in the snippets table.
 * @type Tags - The type of a row in the user_tags view.
 * @type Language - The type of a row in the language_counts view.
 * @type FilteredSnippets - The return type of the fetch_snippets_with_tags stored procedure.
 */

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Folder = Database["public"]["Tables"]["folders"]["Row"];
export type Snippet = Database["public"]["Tables"]["snippets"]["Row"];
export type Tags = RemoveNullExcept<Database["public"]["Views"]["user_tags"]["Row"]>;
export type Language = RemoveNull<Database["public"]["Views"]["language_counts"]["Row"]>;

export type FilteredSnippets =
    Database["public"]["Functions"]["fetch_snippets_with_tags"]["Returns"];
