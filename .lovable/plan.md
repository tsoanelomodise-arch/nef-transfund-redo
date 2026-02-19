
# Fix: Lower the "Why the Transformation Fund?" Heading

## Problem
On the `/about/why` page, the heading and description text are positioned using `items-end pb-32`, which pushes content toward the bottom of the hero area. This causes the text to be cut off or not fully visible, especially on smaller viewports.

## Solution
Change the vertical alignment of hero content specifically for "Why" pages so the heading and text start higher up in the hero section, making them fully visible.

## Technical Change

### File: `src/components/phakamani/PhakamaniHero.tsx`

**Line 135** -- Update the hero content container to use top-aligned positioning for Why pages instead of bottom-aligned:

Change:
```tsx
<div className="relative z-10 h-full flex items-end pb-32">
```
To:
```tsx
<div className={`relative z-10 h-full flex ${isWhyPage ? 'items-start pt-8' : 'items-end pb-32'}`}>
```

This positions the heading and description near the top of the hero on Why pages, ensuring full visibility, while keeping the bottom alignment for the home page slides.
