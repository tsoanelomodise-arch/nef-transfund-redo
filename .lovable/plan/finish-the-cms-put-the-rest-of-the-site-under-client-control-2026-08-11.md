# Finish the CMS: put the rest of the site under client control

Phase 1 (CMS foundation) and Phase 2's content import are done: Home, About, Resources, FAQ and Contacts already exist as published CMS pages with blocks. But the site still renders those pages from code — `/about`, `/resources`, `/faq`, `/contacts` and `/` are hard-coded routes that match before the CMS route `/:slug`, and the navigation menu is hard-coded in the navbar component. So edits made in the admin do not yet show on the live site.

This plan closes that gap and brings the remaining pages in.

## Step 1 — Make the imported pages actually render from the CMS

- Switch `/about`, `/resources`, `/faq`, `/contacts` (and later `/`) to render the CMS version when a published page with that address exists, and fall back to the current coded page if not. Nothing breaks if a page is unpublished by mistake.
- Verify each page side by side against the current design before switching it over, and correct any block content that drifted during import.

## Step 2 — Editable navigation

- Move the header menu (including dropdowns, the TF Framework PDF link and the portal links) into the Navigation manager, imported exactly as it is today.
- The navbar reads the menu from the database, with the current menu kept as a fallback if the database is empty.
- Client can rename, reorder, nest, hide and add menu items, and point an item at a page, an external link or an uploaded document.
- Footer links get the same treatment (a second menu group).

## Step 3 — Document library

- Move the Resources PDFs (TF Framework, Print Advertisement) into the Documents library so the client can replace a PDF without a developer.
- The Resources page's download buttons render from the library, keeping the existing button styling and the branded PDF viewer behaviour.

## Step 4 — Remaining pages

Imported verbatim into blocks, same as Phase 2:

- Why / Theory of Change / Policy Choice / Value / Operating Model / National Agenda
- Path to Funding and its sub-pages (Process, Market Segments, Products)
- Capitalisation and Governance
- Startup Grants, Requirements

Interactive parts stay code-driven by design: the eligibility quiz and its modals, the testing checklist and results dashboard, the portal table, News & Media and Careers (these already have their own managers).

## Step 5 — New block types needed for those pages

The current block set (hero, text, card grid, accordion, stats, CTA, document list, table, image) does not cover everything. Add:

- **Numbered pillars / process steps** — the Why and Funding Process layouts
- **Two-column text + image** — About and Capitalisation sections
- **Anchor section wrapper** — so in-page links like `#path-to-funding` keep working, with the existing scroll offset

## Step 6 — Handover

- Expand the in-admin guide with a short walkthrough: edit a page, preview, publish, roll back by unpublishing.
- Check the site search index picks up CMS pages so new pages are searchable.

## Technical notes

- Route resolution: a small `CmsOrCoded` wrapper per migrated route queries the published page by slug; renders `CmsPage` on hit, the existing component on miss. Removed once each page is verified.
- Home is special-cased: it uses slug `home` rather than `/`.
- The navbar reads `nav_items` via the existing `useNavItems` hook; menu items resolving to a document use the signed-URL helper already in `useCms`.
- New block types are added to `src/types/cms.ts`, `BlockRenderer` and `BlockEditor` in the same pattern as the existing ones, each rendering through current components so brand styling is unchanged.
- Content migration stays mechanical and verbatim — no rewording, no punctuation edits.
- No schema changes are needed for steps 1-4; `pages`, `page_versions`, `page_blocks`, `nav_items`, `documents` and `media` already exist with admin-only writes and public reads limited to published content.

## Suggested order

Each step is independently shippable. Recommended: Step 1 first (so the client sees their edits take effect), then Step 2, then Steps 3-5, then handover.