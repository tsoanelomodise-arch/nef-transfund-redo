

The issue is that when the navbar anchor scrolls to `#path-to-funding`, the fixed navbar (180px/210px tall) covers the heading. The fix is to add an invisible anchor element with enough top offset above the section heading so the full heading is visible after scrolling.

**Change in `src/components/path-to-funding/FundingConditionsSection.tsx`:**

Add a scroll-margin-top to the section element (matching the navbar height) so that when the browser scrolls to `#path-to-funding`, it accounts for the fixed navbar offset:

```tsx
<section id="path-to-funding" className="py-8 bg-[hsl(var(--ptf-section-bg))] scroll-mt-[200px] lg:scroll-mt-[230px]">
```

This uses CSS `scroll-margin-top` via Tailwind to offset the scroll target by the navbar height, ensuring the full heading is visible.

