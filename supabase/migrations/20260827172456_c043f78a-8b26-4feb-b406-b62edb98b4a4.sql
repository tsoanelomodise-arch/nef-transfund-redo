CREATE TABLE public.page_visibility (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route text NOT NULL UNIQUE,
  label text NOT NULL DEFAULT '',
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_visibility TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_visibility TO authenticated;
GRANT ALL ON public.page_visibility TO service_role;

ALTER TABLE public.page_visibility ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page visibility is readable by everyone"
ON public.page_visibility FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage page visibility"
ON public.page_visibility FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_page_visibility_updated_at
BEFORE UPDATE ON public.page_visibility
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();