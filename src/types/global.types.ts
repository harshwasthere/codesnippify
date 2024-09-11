import { Database } from "./supabase.types";

export type Folder = Database["public"]["Tables"]["folders"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]