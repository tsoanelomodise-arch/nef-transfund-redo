-- PAGES
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  template text NOT NULL DEFAULT 'standard',
  seo_title text,
  seo_description text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published pages are viewable by everyone" ON public.pages FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- PAGE VERSIONS
CREATE TABLE public.page_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX page_versions_page_status_idx ON public.page_versions (page_id, status);
GRANT SELECT ON public.page_versions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_versions TO authenticated;
GRANT ALL ON public.page_versions TO service_role;
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published versions are viewable by everyone" ON public.page_versions FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins can manage page versions" ON public.page_versions FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- PAGE BLOCKS
CREATE TABLE public.page_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id uuid NOT NULL REFERENCES public.page_versions(id) ON DELETE CASCADE,
  type text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX page_blocks_version_idx ON public.page_blocks (version_id, position);
GRANT SELECT ON public.page_blocks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_blocks TO authenticated;
GRANT ALL ON public.page_blocks TO service_role;
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blocks of published versions are viewable by everyone" ON public.page_blocks FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.page_versions v WHERE v.id = page_blocks.version_id AND v.status = 'published'));
CREATE POLICY "Admins can manage page blocks" ON public.page_blocks FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- NAV ITEMS
CREATE TABLE public.nav_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES public.nav_items(id) ON DELETE CASCADE,
  label text NOT NULL,
  href text,
  document_id uuid,
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.nav_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.nav_items TO authenticated;
GRANT ALL ON public.nav_items TO service_role;
ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visible nav items are viewable by everyone" ON public.nav_items FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can manage nav items" ON public.nav_items FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- DOCUMENTS
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  storage_path text NOT NULL,
  file_type text,
  file_size bigint,
  visible boolean NOT NULL DEFAULT true,
  position integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.documents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visible documents are viewable by everyone" ON public.documents FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can manage documents" ON public.documents FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.nav_items ADD CONSTRAINT nav_items_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE SET NULL;

-- MEDIA
CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  alt_text text,
  file_name text,
  file_size bigint,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT ALL ON public.media TO service_role;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Media is viewable by everyone" ON public.media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage media" ON public.media FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- updated_at triggers
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_versions_updated_at BEFORE UPDATE ON public.page_versions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_blocks_updated_at BEFORE UPDATE ON public.page_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_nav_items_updated_at BEFORE UPDATE ON public.nav_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();