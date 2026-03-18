

## Plan: Careers & Job Postings (mirroring News & Media pattern)

### Database

**New table: `careers`**
- `id` uuid PK, `title` text NOT NULL, `description` text, `location` text, `employment_type` text (full-time/part-time/contract), `closing_date` timestamptz, `status` text DEFAULT 'draft' (draft/approved/rejected), `priority` int DEFAULT 5, `show_on_archive` boolean DEFAULT true, `created_by` uuid, `created_at`/`updated_at` timestamptz DEFAULT now()
- RLS: admin ALL via `has_role()`, restrictive SELECT for admin-only management table
- Trigger: `update_updated_at_column` on UPDATE

**New view: `careers_public`** (mirrors `news_media_public` pattern)
- SELECT from `careers` WHERE `status = 'approved'` — no RLS needed on view, publicly readable

**Migration also adds realtime if needed.**

### New Files

| File | Purpose |
|------|---------|
| `src/types/careers.ts` | `CareerItem` and `CareerInsert` interfaces |
| `src/hooks/useCareers.ts` | Hooks: `useCareerItem`, `useCareersArchive`, `useCareersAdmin`, `useCreateCareer`, `useUpdateCareer`, `useDeleteCareer` (copy of useNewsMedia pattern) |
| `src/components/admin/CareersList.tsx` | Admin list with status filters, approve/reject/edit/delete actions (copy of NewsMediaList) |
| `src/components/admin/CareersForm.tsx` | Create/edit form with title, description, location, employment type, closing date (simplified NewsMediaForm) |
| `src/pages/admin/CareersAdmin.tsx` | Admin page using AdminLayout with CareersList (like NewsMediaAdmin but without settings tab) |
| `src/pages/CareersPage.tsx` | Public archive at `/careers` — grid of approved job postings with location/type badges |
| `src/pages/CareerDetailPage.tsx` | Detail page at `/careers/:id` — full job description with apply info |

### Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Add routes: `/careers`, `/careers/:id`, `/admin/careers` |
| `src/components/phakamani/PhakamaniNavbar.tsx` | Add "Careers" link under the "Resources" dropdown (alongside FAQ) |
| `src/components/admin/AdminLayout.tsx` | Add navigation link to switch between News & Careers admin sections |
| `src/pages/admin/AdminLogin.tsx` | No change needed — existing login flow covers both admin sections |

### Public Pages Design
- **CareersPage** (`/careers`): Same layout as NewsMediaPage — navbar, "CAREERS" heading, grid of cards showing title, location badge, employment type badge, closing date, excerpt, and "View details →" link
- **CareerDetailPage** (`/careers/:id`): Same layout as NewsMediaDetailPage — back link, title, badges, full description, closing date notice
- Both pages include `useSEO` hook calls

### Admin Design
- **CareersAdmin**: Single tab with CareersList (no settings tab needed)
- **CareersList**: Table with Title, Type, Location, Status, Closing Date, Actions columns — approve/reject/edit/delete buttons
- **CareersForm**: Fields for title, description (textarea), location (input), employment type (select: full-time/part-time/contract), closing date (date input), priority, show on archive checkbox

