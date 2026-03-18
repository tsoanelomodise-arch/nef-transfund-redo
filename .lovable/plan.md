

## Plan: Align Image to Top of Container

**File: `src/components/test-home/NewsHighlightsSection.tsx`** (line ~18)

Add `object-top` to the image classes so it aligns to the top of the container instead of centering vertically.

Change from:
```
w-full h-full min-h-[400px] object-contain bg-[#f5f5f5]
```
to:
```
w-full h-full min-h-[400px] object-contain object-top bg-[#f5f5f5]
```

