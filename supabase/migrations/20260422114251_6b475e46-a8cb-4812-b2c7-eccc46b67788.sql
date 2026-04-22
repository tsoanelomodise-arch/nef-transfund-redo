-- 1. Restrict destructive operations on test_submissions to admins
DROP POLICY IF EXISTS "Anyone can delete test submissions" ON public.test_submissions;
DROP POLICY IF EXISTS "Anyone can update test submissions" ON public.test_submissions;

CREATE POLICY "Admins can delete test submissions"
ON public.test_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update test submissions"
ON public.test_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Recreate public views with security_invoker so caller's RLS applies
ALTER VIEW public.careers_public SET (security_invoker = true);
ALTER VIEW public.news_media_public SET (security_invoker = true);