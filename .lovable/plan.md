

## Plan: Rename `/path-to-funding` URLs to `/eligibility`

### Summary

Replace all `/path-to-funding` route paths with `/eligibility` across the application. File/component import paths (e.g., `@/components/path-to-funding/...`) stay unchanged -- only URL routes and links change.

### Changes

**`src/App.tsx`** -- Update 4 route paths:
- `/path-to-funding` → `/eligibility`
- `/path-to-funding/process` → `/eligibility/process`
- `/path-to-funding/market-segments` → `/eligibility/market-segments`
- `/path-to-funding/products` → `/eligibility/products`

**`src/components/phakamani/PhakamaniNavbar.tsx`** -- Update all Link `to=` and `href=` props and the `startsWith("/path-to-funding")` active-state check:
- All `/path-to-funding` references in links → `/eligibility`
- `location.pathname.startsWith("/path-to-funding")` → `startsWith("/eligibility")`
- Hash links like `/path-to-funding#path-to-funding` → `/eligibility#path-to-funding`
- Pathname check `=== "/path-to-funding"` → `=== "/eligibility"`
- `navigate("/path-to-funding#...")` → `navigate("/eligibility#...")`

**`src/components/test-home/TestHomeHero.tsx`** -- Update the "How to Apply" link:
- `to="/path-to-funding"` → `to="/eligibility"`

**`src/pages/TestingChecklist.tsx`** -- Update test case descriptions that reference URLs:
- `/path-to-funding` → `/eligibility` in description strings (4 occurrences)

**`src/components/path-to-funding/FundingConditionsSection.tsx`** -- No change needed (the `id="path-to-funding"` is an HTML anchor ID, not a URL route, and can stay as-is).

### Not Changed
- Component file paths (`src/components/path-to-funding/...`) -- these are internal code organization, not user-facing URLs
- Hook names (`usePathToFundingQuiz`) -- internal code naming

