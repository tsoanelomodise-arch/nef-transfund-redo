DROP POLICY IF EXISTS "Anyone can read site documents" ON storage.objects;

CREATE POLICY "Visible site documents are readable"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'site-documents'
  AND EXISTS (
    SELECT 1 FROM public.documents d
    WHERE d.storage_path = storage.objects.name
      AND d.visible = true
  )
);

CREATE POLICY "Admins can read all site documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'site-documents' AND public.has_role(auth.uid(), 'admin'::app_role));