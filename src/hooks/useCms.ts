import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CmsPage, CmsPageVersion, CmsBlock, NavItem, CmsDocument, BlockType } from "@/types/cms";

const db = supabase as any;

/* ---------------- Public ---------------- */

export function usePublishedPage(slug?: string) {
  return useQuery({
    queryKey: ["cms-page", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data: page, error } = await db
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!page) return null;

      const { data: version } = await db
        .from("page_versions")
        .select("id")
        .eq("page_id", page.id)
        .eq("status", "published")
        .maybeSingle();

      let blocks: CmsBlock[] = [];
      if (version) {
        const { data: b } = await db
          .from("page_blocks")
          .select("*")
          .eq("version_id", version.id)
          .order("position", { ascending: true });
        blocks = (b ?? []) as CmsBlock[];
      }
      return { page: page as CmsPage, blocks };
    },
  });
}

export function useNavItems() {
  return useQuery({
    queryKey: ["cms-nav"],
    queryFn: async () => {
      const { data, error } = await db
        .from("nav_items")
        .select("*")
        .order("position", { ascending: true });
      if (error) throw error;
      return (data ?? []) as NavItem[];
    },
  });
}

export function useDocuments(onlyVisible = true) {
  return useQuery({
    queryKey: ["cms-documents", onlyVisible],
    queryFn: async () => {
      let q = db.from("documents").select("*").order("position", { ascending: true });
      if (onlyVisible) q = q.eq("visible", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as CmsDocument[];
    },
  });
}

export function documentUrl(storagePath: string) {
  const { data } = supabase.storage.from("site-documents").getPublicUrl(storagePath);
  return data.publicUrl;
}

export async function signedDocumentUrl(storagePath: string) {
  const { data } = await supabase.storage.from("site-documents").createSignedUrl(storagePath, 60 * 60);
  return data?.signedUrl ?? "";
}

/* ---------------- Admin: pages ---------------- */

export function useAdminPages() {
  return useQuery({
    queryKey: ["cms-admin-pages"],
    queryFn: async () => {
      const { data, error } = await db.from("pages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CmsPage[];
    },
  });
}

export function useAdminPage(pageId?: string) {
  return useQuery({
    queryKey: ["cms-admin-page", pageId],
    enabled: !!pageId,
    queryFn: async () => {
      const { data: page, error } = await db.from("pages").select("*").eq("id", pageId).single();
      if (error) throw error;

      let { data: version } = await db
        .from("page_versions")
        .select("*")
        .eq("page_id", pageId)
        .eq("status", "draft")
        .maybeSingle();

      if (!version) {
        const { data: created, error: cErr } = await db
          .from("page_versions")
          .insert({ page_id: pageId, status: "draft" })
          .select()
          .single();
        if (cErr) throw cErr;
        version = created;
      }

      const { data: blocks } = await db
        .from("page_blocks")
        .select("*")
        .eq("version_id", version.id)
        .order("position", { ascending: true });

      return {
        page: page as CmsPage,
        version: version as CmsPageVersion,
        blocks: (blocks ?? []) as CmsBlock[],
      };
    },
  });
}

export function useCreatePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { slug: string; title: string; template?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await db
        .from("pages")
        .insert({ ...input, template: input.template ?? "standard", created_by: userData.user?.id })
        .select()
        .single();
      if (error) throw error;
      await db.from("page_versions").insert({ page_id: data.id, status: "draft" });
      return data as CmsPage;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-admin-pages"] }),
  });
}

export function useUpdatePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CmsPage> & { id: string }) => {
      const { data, error } = await db.from("pages").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data as CmsPage;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ["cms-admin-pages"] });
      qc.invalidateQueries({ queryKey: ["cms-admin-page", v.id] });
    },
  });
}

export function useDeletePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-admin-pages"] }),
  });
}

/* ---------------- Admin: blocks ---------------- */

export function useSaveBlocks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ versionId, blocks }: { versionId: string; blocks: CmsBlock[] }) => {
      await db.from("page_blocks").delete().eq("version_id", versionId);
      if (blocks.length) {
        const rows = blocks.map((b, i) => ({
          version_id: versionId,
          type: b.type,
          position: i,
          data: b.data,
        }));
        const { error } = await db.from("page_blocks").insert(rows);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-admin-page"] }),
  });
}

export function usePublishPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ pageId, draftVersionId }: { pageId: string; draftVersionId: string }) => {
      const { data: draftBlocks } = await db
        .from("page_blocks")
        .select("type, position, data")
        .eq("version_id", draftVersionId)
        .order("position", { ascending: true });

      const { data: existing } = await db
        .from("page_versions")
        .select("id")
        .eq("page_id", pageId)
        .eq("status", "published")
        .maybeSingle();

      let publishedId = existing?.id;
      if (publishedId) {
        await db.from("page_blocks").delete().eq("version_id", publishedId);
      } else {
        const { data: created, error } = await db
          .from("page_versions")
          .insert({ page_id: pageId, status: "published" })
          .select()
          .single();
        if (error) throw error;
        publishedId = created.id;
      }

      if (draftBlocks?.length) {
        const rows = draftBlocks.map((b: any) => ({ ...b, version_id: publishedId }));
        const { error } = await db.from("page_blocks").insert(rows);
        if (error) throw error;
      }

      const { error: pErr } = await db
        .from("pages")
        .update({ status: "published", published_at: new Date().toISOString() })
        .eq("id", pageId);
      if (pErr) throw pErr;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-admin-pages"] });
      qc.invalidateQueries({ queryKey: ["cms-admin-page"] });
      qc.invalidateQueries({ queryKey: ["cms-page"] });
    },
  });
}

export function useUnpublishPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pageId: string) => {
      const { error } = await db.from("pages").update({ status: "draft" }).eq("id", pageId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-admin-pages"] });
      qc.invalidateQueries({ queryKey: ["cms-admin-page"] });
    },
  });
}

/* ---------------- Admin: navigation ---------------- */

export function useSaveNavItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Partial<NavItem>) => {
      if (item.id) {
        const { id, ...updates } = item;
        const { error } = await db.from("nav_items").update(updates).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await db.from("nav_items").insert(item);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-nav"] }),
  });
}

export function useDeleteNavItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("nav_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-nav"] }),
  });
}

/* ---------------- Admin: documents ---------------- */

export function useSaveDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (doc: Partial<CmsDocument>) => {
      if (doc.id) {
        const { id, ...updates } = doc;
        const { error } = await db.from("documents").update(updates).eq("id", id);
        if (error) throw error;
      } else {
        const { data: userData } = await supabase.auth.getUser();
        const { error } = await db.from("documents").insert({ ...doc, created_by: userData.user?.id });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-documents"] }),
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (doc: CmsDocument) => {
      await supabase.storage.from("site-documents").remove([doc.storage_path]);
      const { error } = await db.from("documents").delete().eq("id", doc.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-documents"] }),
  });
}

export const NEW_BLOCK = (type: BlockType, data: Record<string, any>): CmsBlock => ({
  id: `tmp-${Math.random().toString(36).slice(2)}`,
  version_id: "",
  type,
  position: 0,
  data,
});
