

## Plan: Make Board of Directors Image Clickable to Open PDF

1. **Copy PDF to public folder**: Copy `user-uploads://2026-TransformationFund-PrintAd_280x112mm.pdf` to `public/resources/2026-TransformationFund-PrintAd.pdf`

2. **Wrap image in anchor tag** in `src/components/test-home/NewsHighlightsSection.tsx`: Wrap the wrench-lady `<img>` in an `<a>` tag with `href="/resources/2026-TransformationFund-PrintAd.pdf"`, `target="_blank"`, and `rel="noopener noreferrer"`. Add `cursor-pointer hover:opacity-90 transition-opacity` for visual feedback.

