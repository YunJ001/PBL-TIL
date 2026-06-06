export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
          id: string;
          name: string;
          part: string;
          skills: string[] | null;
          intro: string | null;
          bio: string | null;
          email: string | null;
          phone: string | null;
          website: string | null;
          motto: string | null;
          image: string | null;
          is_me: boolean;
          created_at: string;
        };
        Insert: {
          id?: string | undefined;
          name: string;
          part: string;
          skills?: string[] | null | undefined;
          intro?: string | null | undefined;
          bio?: string | null | undefined;
          email?: string | null | undefined;
          phone?: string | null | undefined;
          website?: string | null | undefined;
          motto?: string | null | undefined;
          image?: string | null | undefined;
          is_me?: boolean | undefined;
          created_at?: string | undefined;
        };
        Update: {
          id?: string | undefined;
          name?: string | undefined;
          part?: string | undefined;
          skills?: string[] | null | undefined;
          intro?: string | null | undefined;
          bio?: string | null | undefined;
          email?: string | null | undefined;
          phone?: string | null | undefined;
          website?: string | null | undefined;
          motto?: string | null | undefined;
          image?: string | null | undefined;
          is_me?: boolean | undefined;
          created_at?: string | undefined;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}