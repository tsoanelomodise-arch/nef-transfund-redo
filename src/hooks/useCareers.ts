import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CareerItem, CareerInsert } from "@/types/careers";

export function useCareerItem(id: string) {
  return useQuery({
    queryKey: ["career-item", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("careers_public" as any)
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as unknown as CareerItem;
    },
    enabled: !!id,
  });
}

export function useCareersArchive(filters: { page?: number; pageSize?: number }) {
  const { page = 1, pageSize = 12 } = filters;
  return useQuery({
    queryKey: ["careers-archive", page],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("careers_public" as any)
        .select("*", { count: "exact" })
        .eq("show_on_archive", true)
        .order("priority", { ascending: false })
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);
      if (error) throw error;
      return {
        items: (data ?? []) as unknown as CareerItem[],
        total: count ?? 0,
      };
    },
  });
}

export function useCareersAdmin(filters: { status?: string }) {
  return useQuery({
    queryKey: ["careers-admin", filters.status],
    queryFn: async () => {
      let query = supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
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
      qc.invalidateQueries({ queryKey: ["careers-archive"] });
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
      qc.invalidateQueries({ queryKey: ["careers-archive"] });
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
      qc.invalidateQueries({ queryKey: ["careers-archive"] });
    },
  });
}
