DROP VIEW IF EXISTS public.site_settings_public;

DROP POLICY IF EXISTS "Admins can read site settings" ON public.site_settings;

CREATE POLICY "Authenticated users can read site settings"
ON public.site_settings FOR SELECT TO authenticated
USING (true);