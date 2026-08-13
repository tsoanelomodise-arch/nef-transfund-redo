DO $mig$
DECLARE
  faq_page uuid;
  faq_ver uuid;
  res_page uuid;
  res_ver uuid;
  m_about uuid; m_elig uuid; m_inv uuid; m_res uuid; m_portal uuid;
BEGIN
  -- ---------- FAQ page ----------
  IF NOT EXISTS (SELECT 1 FROM public.pages WHERE slug = 'faq') THEN
    INSERT INTO public.pages (slug, title, template, seo_title, seo_description, status, published_at)
    VALUES ('faq', 'FAQ', 'standard', 'FAQ',
      'Answers to common questions about the Transformation Fund, eligibility requirements, application process, funding amounts, and support services.',
      'published', now())
    RETURNING id INTO faq_page;

    INSERT INTO public.page_versions (page_id, status) VALUES (faq_page, 'published') RETURNING id INTO faq_ver;

    INSERT INTO public.page_blocks (version_id, type, position, data) VALUES
    (faq_ver, 'hero', 0, $j$
      {"eyebrow":"","heading":"Frequently Asked","highlight":"Questions","body":"Find answers to common questions about the Transformation Fund, eligibility requirements, application process, and the support we provide."}
    $j$::jsonb),
    (faq_ver, 'accordion', 1, $j$
      {"heading":"","items":[
        {"question":"What is the Transformation Fund?","answer":"The Transformation Fund is a government-backed initiative designed to provide financial support to Black-owned businesses in South Africa. We offer various funding options including grants, loans, and equity investments to help entrepreneurs grow and scale their businesses."},
        {"question":"What are the eligibility requirements for funding?","answer":"Eligibility varies by program, but general requirements include:\n\n• South African registered business or individual\n• Clear business plan and financial projections  \n• Compliance with regulatory requirements\n• Demonstration of economic impact potential\n• Meeting specific program criteria (B-BBEE status, sector focus, etc.)"},
        {"question":"How much funding can I apply for?","answer":"Funding amounts vary based on your business needs and eligibility. We offer support ranging from R50,000 for early-stage businesses up to R10 million for established enterprises. The exact amount will be determined during the assessment process based on your business plan and requirements."},
        {"question":"How long does the application process take?","answer":"Application timelines vary by program complexity:\n\n**Standard Applications:** 14-21 business days for review and approval\n\n**Complex Applications:** 30-45 business days for comprehensive due diligence"},
        {"question":"What documents do I need to apply?","answer":"Required documentation typically includes:\n\n**Business Documents:**\n• Company registration certificate\n• Tax clearance certificate  \n• B-BBEE certificate (if applicable)\n• Audited financial statements\n\n**Project Documents:**\n• Detailed business plan\n• Financial projections\n• Market analysis\n• Impact assessment"},
        {"question":"Can I apply if my business is less than 12 months old?","answer":"Yes, we have specific funding programs for early-stage businesses. While some programs require a longer operational history, our Start-up Grant program is specifically designed for businesses under 12 months old. Check your eligibility using our quiz on the How to Apply page."},
        {"question":"What support do you provide beyond funding?","answer":"We provide comprehensive support throughout your journey:\n\n**Business Development:** Strategic planning and market research support\n\n**Mentorship:** Access to experienced business leaders\n\n**Training:** Skills development and capacity building"},
        {"question":"Can I apply for multiple funding programs?","answer":"Yes, you can apply for multiple programs, but there are guidelines:\n\n**Recommended Approach:** Start with one program that best fits your current needs, then explore additional programs as your business grows.\n\n• Each application is evaluated independently\n• Funding amounts may be adjusted to prevent over-leveraging\n• Our specialists can help you choose the optimal combination\n• Sequential applications often work better than simultaneous ones"},
        {"question":"Is there any cost to apply?","answer":"No, there is absolutely no fee to apply for funding through the Transformation Fund. Beware of any third parties claiming to charge application fees on our behalf – this is a scam."},
        {"question":"What happens after my application is approved?","answer":"Once approved, you'll receive a formal offer letter outlining the terms. After accepting, funds are typically disbursed within 2-4 weeks. You'll also be assigned a relationship manager to support you throughout your funding journey."},
        {"question":"What happens if my application is declined?","answer":"We believe in supporting your success, even if your initial application isn't approved:\n\n**Detailed Feedback:** Receive specific reasons for decline and improvement recommendations\n\n**Reapplication Support:** Access to mentorship to strengthen your next application\n\n**Alternative Programs:** Guidance on other programs that might be a better fit\n\n**Development Resources:** Access to training and development programs"},
        {"question":"Can I reapply if my application is rejected?","answer":"Yes, you can reapply after 6 months. We recommend addressing the reasons for rejection before reapplying. Our team will provide feedback on your application to help you improve your chances in future applications."}
      ]}
    $j$::jsonb),
    (faq_ver, 'cta', 2, $j$
      {"heading":"","body":"Still have questions? We're here to help.","button_label":"Contact our support team","button_href":"/contacts"}
    $j$::jsonb);
  END IF;

  -- ---------- Resources page ----------
  IF NOT EXISTS (SELECT 1 FROM public.pages WHERE slug = 'resources') THEN
    INSERT INTO public.pages (slug, title, template, seo_title, seo_description, status, published_at)
    VALUES ('resources', 'Resources', 'standard', 'Resources',
      'Download Transformation Fund documents and resources including the comprehensive fund document and executive summary.',
      'published', now())
    RETURNING id INTO res_page;

    INSERT INTO public.page_versions (page_id, status) VALUES (res_page, 'published') RETURNING id INTO res_ver;

    INSERT INTO public.page_blocks (version_id, type, position, data) VALUES
    (res_ver, 'hero', 0, $j$
      {"eyebrow":"","heading":"Download","highlight":"Resources","body":"Access important documents and resources about the Transformation Fund. Download our comprehensive documentation to learn more about funding opportunities and application processes."}
    $j$::jsonb),
    (res_ver, 'cta', 1, $j$
      {"heading":"","body":"","button_label":"TF Framework (PDF)","button_href":"/resources/view-tf-framework.html"}
    $j$::jsonb);
  END IF;

  -- ---------- Navigation ----------
  IF NOT EXISTS (SELECT 1 FROM public.nav_items) THEN
    INSERT INTO public.nav_items (label, href, position) VALUES ('About', '/about', 0) RETURNING id INTO m_about;
    INSERT INTO public.nav_items (parent_id, label, href, position) VALUES
      (m_about, 'Fund purpose', '/about/why', 0),
      (m_about, 'Fund Policy', '/about/why/policy-choice', 1);

    INSERT INTO public.nav_items (label, href, position) VALUES ('Eligibility', '/eligibility', 1) RETURNING id INTO m_elig;
    INSERT INTO public.nav_items (parent_id, label, href, position) VALUES
      (m_elig, 'Funding Process', '/eligibility/process', 0),
      (m_elig, 'Market segments', '/eligibility/market-segments', 1),
      (m_elig, 'Products', '/eligibility/products', 2),
      (m_elig, 'Eligibility Checklist', '/eligibility#path-to-funding', 3);

    INSERT INTO public.nav_items (label, href, position) VALUES ('Investors', NULL, 2) RETURNING id INTO m_inv;
    INSERT INTO public.nav_items (parent_id, label, href, position) VALUES
      (m_inv, 'Capitalisation', '/investors', 0),
      (m_inv, 'Governance', '/investors/governance', 1);

    INSERT INTO public.nav_items (label, href, position) VALUES ('News', '/news-media', 3);

    INSERT INTO public.nav_items (label, href, position) VALUES ('Resources', '/resources', 4) RETURNING id INTO m_res;
    INSERT INTO public.nav_items (parent_id, label, href, position) VALUES
      (m_res, 'FAQ', '/faq', 0),
      (m_res, 'Careers', '/careers', 1),
      (m_res, 'TF Framework', '/resources/Transformation_Fund_Framework_FINAL_03_March_2026.pdf', 2);

    INSERT INTO public.nav_items (label, href, position) VALUES ('Contacts', '/contacts', 5);

    INSERT INTO public.nav_items (label, href, position) VALUES ('Portal', '/uat2_hta_portal', 6) RETURNING id INTO m_portal;
    INSERT INTO public.nav_items (parent_id, label, href, position) VALUES
      (m_portal, 'Login', 'https://dev-online.sa-transformationfund.co.za/', 0),
      (m_portal, 'Register', 'https://dev-online.sa-transformationfund.co.za/Account/Register', 1);
  END IF;
END
$mig$;