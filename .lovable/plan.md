

# Careers Module – Job Display Only

## Current State

A basic `careers` table already exists with: title, description, location, employment_type, status, priority, closing_date, show_on_archive, created_by. A `careers_public` security view also exists (mirrors the news_media pattern). However, the spec requires several additional columns and no frontend pages or admin UI exist yet.

## Plan

### Step 1: Database Migration – Extend the careers table

Add new columns to the existing `careers` table:

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| department | text | null | New field |
| summary | text | null | Short preview text |
| responsibilities | text | null | Rich text, optional |
| requirements | text | null | Rich text, optional |
| salary_range | text | null | Optional display string |
| publish_date | timestamptz | now() | When published |
| apply_url | text | null | External apply link / CTA |
| slug | text | not null, unique | URL-friendly identifier |

Update the `careers_public` view to include the new columns and exclude `created_by`.

Update the `updated_at` trigger (currently missing on careers) to auto-set on update.

### Step 2: Types & Data Hook – `src/types/careers.ts` and `src/hooks/useCareers.ts`

Create a TypeScript interface mirroring the extended table. Build React Query hooks following the news_media pattern:

- **Public hooks**: `useCareersListing` (filtered, sorted, paginated via `careers_public`), `useCareerBySlug` (single job detail)
- **Admin hooks**: `useCareersAdmin`, `useCreateCareer`, `useUpdateCareer`, `useDeleteCareer` (operate on `careers` table, require admin auth)

### Step 3: Public Pages

**`/careers` – Listings Page** (`src/pages/CareersPage.tsx`)
- Keyword search input (filters title/description client-side or via ilike)
- Filter dropdowns: Location, Department, Employment Type
- Sort: newest first (default)
- Grid/list of cards showing: title, department, location, employment type badge, summary, publish date
- Uses site navbar/footer consistent with other pages

**`/careers/:slug` – Detail Page** (`src/pages/CareerDetailPage.tsx`)
- Full job display: title, department, location, employment type, publish date, salary (if set), full description, responsibilities, requirements
- CTA button: if `apply_url` is set, show "Apply Now" linking externally; otherwise show "Contact Us" linking to `/contacts`
- Back link to `/careers`

### Step 4: Admin CMS – `/admin/careers`

Mirror the news_media admin architecture:

**`src/pages/admin/CareersAdmin.tsx`** – Wrapped in existing `AdminLayout`

**`src/components/admin/CareersForm.tsx`** – Form with all fields: title, slug (auto-generated from title, editable), department, location select (Remote/On-site/Hybrid), employment type select (Full-time/Part-time/Contract), summary, full description (textarea/markdown), responsibilities, requirements, salary range, apply URL, priority, publish date, status (draft/published/archived)

**`src/components/admin/CareersList.tsx`** – Table with filters (status, department), inline approve/archive actions, edit/delete buttons. Mirrors `NewsMediaList` patterns.

### Step 5: Routing

Add to `App.tsx`:
```
/careers → CareersPage
/careers/:slug → CareerDetailPage
/admin/careers → CareersAdmin
```

### Step 6: SEO & Search Index

- Apply `useSEO` hook on both public pages
- Add careers entries to the site-wide search content index

---

### Technical Notes

- The `careers_public` view will be recreated as a `SECURITY DEFINER` view filtering `status = 'published'` and excluding `created_by`, matching the `news_media_public` pattern
- RLS on the base `careers` table already restricts direct SELECT to admins; public access goes through the view
- Slug generation: auto-kebab-case from title on create, editable, enforced unique at DB level
- No new storage buckets needed (no image uploads for careers)
- The admin route reuses the existing `AdminLayout` and auth guard

