# Merge "Access to Capability & Markets" pages into the existing site

Source: `tsoanelomodise-arch/Access-To-Capacity---website` (React + Vite prototype, two content modules toggled in-app).

Nothing existing is removed. Two new pages are added and wired into the current navigation, routing, navbar and footer.

## What gets added

Two new routes, one per module in the source project:

- `/access-to-capability` — hero, support interventions grid, capability journey, documents section, video thumbnails
- `/access-to-markets` — hero, markets opportunities, supplier/buyer journey tabs, video thumbnails

Both keep every piece of copy exactly as it appears in the repository, plus all interactive behaviour:

- Intervention detail modal (all 20+ intervention entries from `data/interventions.ts`)
- 3-question eligibility quiz modal with its result states
- YouTube walkthrough video modal
- Supplier/buyer journey tabs, accordions, hover and scroll animations
- Escape-to-close, focus and keyboard behaviour

The in-app module switcher becomes real navigation: the "Access to Capability"/"Access to Markets" buttons link between the two routes, and section links (`#support-interventions`, `#capability-journey`, `#documents-section`, `#markets-opportunities`, `#markets-journey`) deep-link with the site's existing `scroll-mt-[200px]` header offset.

## What is intentionally not carried over

- The source's own `Header` and `BreadcrumbBar` — the site already has `PhakamaniNavbar` and a social icons row; reusing them avoids a duplicated header and duplicate social links.
- The source's `PrototypePinNote` ("This prototype is intended only to illustrate the page structure") — it is a prototype notice, not page content.
- The source's `index.css`/Inter base styles and Google Fonts link — the site's Montserrat typography and tokens apply instead.

## Navigation

Add a top-level "Access to Capability" menu entry with the two pages as children in `DEFAULT_MENU` (`src/lib/navigation.ts`), so it appears in desktop and mobile navigation. The same two items are added to the Navigation manager seed so the client can rename/reorder them in the admin. Existing menu entries are untouched.

## Assets

All remote images referenced by the source are downloaded and stored locally (project rule: no external image hosting):

- `ProteasBackground.jpg`, `Workshop_Large_full.jpg`, `Workshop_person.jpg`, `Florist-Concept-Large-Cropped.jpg`
- The 10 gradient/background SVGs in the repo's `public/` folder
- The Transformation Fund logo reference is swapped for the logo asset the site already uses

YouTube embeds stay as embeds. Placeholder image URLs (`placehold.co`) are replaced with the corresponding local artwork.

## Technical notes

- Add the `motion` package (v12, used by the source for `AnimatePresence`/`motion.div`); it is React 18 compatible.
- Source is Tailwind v4, this project is Tailwind v3: v4-only utilities (`shadow-xs`, `shadow-2xs`, `scale-102`, bare `size-*` variants) are mapped to their v3 equivalents so appearance is unchanged.
- Components land in `src/components/access/` (`CapabilityModule`, `MarketsModule`, `InterventionModal`, `EligibilityModal`, `VideoModal`, `BespokeIcons`, `AnimatedMouseArrow`), data in `src/data/interventions.ts`, types merged into a local module type file — matching existing folder conventions.
- Pages `src/pages/AccessToCapabilityPage.tsx` and `src/pages/AccessToMarketsPage.tsx` compose `PhakamaniNavbar` + module + `Footer`, are lazy-loaded in `src/App.tsx` like every other route, and set titles/descriptions via the existing `useSEO` hook. Routes are registered above the catch-all CMS routes so they resolve correctly.
- Colour/spacing: page-specific greens and greys in the source are mapped to the existing brand tokens where they correspond; bespoke gradients from the source SVGs are kept as-is.

## Validation

Run a Playwright pass over both new routes plus a sample of existing routes (`/`, `/about`, `/contacts`, `/faq`, `/resources`) at desktop and mobile widths: confirm modals, tabs, journey interactions and mobile menu work, no console errors, no broken images, and existing pages render unchanged.
