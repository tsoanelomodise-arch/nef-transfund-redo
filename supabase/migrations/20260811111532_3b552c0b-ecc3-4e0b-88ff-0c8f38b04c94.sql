DO $$
DECLARE
  v_tf uuid; v_ad uuid;
BEGIN
  SELECT id INTO v_tf FROM public.documents WHERE storage_path = 'tf-framework/Transformation_Fund_Framework_FINAL_03_March_2026.pdf';
  IF v_tf IS NULL THEN
    INSERT INTO public.documents (title, description, storage_path, file_type, visible, position)
    VALUES ('Transformation Fund Framework', 'The full Transformation Fund Framework document.',
            'tf-framework/Transformation_Fund_Framework_FINAL_03_March_2026.pdf', 'application/pdf', true, 0)
    RETURNING id INTO v_tf;
  END IF;

  SELECT id INTO v_ad FROM public.documents WHERE storage_path = 'print-advertisement/2026-TransformationFund-PrintAdvertisement.pdf';
  IF v_ad IS NULL THEN
    INSERT INTO public.documents (title, description, storage_path, file_type, visible, position)
    VALUES ('2026 Transformation Fund Print Advertisement', 'Board of Directors print advertisement.',
            'print-advertisement/2026-TransformationFund-PrintAdvertisement.pdf', 'application/pdf', true, 1)
    RETURNING id INTO v_ad;
  END IF;

  -- Resources page: fill the download list, drop the hard-coded PDF button
  UPDATE public.page_blocks b
  SET data = jsonb_build_object('heading', 'Downloads', 'document_ids', jsonb_build_array(v_tf::text))
  FROM public.page_versions v, public.pages p
  WHERE b.version_id = v.id AND v.page_id = p.id AND p.slug = 'resources' AND b.type = 'document_list';

  DELETE FROM public.page_blocks b
  USING public.page_versions v, public.pages p
  WHERE b.version_id = v.id AND v.page_id = p.id AND p.slug = 'resources' AND b.type = 'cta';

  -- Menu: TF Framework now points at the library document
  UPDATE public.nav_items
  SET document_id = v_tf, href = NULL
  WHERE label = 'TF Framework';
END $$;