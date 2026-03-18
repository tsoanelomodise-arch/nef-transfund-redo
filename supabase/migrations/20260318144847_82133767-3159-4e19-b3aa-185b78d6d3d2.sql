CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  employment_type text,
  closing_date timestamptz,
  status text NOT NULL DEFAULT 'draft',
  priority integer NOT NULL DEFAULT 5,
  show_on_archive boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all careers"
  ON public.careers FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can select from careers"
  ON public.careers FOR SELECT
  TO public
  USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_careers_updated_at
  BEFORE UPDATE ON public.careers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE VIEW public.careers_public AS
SELECT
  id, title, description, location, employment_type, closing_date,
  status, priority, show_on_archive, created_at, updated_at
FROM public.careers
WHERE status = 'approved';

GRANT SELECT ON public.careers_public TO anon, authenticated;