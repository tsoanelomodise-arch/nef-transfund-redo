-- Recreate view WITHOUT security_invoker so public users can read approved content
-- The view itself filters to only approved, published content
DROP VIEW IF EXISTS public.news_media_public;

CREATE VIEW public.news_media_public AS
SELECT
  id,
  content_type,
  source,
  platform,
  source_url,
  title,
  excerpt,
  full_content,
  featured_image_url,
  video_url,
  story_thumbnail_url,
  publish_date,
  status,
  priority,
  show_on_home,
  highlight_on_home,
  show_on_archive,
  created_at,
  updated_at
FROM news_media
WHERE status = 'approved';