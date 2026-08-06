# Convert the website into a basic CMS

Goal: the client maintains the site (text, images, documents, menus, new pages) from the existing admin area, with draft/preview then publish, without developer involvement.

## What the client will be able to do

- Edit headings, paragraphs, lists, images and buttons on existing pages. Layout and brand styling stay fixed and safe.
- Create new pages from a few preset layouts and give them a web address.
- Manage the navigation menus: labels, order, nesting, links, show/hide.
- Upload and replace documents (PDFs) in a document library, and link them from pages or menus.
- Save a draft, preview the page exactly as visitors will see it, then publish when ready. Nothing goes live until published.
- Keep using the existing News & Media and Careers managers, now inside one consistent admin.

## Rollout (phased)

**Phase 1 — CMS foundation**
- Content database: pages, content blocks, page versions (draft vs published), navigation menus, document library, media library.
- Admin shell upgrade: left sidebar with Pages, Navigation, Documents, News & Media, Careers, Settings.
- Draft/publish workflow with a preview link.
- Rich text editor, image picker (upload or reuse), document picker.

**Phase 2 — Migrate high-churn pages**
Home, About, Resources, FAQ, Contacts. Their current copy and images are imported verbatim into the database; the pages render from the database with the current design unchanged.

**Phase 3 — Navigation and documents**
Menus move to the database (current structure imported exactly), Resources documents move into the document library. The TF Framework and Print Advertisement PDFs are imported as library entries.

**Phase 4 — Remaining pages**
Why / Theory of Change / Policy Choice / Value / Operating Model / National Agenda, Path to Funding and its sub-pages, Investors and Governance, Startup Grants, Requirements. Interactive pieces (eligibility quiz, testing checklist, portal page) stay code-driven; only their text becomes editable.

**Phase 5 — Handover**
Short admin guide page inside the admin area, plus a walkthrough of publishing.

## Technical approach

Data model (Lovable Cloud / Postgres, RLS admin-only writes, public reads limited to published content):

```text
pages(id, slug, title, template, seo_title, seo_description, status, published_at)
page_blocks(id, page_id, version_id, type, position, data jsonb)
page_versions(id, page_id, status: draft|published, snapshot jsonb, created_by)
nav_items(id, parent_id, label, href, document_id, position, visible)
documents(id, title, storage_path, file_type, size, visible)
media(id, storage_path, alt_text, width, height)
```

- Block types kept deliberately small and mapped to existing components: `hero`, `richtext`, `card_grid`, `accordion`, `stat_row`, `cta`, `document_list`, `table`. Each block renders through the current component so design tokens and the white-card / black-left-border style are preserved.
- Page renderer: one `CmsPage` route component resolving `/:slug` from `pages`, falling back to existing hard-coded routes during migration so nothing breaks mid-phase.
- Preview: `/admin/preview/:pageId` renders the draft version with the real site chrome.
- Content migration is mechanical and verbatim — existing JSX copy is transferred into block records without rewording.
- Storage: new public `site-media` bucket for images; documents bucket for PDFs with public read on published entries only.
- Admin auth reuses the existing `has_role(auth.uid(),'admin')` model; no new role scheme.

## Notes and trade-offs

- Templates, not a free-form builder: the client cannot break the design, but new layout types need a developer (a small, rare task).
- Highly interactive pages (quiz logic, testing dashboard, portal tables) remain code-driven by design.
- Each phase is independently shippable; the site stays fully working between phases.
