import { Database } from "./supabase.types";

export type Folder = Database["public"]["Tables"]["folders"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Snippet = Database["public"]["Tables"]["snippets"]["Row"];

export type FolderInsert = Database["public"]["Tables"]["folders"]["Insert"];
export type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type SnippetInsert = Database["public"]["Tables"]["snippets"]["Insert"];

export type FolderUpdate = Database["public"]["Tables"]["folders"]["Update"];
export type TagUpdate = Database["public"]["Tables"]["tags"]["Update"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export type SnippetUpdate = Database["public"]["Tables"]["snippets"]["Update"];
