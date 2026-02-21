

# Add New Hero Banner Slide: "A platform for a new economic era"

## Overview
Add a 6th slide to the homepage hero carousel using the uploaded baker image, following the exact same patterns as the existing 5 slides.

## Changes

### 1. Copy the uploaded image to the project
- Copy `user-uploads://03_HomePageBanner_ThabiBaker.jpg` to `public/images/hero/platform-baker.jpg`

### 2. Update `src/components/phakamani/PhakamaniHero.tsx`

**Slide count and names (line 25-26):**
- Change `slideCount` from `5` to `6`
- Add `"Platform"` to the `slideNames` array

**Add new slide image block (after line 106, before the closing `</div>`):**
- Add a new slide `div` for `currentSlide === 5` using the same pattern as the other slides
- Image source: `/images/hero/platform-baker.jpg`
- Alt text: `"Baker standing in artisan bakery with fresh bread"`
- Same classes: `w-full h-full object-contain`, `bg-white`, transition opacity, eager loading

**Add heading for slide 5 (line 155-164):**
- Add `currentSlide === 5` case with heading: `"A platform for a new economic era"`

**Add subtitle for slide 5 (after line 204):**
- Add a new block for `currentSlide === 5` with the subtitle text:
  `"A platform-driven approach that pools capital, builds capabilities, creates trusted digital marketplaces, and uses data to ensure accountability."`
- Uses the same `<p>` styling as slides 0 and 1 (italic, text-white/80, text shadow)

