

## Plan: Update Search Index to Use FAQ Page Content

### What
Replace the 7 old FAQ entries in the search content index with the 12 FAQs from `src/pages/FAQ.tsx` (the Resources > FAQ page). This ensures search results match the actual FAQ content users see.

### Changes

**File: `src/lib/search/content-index.ts`**

Replace the existing 7 FAQ entries (lines 10-107) with 12 new entries sourced from the FAQ page content:

1. What is the Transformation Fund?
2. What are the eligibility requirements for funding?
3. How much funding can I apply for?
4. How long does the application process take?
5. What documents do I need to apply?
6. Can I apply if my business is less than 12 months old?
7. What support do you provide beyond funding?
8. Can I apply for multiple funding programs?
9. Is there any cost to apply?
10. What happens after my application is approved?
11. What happens if my application is declined?
12. Can I reapply if my application is rejected?

Each entry will:
- Use `url: '/faq'` with appropriate `anchor` values matching the accordion item indices
- Have correct `category` tags (eligibility, application, funding, support, general)
- Include relevant `keywords` for search discovery
- Use content text verbatim from the FAQ page

### Technical Details
- Only `src/lib/search/content-index.ts` needs editing
- The search engine, types, and UI components remain unchanged
- All entries keep `type: 'faq'` so they appear in the "Direct Answers" group in search results

