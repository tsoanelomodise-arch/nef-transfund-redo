
-- Add new columns to careers table
ALTER TABLE public.careers
  ADD COLUMN IF NOT EXISTS department text,
  ADD COLUMN IF NOT EXISTS summary text,
  ADD COLUMN IF NOT EXISTS responsibilities text,
  ADD COLUMN IF NOT EXISTS requirements text,
  ADD COLUMN IF NOT EXISTS salary_range text,
  ADD COLUMN IF NOT EXISTS publish_date timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS apply_url text,
  ADD COLUMN IF NOT EXISTS slug text;
