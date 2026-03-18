export interface CareerItem {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  employment_type: string | null;
  closing_date: string | null;
  status: 'draft' | 'approved' | 'rejected';
  priority: number;
  show_on_archive: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
}

export interface CareerInsert {
  title: string;
  description?: string | null;
  location?: string | null;
  employment_type?: string | null;
  closing_date?: string | null;
  status?: string;
  priority?: number;
  show_on_archive?: boolean;
}
