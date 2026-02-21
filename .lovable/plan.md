

# Add Hero/Intro Section to About Page

## Overview
Re-introduce the "About / Transformation Fund" hero section at the top of the About page, faithfully replicating the layout and design from the provided HTML file. This uses two overlapping bakery images (back + front) with text content beside them.

## What gets added
A new intro section placed **before** the Objectives section, containing:
- Eyebrow label: "About"
- Heading: "Transformation Fund"
- Two overlapping images (BakeryBack and BakeryFront) in a layered composition
- Two text paragraphs (highlight + body) exactly as defined in the HTML

## Image assets
- Copy `user-uploads://BakeryBack-2.png` to `public/images/hero/BakeryBack-2.png`
- Copy `user-uploads://BakeryFront-2.png` to `public/images/hero/BakeryFront-2.png`

## Technical changes

### File: `src/pages/About.tsx`

Insert a new section between `<main>` and the Objectives section:

```text
Structure:
+--------------------------------------------------+
|  "About" eyebrow + "Transformation Fund" heading |
+--------------------------------------------------+
|  [Overlapping images]  |  [Highlight paragraph]  |
|  BakeryBack (80% w,    |  [Body paragraph]        |
|   z-1, bottom-right)   |                          |
|  BakeryFront (70% w,   |                          |
|   z-2, bottom-left)    |                          |
+--------------------------------------------------+
```

- White background, section padding matching `py-20 pb-24`
- Header block with max-width 800px and margin-bottom 3rem
- 2-column grid (stacked on mobile)
- Left column: relative container (h-[400px], max-w-[500px]) with two absolutely positioned images
  - BakeryBack: bottom-0 right-0, w-[80%], z-[1]
  - BakeryFront: bottom-0 left-0, w-[70%], z-[2]
  - On mobile: h-[320px], no negative top margin
- Right column: text content with highlight paragraph (text-xl, font-medium, text-[#111111]) and body paragraph (text-[#555555])
- All text content exactly as in the HTML -- no additions or modifications

### No other files affected
- Navbar, Footer, Objectives, Method, and Architecture sections remain untouched
- No new UI elements, overlays, icons, gradients, or decorative assets introduced

