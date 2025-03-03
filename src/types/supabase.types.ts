export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      folders: {
        Row: {
          created_at: string
          id: string
          name: string
          share_token: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          share_token?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          share_token?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          created_at: string
          email: string
          full_name: string | null
          id: string
          subscription_status: Database["public"]["Enums"]["subscription_status_enum"]
          total_snippets: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          subscription_status?: Database["public"]["Enums"]["subscription_status_enum"]
          total_snippets?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          subscription_status?: Database["public"]["Enums"]["subscription_status_enum"]
          total_snippets?: number
          updated_at?: string
        }
        Relationships: []
      }
      snippet_tags: {
        Row: {
          snippet_id: string
          tag_id: string
          user_id: string
        }
        Insert: {
          snippet_id: string
          tag_id: string
          user_id: string
        }
        Update: {
          snippet_id?: string
          tag_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippet_tags_snippet_id_fkey"
            columns: ["snippet_id"]
            isOneToOne: false
            referencedRelation: "snippets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snippet_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snippet_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "user_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      snippets: {
        Row: {
          code: string
          created_at: string
          description: string | null
          favorite: boolean
          folder_id: string | null
          id: string
          language: string
          title: string
          trash: boolean
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          favorite?: boolean
          folder_id?: string | null
          id?: string
          language: string
          title: string
          trash?: boolean
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          favorite?: boolean
          folder_id?: string | null
          id?: string
          language?: string
          title?: string
          trash?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippets_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      language_counts: {
        Row: {
          language: string | null
          snippet_count: number | null
          user_id: string | null
        }
        Relationships: []
      }
      user_tags: {
        Row: {
          id: string | null
          name: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_snippet_with_tags: {
        Args: {
          p_user_id: string
          p_title: string
          p_language: string
          p_code: string
          p_tags: string[]
          p_description?: string
        }
        Returns: string
      }
      delete_snippet_with_tags: {
        Args: {
          p_snippet_id: string
          p_user_id: string
        }
        Returns: undefined
      }
      fetch_shared_snippets: {
        Args: {
          _folder_id: string
          _trash?: boolean
        }
        Returns: {
          snippet_id: string
          title: string
          description: string
          language: string
          code: string
          favorite: boolean
          trash: boolean
          created_at: string
          folder_name: string
          tags: string[]
        }[]
      }
      fetch_snippets_with_tags: {
        Args: {
          _user_id: string
          _folder_id?: string
          _trash?: boolean
          _tags?: string[]
        }
        Returns: {
          snippet_id: string
          title: string
          description: string
          language: string
          code: string
          favorite: boolean
          trash: boolean
          created_at: string
          folder_name: string
          tags: string[]
        }[]
      }
      get_user_tags: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
        }[]
      }
      update_snippet_with_tags: {
        Args: {
          p_snippet_id: string
          p_user_id: string
          p_title: string
          p_language: string
          p_code: string
          p_tags: string[]
          p_description?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      subscription_status_enum: "free" | "pro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
