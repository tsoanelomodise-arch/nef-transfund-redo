DROP POLICY IF EXISTS "Media is viewable by everyone" ON public.media;
REVOKE ALL ON public.media FROM anon;
CREATE POLICY "Admins can read media" ON public.media FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));