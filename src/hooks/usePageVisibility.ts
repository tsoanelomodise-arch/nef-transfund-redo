import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export interface PageVisibilityRow {
  id: string;
  route: string;
  label: string;
  hidden: boolean;
}

/** All visibility rows (public read — the site needs them to hide pages). */
export function usePageVisibility() {
  return useQuery({
    queryKey: ["page-visibility"],
    queryFn: async () => {
      const { data, error } = await db.from("page_visibility").select("id, route, label, hidden");
      if (error) throw error;
      return (data ?? []) as PageVisibilityRow[];
    },
    staleTime: 60_000,
  });
}

/** Just the routes currently hidden from visitors. */
export function useHiddenRoutes() {
  const { data, isLoading } = usePageVisibility();
  return { hiddenRoutes: (data ?? []).filter((r) => r.hidden).map((r) => r.route), isLoading };
}

export function useSetPageHidden() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ route, label, hidden }: { route: string; label: string; hidden: boolean }) => {
      const { error } = await db
        .from("page_visibility")
        .upsert({ route, label, hidden }, { onConflict: "route" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["page-visibility"] }),
  });
}
