

# About Page: Remove Hero and Intro Sections

## What's being removed
1. **"Advancing the economic agenda" hero section** -- the `<AboutHero />` component with the bakery parallax images
2. **"About Transformation Fund" intro section** -- Section 1 (lines 67-88) with the "About" label, "Transformation Fund" heading, and two paragraphs

## What stays
- Objectives section
- The Method section
- The Architecture section (5 pillar cards)
- Navbar and Footer

## Technical changes

### File: `src/pages/About.tsx`
- Remove the `<AboutHero />` component usage (line 64)
- Remove the `import AboutHero` statement (line 2)
- Remove the entire Section 1: Intro block (lines 66-88)
- The page will now start directly with the Objectives section after the navbar

