DO $$
DECLARE p_id uuid; v_id uuid;
BEGIN
  DELETE FROM public.pages WHERE slug = 'contacts';

  INSERT INTO public.pages (slug, title, template, seo_title, seo_description, status, published_at)
  VALUES ('contacts', 'Contact Us', 'default', 'Contact Us',
    'Get in touch with the Transformation Fund team. Email, call, or visit our Sandton office for enquiries about funding applications and support.',
    'published', now())
  RETURNING id INTO p_id;

  INSERT INTO public.page_versions (page_id, status) VALUES (p_id, 'published') RETURNING id INTO v_id;

  INSERT INTO public.page_blocks (version_id, type, position, data) VALUES
  (v_id, 'contact_hero', 0, '{
    "heading": "Contact Us",
    "body": "Get in touch with our team to learn more about the Transformation Fund or to start your application journey.",
    "primary_label": "Email Us Now",
    "primary_href": "mailto:info@sa-transformationfund.co.za",
    "secondary_label": "Call Us",
    "secondary_href": "tel:+27861113186",
    "image_url": "/images/social-media-qr-code.png",
    "image_alt": "Scan QR Code to connect with us",
    "image_href": "https://scan.page/p/jJshR7",
    "image_caption": "Scan to connect with us"
  }'::jsonb),
  (v_id, 'contact_cards', 1, '{
    "heading": "Contact Information",
    "cards": [
      {"icon": "mail", "title": "Email", "lines": [
        {"text": "info@sa-transformationfund.co.za", "href": "mailto:info@sa-transformationfund.co.za"},
        {"text": "applications@nefcorp.co.za", "href": "mailto:applications@nefcorp.co.za"}]},
      {"icon": "phone", "title": "Phone", "lines": [{"text": "+27 86 111 3186", "href": ""}]},
      {"icon": "address", "title": "Address", "lines": [{"text": "70 Grayston Drive, Sandown Sandton, Gauteng, 2196 South Africa", "href": ""}]},
      {"icon": "clock", "title": "Office Hours", "lines": [
        {"text": "Monday - Friday: 8:00 AM - 5:00 PM", "href": ""},
        {"text": "Saturday - Sunday: Closed", "href": ""}]}
    ]
  }'::jsonb),
  (v_id, 'map', 2, '{
    "heading": "Our Location",
    "address": "70 Grayston Drive, Sandown, Sandton, Gauteng, 2196 South Africa",
    "zoom": 15,
    "title": "Transformation Fund Office Location"
  }'::jsonb),
  (v_id, 'contact_form', 3, '{
    "heading": "Send us a Message",
    "intro": "Have a question or want to learn more? Fill out the form below and we''ll get back to you.",
    "button_label": "Send Message",
    "anchor": "contact-form"
  }'::jsonb);
END $$;