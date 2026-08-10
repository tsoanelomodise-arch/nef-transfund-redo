DROP POLICY IF EXISTS "Authenticated users can read test submissions" ON public.test_submissions;
CREATE POLICY "Only admins can read test submissions"
ON public.test_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Validated test submissions can be inserted" ON public.test_submissions;
CREATE POLICY "Authenticated users can insert validated test submissions"
ON public.test_submissions
FOR INSERT
TO authenticated
WITH CHECK (
  (status = ANY (ARRAY['pass','fail','pending','blocked','skipped']))
  AND (char_length(tester_name) BETWEEN 1 AND 100)
  AND (char_length(test_case_id) BETWEEN 1 AND 100)
  AND (char_length(category_id) BETWEEN 1 AND 100)
  AND (char_length(COALESCE(notes, '')) <= 2000)
);

REVOKE ALL ON public.test_submissions FROM anon;