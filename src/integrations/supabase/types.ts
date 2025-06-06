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
      blog_posts: {
        Row: {
          author_avatar: string | null
          author_bio: string | null
          author_name: string | null
          author_title: string | null
          content: string
          cover_image: string | null
          created_at: string | null
          id: string
          published: boolean | null
          published_date: string
          read_time: number
          summary: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_avatar?: string | null
          author_bio?: string | null
          author_name?: string | null
          author_title?: string | null
          content: string
          cover_image?: string | null
          created_at?: string | null
          id?: string
          published?: boolean | null
          published_date: string
          read_time: number
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_avatar?: string | null
          author_bio?: string | null
          author_name?: string | null
          author_title?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string | null
          id?: string
          published?: boolean | null
          published_date?: string
          read_time?: number
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string | null
          id: string
          logo: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string | null
          degree: string
          description: string
          end_date: string
          id: string
          institution: string
          location: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree: string
          description: string
          end_date: string
          id?: string
          institution: string
          location: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree?: string
          description?: string
          end_date?: string
          id?: string
          institution?: string
          location?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string | null
          description: string
          end_date: string | null
          id: string
          is_currently: boolean | null
          location: string
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description: string
          end_date?: string | null
          id?: string
          is_currently?: boolean | null
          location: string
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string
          end_date?: string | null
          id?: string
          is_currently?: boolean | null
          location?: string
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          campaign_duration: string | null
          campaign_highlights: string[] | null
          campaign_strategy: string | null
          category: Database["public"]["Enums"]["project_category"]
          code_url: string | null
          completion_date: string | null
          conversion: string | null
          created_at: string | null
          demo_url: string | null
          description: string
          engagement_rate: string | null
          id: string
          image: string | null
          images: string[] | null
          reach: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          campaign_duration?: string | null
          campaign_highlights?: string[] | null
          campaign_strategy?: string | null
          category: Database["public"]["Enums"]["project_category"]
          code_url?: string | null
          completion_date?: string | null
          conversion?: string | null
          created_at?: string | null
          demo_url?: string | null
          description: string
          engagement_rate?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          reach?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          campaign_duration?: string | null
          campaign_highlights?: string[] | null
          campaign_strategy?: string | null
          category?: Database["public"]["Enums"]["project_category"]
          code_url?: string | null
          completion_date?: string | null
          conversion?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string
          engagement_rate?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          reach?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at: string | null
          id: string
          name: string
          percentage: number
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          id?: string
          name: string
          percentage: number
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          id?: string
          name?: string
          percentage?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string | null
          icon: string
          id: string
          label: string
          updated_at: string | null
          value: number
        }
        Insert: {
          created_at?: string | null
          icon: string
          id?: string
          label: string
          updated_at?: string | null
          value: number
        }
        Update: {
          created_at?: string | null
          icon?: string
          id?: string
          label?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar: string | null
          company: string
          content: string
          created_at: string | null
          id: string
          name: string
          rating: number
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          company: string
          content: string
          created_at?: string | null
          id?: string
          name: string
          rating: number
          role: string
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          company?: string
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          rating?: number
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_category:
        | "Marketing Campaign"
        | "Automation"
        | "Analytics"
        | "Web Development"
      skill_category: "Management" | "Automation" | "Analytics" | "Technical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      project_category: [
        "Marketing Campaign",
        "Automation",
        "Analytics",
        "Web Development",
      ],
      skill_category: ["Management", "Automation", "Analytics", "Technical"],
    },
  },
} as const
