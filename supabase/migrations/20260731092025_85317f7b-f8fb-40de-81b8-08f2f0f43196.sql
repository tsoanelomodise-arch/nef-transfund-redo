-- 1. test_submissions
DROP POLICY IF EXISTS "Anyone can read test submissions" ON public.test_submissions;
DROP POLICY IF EXISTS "Anyone can insert test submissions" ON public.test_submissions;

CREATE POLICY "Authenticated users can read test submissions"
ON public.test_submissions FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Validated test submissions can be inserted"
ON public.test_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
  status IN ('pass','fail','pending','blocked','skipped')
  AND char_length(tester_name) BETWEEN 1 AND 100
  AND char_length(test_case_id) BETWEEN 1 AND 100
  AND char_length(category_id) BETWEEN 1 AND 100
  AND char_length(COALESCE(notes,'')) <= 2000
);

-- 2. site_settings: restrict base table, expose safe public view
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;

CREATE POLICY "Admins can read site settings"
ON public.site_settings FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE VIEW public.site_settings_public
WITH (security_invoker = false) AS
  SELECT id, system_logo_url, youtube_channel_url, updated_at
  FROM public.site_settings;

GRANT SELECT ON public.site_settings_public TO anon, authenticated;

-- 3. career_attachments: only for published careers
DROP POLICY IF EXISTS "Public can read career attachments" ON public.career_attachments;

CREATE POLICY "Attachments of published careers are readable"
ON public.career_attachments FOR SELECT TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.careers c
    WHERE c.id = career_attachments.career_id
      AND c.status = 'published'
  )
);

-- 4. storage policies: remove blanket listing/read
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public read career attachments" ON storage.objects;

CREATE POLICY "Read attachments of published careers"
ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'career-attachments'
  AND EXISTS (
    SELECT 1 FROM public.careers c
    WHERE c.status = 'published'
      AND c.id::text = (storage.foldername(name))[1]
  )
);

-- 5. lock down direct execution of the security definer helper
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;