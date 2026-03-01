
# Update Portal Page: Colors, Typography, and Spacing

## Overview
Update the Portal page (`src/pages/Uat2HtaPortalPage.tsx`) to align its color scheme, typography, and spacing with the home page's design system. Only visual properties change -- no content, structure, or component modifications.

## File to Edit
`src/pages/Uat2HtaPortalPage.tsx` -- CSS custom properties and style values within the existing `<style>` block, plus inline style values.

---

## 1. Color Changes

| Variable / Property | Current | New |
|---|---|---|
| `--color-navy` | `#111827` | `#111111` |
| `--color-navy-light` | `#1f2937` | `#1a1a1a` |
| `--color-coral` | `#2950ff` | `#007847` |
| `--color-coral-dark` | `#1c3ad6` | `#004b28` |
| `--color-gray-light` | `#f4f7fb` | `#F4F4F4` |
| `--color-text-dark` | `#1e293b` | `#0F172A` |
| `--logo-red` | `#e31837` | `#E31C23` |
| `--logo-blue` | `#0033a0` | `#004B8D` |
| `--logo-green` | `#007a33` | `#007847` |
| `--logo-yellow` | `#ffb612` | `#FDB913` |
| Hero overlay | `rgba(17,24,39,0.65)` | `rgba(0,0,0,0.60)` |
| Hero text block bg | `rgba(17,24,39,0.75)` | `rgba(0,0,0,0.70)` |
| Video block box-shadow | `rgba(41,80,255,0.2)` | `rgba(0,120,71,0.2)` |
| Video block border | `#007a33` | `#007847` |
| "Access Streams" inline color | `#111827` | `#000000` |

---

## 2. Typography Changes

| Property | Current | New |
|---|---|---|
| `--font-family` | `'Helvetica Neue', Helvetica, Arial, sans-serif` | `'Montserrat', sans-serif` |
| Headings (h1-h4) `text-transform` | `uppercase` | `none` |
| Headings `letter-spacing` | `1px` | `normal` |
| `.hta-support-text` font-weight | `500` | `400` |
| `.hta-btn` letter-spacing | `1px` | `0.5px` |
| Table headers `text-transform` and `letter-spacing` | `uppercase`, `1px` | unchanged (data convention) |

---

## 3. Spacing Changes

Align with the home page's compact, minimalist spacing pattern (`py-10`, `px-10`, `max-w-[1400px]`, `gap-20`).

| Property | Current | New |
|---|---|---|
| `--spacing-xl` | `64px` | `40px` (matches `py-10` = 2.5rem) |
| `--spacing-xxl` | `128px` | `64px` (reduce bottom padding to compact) |
| `--container-width` | `1200px` | `1400px` (matches home page `max-w-[1400px]`) |
| Container `padding` | `0 var(--spacing-lg)` (32px) | `0 40px` (matches home `px-10`) |
| Hero `min-height` | `100vh` | `80vh` (matches home hero `h-[80vh]`) |
| Hero grid `gap` | `var(--spacing-xl)` (was 64px, now 40px) | `80px` (explicit, matches home `gap-20`) |
| Tabs wrapper `gap` | `var(--spacing-xl)` | `40px` |
| Tab pane `padding` | `var(--spacing-xl)` | `32px` |
| Tab content `min-height` | `400px` | `350px` |
| "Access Streams" heading `marginBottom` | `var(--spacing-xl)` (inline) | `var(--spacing-lg)` |
| Section top padding (inline) | `var(--spacing-xl) 0 var(--spacing-xxl) 0` | `var(--spacing-xl) 0 var(--spacing-xl) 0` |
| Wrapper `paddingTop` | `180px` | `180px` (unchanged, matches navbar) |

---

## What Will NOT Change
- All HTML/JSX structure and content (text, tables, lists)
- Component imports and state management
- Tab interactivity and animation logic
- Responsive breakpoints and media query logic (992px, 768px)
- Grid column ratios (1fr 1.4fr hero, 300px 1fr tabs)

## Technical Details
Single file edit: `src/pages/Uat2HtaPortalPage.tsx` -- updating CSS variable declarations, a few hardcoded style values in the `<style>` block, and inline style props on the section/div elements.
