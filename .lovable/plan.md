

## Add Black Accent Line Above All Page Headings

The short horizontal black line (`w-[60px] h-1 bg-black mb-6`) currently only appears above the Governance page heading. This plan adds it consistently above all major page and section headings across the website.

### Scope

The accent line will be added to **primary page headings (h1)** and **major section headings (h2)** across content pages. It will NOT be added to:
- Modal/dialog headings (these are overlays, not page content)
- Admin pages (different UI context)
- Card-level headings (too granular)
- Hero overlays with background images (would clash visually)

### Files to Update (18 files)

**Pages with h1 headings:**
1. `src/pages/InvestorsPage.tsx` -- "Capitalisation" heading
2. `src/pages/Resources.tsx` -- "Download Resources" heading
3. `src/pages/FAQ.tsx` -- "Frequently Asked Questions" heading
4. `src/pages/Requirements.tsx` -- "Application Requirements" heading
5. `src/pages/NewsMediaPage.tsx` -- "News & Media" heading
6. `src/pages/NewsMediaDetailPage.tsx` -- article title heading
7. `src/pages/TestContacts.tsx` -- "Contact Us" heading

**Content components with h1/h2 headings:**
8. `src/components/path-to-funding/ProductsContent.tsx` -- "Products" heading
9. `src/components/path-to-funding/FundingProcessContent.tsx` -- "Funding Process" heading
10. `src/components/path-to-funding/PathToFundingHero.tsx` -- "Prepare before applying" heading
11. `src/components/path-to-funding/MarketSegmentsContent.tsx` -- "Priority sectors" heading
12. `src/components/path-to-funding/InvestmentCriteriaSection.tsx` -- "Investment Criteria" heading
13. `src/components/path-to-funding/FundingConditionsSection.tsx` -- section heading
14. `src/components/path-to-funding/EligibilityCriteriaSection.tsx` -- section heading
15. `src/components/investors/InvestorsContent.tsx` -- section headings
16. `src/components/investors/GovernanceContent.tsx` -- already has it on h1; add to h2 headings ("Governance structure", "Digital oversight", "Public reporting")
17. `src/components/test-home/TestHomeProductsSection.tsx` -- "Discover our Products"
18. `src/components/test-home/HighlightedStoriesSection.tsx` -- "Highlighted Stories"

### Implementation Pattern

Before each heading, insert:
```tsx
<div className="w-[60px] h-1 bg-black mb-4" />
```

For headings on dark backgrounds (e.g., InvestorsContent dark section, GovernanceContent "Digital oversight"), use `bg-white` instead:
```tsx
<div className="w-[60px] h-1 bg-white mb-4" />
```

### Technical Notes
- No new components or dependencies needed -- it's a simple `div` element
- The line uses the same dimensions already established in GovernanceContent: 60px wide, 4px tall (h-1)
- Margin-bottom (`mb-4` or `mb-6`) will be matched to existing spacing around each heading
- Files will be edited using targeted line replacements to minimize diff size
