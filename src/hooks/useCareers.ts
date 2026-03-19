import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CareerItem, CareerInsert } from "@/types/careers";

// ─── Public hooks ───

export function useCareersListing(filters?: {
  search?: string;
  location?: string;
  department?: string;
  employmentType?: string;
}) {
  return useQuery({
    queryKey: ["careers-listing", filters],
    queryFn: async () => {
      let query = supabase
        .from("careers_public" as any)
        .select("*")
        .order("publish_date", { ascending: false });

      if (filters?.location) query = query.eq("location", filters.location);
      if (filters?.department) query = query.eq("department", filters.department);
      if (filters?.employmentType) query = query.eq("employment_type", filters.employmentType);
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as CareerItem[];
    },
  });
}

export function useCareerBySlug(slug: string) {
  return useQuery({
    queryKey: ["career-detail", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("careers_public" as any)
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data as unknown as CareerItem;
    },
    enabled: !!slug,
  });
}

// ─── Admin hooks ───

export function useCareersAdmin(filters?: {
  status?: string;
  department?: string;
}) {
  return useQuery({
    queryKey: ["careers-admin", filters?.status, filters?.department],
    queryFn: async () => {
      let query = supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters?.department && filters.department !== "all") {
        query = query.eq("department", filters.department);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as CareerItem[];
    },
  });
}

export function useCreateCareer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: CareerInsert) => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("careers")
        .insert({ ...item, created_by: userData.user?.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as CareerItem;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careers-admin"] });
      qc.invalidateQueries({ queryKey: ["careers-listing"] });
    },
  });
}

export function useUpdateCareer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CareerItem> & { id: string }) => {
      const { data, error } = await supabase
        .from("careers")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as CareerItem;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careers-admin"] });
      qc.invalidateQueries({ queryKey: ["careers-listing"] });
      qc.invalidateQueries({ queryKey: ["career-detail"] });
    },
  });
}

export function useDeleteCareer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("careers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careers-admin"] });
      qc.invalidateQueries({ queryKey: ["careers-listing"] });
    },
  });
}
