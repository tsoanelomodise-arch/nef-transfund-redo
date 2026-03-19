

## Plan: Link Board of Directors image to its career attachment PDF

### What changes

The Board of Directors banner image in `NewsHighlightsSection` currently links to a hardcoded external URL. Instead, it should dynamically fetch the PDF attachment from the "board-of-directors" career record and open that file when clicked.

### Implementation

**File: `src/components/test-home/NewsHighlightsSection.tsx`**

1. Import `useCareerAttachmentsBySlug` from `@/hooks/useCareers`
2. Call `useCareerAttachmentsBySlug("board-of-directors")` to fetch the attachments for that career record
3. Find the first PDF attachment (matching the uploaded `2026-TransformationFund-PrintAd` file)
4. Replace the hardcoded external URL in the `<a>` tag with the dynamic `file_url` from the attachment query
5. Keep the existing click behavior (opens in a new window) but use the dynamic URL
6. Add a fallback: if no attachment is found yet (loading or empty), fall back to a link to the career detail page `/careers/board-of-directors`

### Technical details

- The `useCareerAttachmentsBySlug` hook already exists and fetches attachments via the `careers_public` view (no auth required)
- The `career-attachments` storage bucket is public, so the `file_url` will be directly accessible
- No database or migration changes needed

