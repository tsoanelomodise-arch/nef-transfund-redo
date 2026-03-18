

## Plan: Remove Greyscale and Fix Image Fit

**File: `src/components/test-home/NewsHighlightsSection.tsx`** (line ~18)

Change the `<img>` classes from:
```
w-full h-full min-h-[400px] object-cover grayscale
```
to:
```
w-full h-full min-h-[400px] object-contain bg-[#f5f5f5]
```

Two changes:
- `object-cover` → `object-contain` (show full image without cropping)
- Remove `grayscale` class (show image in full color)
- Add `bg-[#f5f5f5]` to fill any letterbox space

