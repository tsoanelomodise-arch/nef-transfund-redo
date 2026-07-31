export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      career_attachments: {
        Row: {
          career_id: string
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
        }
        Insert: {
          career_id: string
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
        }
        Update: {
          career_id?: string
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_attachments_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "career_attachments_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      careers: {
        Row: {
          apply_url: string | null
          closing_date: string | null
          created_at: string
          created_by: string | null
          department: string | null
          description: string | null
          employment_type: string | null
          id: string
          location: string | null
          priority: number
          publish_date: string
          requirements: string | null
          responsibilities: string | null
          salary_range: string | null
          show_on_archive: boolean
          slug: string
          status: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          apply_url?: string | null
          closing_date?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          priority?: number
          publish_date?: string
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          show_on_archive?: boolean
          slug: string
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          apply_url?: string | null
          closing_date?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          priority?: number
          publish_date?: string
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          show_on_archive?: boolean
          slug?: string
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_media: {
        Row: {
          content_type: string
          created_at: string
          created_by: string | null
          excerpt: string | null
          featured_image_url: string | null
          full_content: string | null
          highlight_on_home: boolean
          id: string
          platform: string | null
          priority: number
          publish_date: string
          show_on_archive: boolean
          show_on_home: boolean
          source: string
          source_url: string | null
          status: string
          story_thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          full_content?: string | null
          highlight_on_home?: boolean
          id?: string
          platform?: string | null
          priority?: number
          publish_date?: string
          show_on_archive?: boolean
          show_on_home?: boolean
          source?: string
          source_url?: string | null
          status?: string
          story_thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          full_content?: string | null
          highlight_on_home?: boolean
          id?: string
          platform?: string | null
          priority?: number
          publish_date?: string
          show_on_archive?: boolean
          show_on_home?: boolean
          source?: string
          source_url?: string | null
          status?: string
          story_thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          system_logo_url: string
          updated_at: string
          youtube_channel_url: string
        }
        Insert: {
          id?: string
          system_logo_url?: string
          updated_at?: string
          youtube_channel_url?: string
        }
        Update: {
          id?: string
          system_logo_url?: string
          updated_at?: string
          youtube_channel_url?: string
        }
        Relationships: []
      }
      test_submissions: {
        Row: {
          category_id: string
          id: string
          notes: string | null
          status: string
          submitted_at: string
          test_case_id: string
          tester_name: string
        }
        Insert: {
          category_id: string
          id?: string
          notes?: string | null
          status: string
          submitted_at?: string
          test_case_id: string
          tester_name: string
        }
        Update: {
          category_id?: string
          id?: string
          notes?: string | null
          status?: string
          submitted_at?: string
          test_case_id?: string
          tester_name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      careers_public: {
        Row: {
          apply_url: string | null
          closing_date: string | null
          created_at: string | null
          department: string | null
          description: string | null
          employment_type: string | null
          id: string | null
          location: string | null
          priority: number | null
          publish_date: string | null
          requirements: string | null
          responsibilities: string | null
          salary_range: string | null
          show_on_archive: boolean | null
          slug: string | null
          status: string | null
          summary: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          apply_url?: string | null
          closing_date?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string | null
          location?: string | null
          priority?: number | null
          publish_date?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          show_on_archive?: boolean | null
          slug?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          apply_url?: string | null
          closing_date?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string | null
          location?: string | null
          priority?: number | null
          publish_date?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          show_on_archive?: boolean | null
          slug?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      news_media_public: {
        Row: {
          content_type: string | null
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          full_content: string | null
          highlight_on_home: boolean | null
          id: string | null
          platform: string | null
          priority: number | null
          publish_date: string | null
          show_on_archive: boolean | null
          show_on_home: boolean | null
          source: string | null
          source_url: string | null
          status: string | null
          story_thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          full_content?: string | null
          highlight_on_home?: boolean | null
          id?: string | null
          platform?: string | null
          priority?: number | null
          publish_date?: string | null
          show_on_archive?: boolean | null
          show_on_home?: boolean | null
          source?: string | null
          source_url?: string | null
          status?: string | null
          story_thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          full_content?: string | null
          highlight_on_home?: boolean | null
          id?: string | null
          platform?: string | null
          priority?: number | null
          publish_date?: string | null
          show_on_archive?: boolean | null
          show_on_home?: boolean | null
          source?: string | null
          source_url?: string | null
          status?: string | null
          story_thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      site_settings_public: {
        Row: {
          id: string | null
          system_logo_url: string | null
          updated_at: string | null
          youtube_channel_url: string | null
        }
        Insert: {
          id?: string | null
          system_logo_url?: string | null
          updated_at?: string | null
          youtube_channel_url?: string | null
        }
        Update: {
          id?: string | null
          system_logo_url?: string | null
          updated_at?: string | null
          youtube_channel_url?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
