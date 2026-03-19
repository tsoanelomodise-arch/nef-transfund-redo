
-- Generate slugs for existing rows
UPDATE public.careers
SET slug = lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || substr(id::text, 1, 8)
WHERE slug IS NULL;

-- Make slug NOT NULL and UNIQUE
ALTER TABLE public.careers ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.careers ADD CONSTRAINT careers_slug_unique UNIQUE (slug);

-- Recreate careers_public view
DROP VIEW IF EXISTS public.careers_public;
CREATE VIEW public.careers_public WITH (security_invoker = false) AS
SELECT
  id, title, slug, department, summary, description, responsibilities,
  requirements, salary_range, location, employment_type, publish_date,
  closing_date, apply_url, priority, show_on_archive, status, created_at, updated_at
FROM public.careers
WHERE status = 'published';

GRANT SELECT ON public.careers_public TO anon, authenticated;
