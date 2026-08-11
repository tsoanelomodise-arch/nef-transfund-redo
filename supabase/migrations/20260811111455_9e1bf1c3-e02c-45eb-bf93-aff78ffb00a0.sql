-- Home page stays code-driven for now; keep its CMS version as a draft
UPDATE public.pages SET status = 'draft' WHERE slug = 'home';

-- Seed the header menu exactly as it ships in code (only if the menu is empty)
DO $$
DECLARE
  v_about uuid; v_elig uuid; v_inv uuid; v_res uuid; v_portal uuid;
BEGIN
  IF EXISTS (SELECT 1 FROM public.nav_items) THEN
    RETURN;
  END IF;

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('About', '/about', 0, true) RETURNING id INTO v_about;
  INSERT INTO public.nav_items (parent_id, label, href, position, visible) VALUES
    (v_about, 'Fund purpose', '/about/why', 0, true),
    (v_about, 'Fund Policy', '/about/why/policy-choice', 1, true);

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('Eligibility', '/eligibility', 1, true) RETURNING id INTO v_elig;
  INSERT INTO public.nav_items (parent_id, label, href, position, visible) VALUES
    (v_elig, 'Funding Process', '/eligibility/process', 0, true),
    (v_elig, 'Market segments', '/eligibility/market-segments', 1, true),
    (v_elig, 'Products', '/eligibility/products', 2, true),
    (v_elig, 'Eligibility Checklist', '/eligibility#path-to-funding', 3, true);

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('Investors', NULL, 2, true) RETURNING id INTO v_inv;
  INSERT INTO public.nav_items (parent_id, label, href, position, visible) VALUES
    (v_inv, 'Capitalisation', '/investors', 0, true),
    (v_inv, 'Governance', '/investors/governance', 1, true);

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('News', '/news-media', 3, true);

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('Resources', '/resources', 4, true) RETURNING id INTO v_res;
  INSERT INTO public.nav_items (parent_id, label, href, position, visible) VALUES
    (v_res, 'FAQ', '/faq', 0, true),
    (v_res, 'Careers', '/careers', 1, true),
    (v_res, 'TF Framework', '/resources/Transformation_Fund_Framework_FINAL_03_March_2026.pdf', 2, true);

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('Contacts', '/contacts', 5, true);

  INSERT INTO public.nav_items (label, href, position, visible) VALUES ('Portal', '/uat2_hta_portal', 6, true) RETURNING id INTO v_portal;
  INSERT INTO public.nav_items (parent_id, label, href, position, visible) VALUES
    (v_portal, 'Login', 'https://dev-online.sa-transformationfund.co.za/', 0, true),
    (v_portal, 'Register', 'https://dev-online.sa-transformationfund.co.za/Account/Register', 1, true);
END $$;