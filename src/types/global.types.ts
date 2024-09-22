import { Database } from "./supabase.types";
import { RemoveNull, RemoveNullExcept } from "../lib/utils";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Folder = Database["public"]["Tables"]["folders"]["Row"];
export type Snippet = Database["public"]["Tables"]["snippets"]["Row"];
export type Tags = RemoveNullExcept<Database["public"]["Views"]["user_tags"]["Row"]>;
export type Language = RemoveNull<Database["public"]["Views"]["language_counts"]["Row"]>;

export type FilteredSnippets =
    Database["public"]["Functions"]["fetch_snippets_with_tags"]["Returns"];
