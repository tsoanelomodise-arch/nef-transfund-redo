-- Create storage bucket for career attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('career-attachments', 'career-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to career attachments
CREATE POLICY "Public read career attachments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'career-attachments');

-- Allow admins to manage career attachments
CREATE POLICY "Admins manage career attachments"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'career-attachments' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'career-attachments' AND public.has_role(auth.uid(), 'admin'));

-- Create career_attachments table
CREATE TABLE public.career_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.career_attachments ENABLE ROW LEVEL SECURITY;

-- Admins can manage attachments
CREATE POLICY "Admins can manage career attachments"
ON public.career_attachments FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public can read attachments (for published jobs, enforced via join in app)
CREATE POLICY "Public can read career attachments"
ON public.career_attachments FOR SELECT
TO public
USING (true);