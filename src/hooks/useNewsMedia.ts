import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NewsMediaItem, NewsMediaInsert, SiteSettings } from "@/types/news-media";

// Single item hook
export function useNewsMediaItem(id: string) {
  return useQuery({
    queryKey: ["news-media-item", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_media_public" as any)
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .single();
      if (error) throw error;
      return data as unknown as NewsMediaItem;
    },
    enabled: !!id,
  });
}

// Public hooks
export function useNewsHighlights() {
  return useQuery({
    queryKey: ["news-highlights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_media_public" as any)
        .select("*")
        .eq("content_type", "news")
        .eq("status", "approved")
        .eq("show_on_home", true)
        .order("priority", { ascending: false })
        .order("publish_date", { ascending: false })
        .limit(3);
      if (error) throw error;
      return (data ?? []) as unknown as NewsMediaItem[];
    },
  });
}

export function useHighlightedStories() {
  return useQuery({
    queryKey: ["highlighted-stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_media_public" as any)
        .select("*")
        .eq("content_type", "story")
        .eq("status", "approved")
        .eq("highlight_on_home", true)
        .order("priority", { ascending: false })
        .order("publish_date", { ascending: false })
        .limit(3);
      if (error) throw error;
      return (data ?? []) as unknown as NewsMediaItem[];
    },
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      // Settings are readable only by signed-in users; fall back to defaults publicly
      if (error || !data) {
        return {
          id: "",
          system_logo_url: "/images/logo-transformation-fund.jpg",
          youtube_channel_url: "",
          updated_at: new Date().toISOString(),
        } as unknown as SiteSettings;
      }
      return data as unknown as SiteSettings;
    },
  });
}

// Archive page
export function useNewsMediaArchive(filters: {
  contentType?: string;
  page?: number;
  pageSize?: number;
}) {
  const { contentType, page = 1, pageSize = 12 } = filters;
  return useQuery({
    queryKey: ["news-media-archive", contentType, page],
    queryFn: async () => {
      let query = supabase
        .from("news_media_public" as any)
        .select("*", { count: "exact" })
        .eq("status", "approved")
        .eq("show_on_archive", true)
        .order("priority", { ascending: false })
        .order("publish_date", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (contentType && contentType !== "all") {
        query = query.eq("content_type", contentType);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return {
        items: (data ?? []) as unknown as NewsMediaItem[],
        total: count ?? 0,
      };
    },
  });
}

// Admin hooks
export function useNewsMediaAdmin(filters: {
  contentType?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ["news-media-admin", filters.contentType, filters.status],
    queryFn: async () => {
      let query = supabase
        .from("news_media")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.contentType && filters.contentType !== "all") {
        query = query.eq("content_type", filters.contentType);
      }
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as NewsMediaItem[];
    },
  });
}

export function useCreateNewsMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: NewsMediaInsert) => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("news_media")
        .insert({ ...item, created_by: userData.user?.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as NewsMediaItem;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news-media-admin"] });
      qc.invalidateQueries({ queryKey: ["news-highlights"] });
      qc.invalidateQueries({ queryKey: ["highlighted-stories"] });
    },
  });
}

export function useUpdateNewsMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<NewsMediaItem> & { id: string }) => {
      const { data, error } = await supabase
        .from("news_media")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as NewsMediaItem;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news-media-admin"] });
      qc.invalidateQueries({ queryKey: ["news-highlights"] });
      qc.invalidateQueries({ queryKey: ["highlighted-stories"] });
      qc.invalidateQueries({ queryKey: ["news-media-archive"] });
    },
  });
}

export function useDeleteNewsMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news_media").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news-media-admin"] });
      qc.invalidateQueries({ queryKey: ["news-highlights"] });
      qc.invalidateQueries({ queryKey: ["highlighted-stories"] });
      qc.invalidateQueries({ queryKey: ["news-media-archive"] });
    },
  });
}

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<SiteSettings>) => {
      // Get the single settings row
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .limit(1)
        .single();
      if (!existing) throw new Error("No site settings found");

      const { data, error } = await supabase
        .from("site_settings")
        .update(updates as any)
        .eq("id", existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as SiteSettings;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

// Home count helpers for admin
export function useHomeNewsCount() {
  return useQuery({
    queryKey: ["home-news-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("news_media")
        .select("*", { count: "exact", head: true })
        .eq("content_type", "news")
        .eq("show_on_home", true)
        .eq("status", "approved");
      if (error) throw error;
      return count ?? 0;
    },
  });
}

export function useHomeStoriesCount() {
  return useQuery({
    queryKey: ["home-stories-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("news_media")
        .select("*", { count: "exact", head: true })
        .eq("content_type", "story")
        .eq("highlight_on_home", true)
        .eq("status", "approved");
      if (error) throw error;
      return count ?? 0;
    },
  });
}

// Auth hook for admin
export function useAdminAuth() {
  return useQuery({
    queryKey: ["admin-auth"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { isAdmin: false, user: null };

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      return { isAdmin: !!data, user };
    },
    retry: false,
  });
}
