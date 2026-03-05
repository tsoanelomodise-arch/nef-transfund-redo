CREATE TABLE public.test_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tester_name text NOT NULL,
  test_case_id text NOT NULL,
  category_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('pass', 'fail')),
  notes text DEFAULT '',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tester_name, test_case_id)
);

ALTER TABLE public.test_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert test submissions"
  ON public.test_submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anyone can read test submissions"
  ON public.test_submissions FOR SELECT TO anon USING (true);

CREATE POLICY "Anyone can update test submissions"
  ON public.test_submissions FOR UPDATE TO anon USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.test_submissions;