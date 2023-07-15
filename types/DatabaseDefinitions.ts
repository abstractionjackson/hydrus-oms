export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      iop_reading: {
        Row: {
          date: string
          id: number
          mmHG: number
          patient_id: number
        }
        Insert: {
          date: string
          id?: number
          mmHG: number
          patient_id: number
        }
        Update: {
          date?: string
          id?: number
          mmHG?: number
          patient_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "iop_reading_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient"
            referencedColumns: ["id"]
          }
        ]
      }
      iop_readings: {
        Row: {
          date: string
          id: string
          mmhg: number
          patient_id: string
        }
        Insert: {
          date: string
          id?: string
          mmhg: number
          patient_id: string
        }
        Update: {
          date?: string
          id?: string
          mmhg?: number
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "iop_readings_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      medication_reading: {
        Row: {
          date: string
          id: number
          patient_id: number
          quantity: number
        }
        Insert: {
          date: string
          id?: number
          patient_id: number
          quantity: number
        }
        Update: {
          date?: string
          id?: number
          patient_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "medication_reading_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient"
            referencedColumns: ["id"]
          }
        ]
      }
      medication_readings: {
        Row: {
          date: string
          id: string
          patient_id: string
          quantity: number
        }
        Insert: {
          date: string
          id?: string
          patient_id: string
          quantity: number
        }
        Update: {
          date?: string
          id?: string
          patient_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "medication_readings_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      patient: {
        Row: {
          created_at: string
          dob: string
          id: number
          name_first: string
          name_last: string
          od_os: string[]
          operation_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dob: string
          id?: number
          name_first: string
          name_last: string
          od_os: string[]
          operation_date: string
          user_id?: string
        }
        Update: {
          created_at?: string
          dob?: string
          id?: number
          name_first?: string
          name_last?: string
          od_os?: string[]
          operation_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      patients: {
        Row: {
          dob: string
          id: string
          name_first: string
          name_last: string
          operation_date: string
          user_id: string
        }
        Insert: {
          dob: string
          id?: string
          name_first: string
          name_last: string
          operation_date: string
          user_id: string
        }
        Update: {
          dob?: string
          id?: string
          name_first?: string
          name_last?: string
          operation_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reading: {
        Row: {
          created_at: string
          date: string
          id: number
          iop: number
          medication: number
          patient: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          iop: number
          medication: number
          patient: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          iop?: number
          medication?: number
          patient?: number
        }
        Relationships: [
          {
            foreignKeyName: "reading_patient_fkey"
            columns: ["patient"]
            referencedRelation: "patient"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_text_value: {
        Args: {
          text_column: string
        }
        Returns: string
      }
      my_func: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

