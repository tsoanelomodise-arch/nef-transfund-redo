-- Public read of published careers
DROP POLICY IF EXISTS "Only admins can select from careers" ON public.careers;
CREATE POLICY "Published careers are publicly readable"
ON public.careers FOR SELECT TO anon, authenticated
USING (status = 'published');
CREATE POLICY "Admins can select all careers"
ON public.careers FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
GRANT SELECT ON public.careers TO anon;
GRANT SELECT ON public.careers TO authenticated;

-- Public read of published news_media
DROP POLICY IF EXISTS "Only admins can select from news_media" ON public.news_media;
CREATE POLICY "Published news is publicly readable"
ON public.news_media FOR SELECT TO anon, authenticated
USING (status = 'published');
CREATE POLICY "Admins can select all news_media"
ON public.news_media FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
GRANT SELECT ON public.news_media TO anon;
GRANT SELECT ON public.news_media TO authenticated;