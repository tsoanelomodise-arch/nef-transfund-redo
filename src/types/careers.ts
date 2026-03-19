export interface CareerItem {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  summary: string | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  salary_range: string | null;
  location: string | null;
  employment_type: string | null;
  publish_date: string;
  closing_date: string | null;
  apply_url: string | null;
  priority: number;
  show_on_archive: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  created_by?: string | null;
}

export interface CareerInsert {
  title: string;
  slug: string;
  department?: string | null;
  summary?: string | null;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  salary_range?: string | null;
  location?: string | null;
  employment_type?: string | null;
  publish_date?: string;
  closing_date?: string | null;
  apply_url?: string | null;
  priority?: number;
  show_on_archive?: boolean;
  status?: string;
}
