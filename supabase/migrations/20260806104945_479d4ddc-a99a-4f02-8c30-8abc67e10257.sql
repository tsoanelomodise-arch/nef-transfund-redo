CREATE POLICY "Anyone can read site documents"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'site-documents');

CREATE POLICY "Admins can upload site documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-documents' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site documents"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-documents' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'site-documents' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site documents"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-documents' AND has_role(auth.uid(), 'admin'::app_role));