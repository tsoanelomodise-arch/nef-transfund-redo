
# Remove Hero Text Background Rectangle

## Change
Remove the dark semi-transparent background rectangle behind the hero text block on the Portal page.

## Technical Detail
In `src/pages/Uat2HtaPortalPage.tsx`, update the `.hta-hero-text-block` CSS rule (line 80):

- **Remove**: `background-color: rgba(0, 0, 0, 0.70); border-radius: 8px;`
- **Keep**: `padding: var(--spacing-lg);` (preserve spacing around the text)

This will make the hero heading and supporting text sit directly over the darkened hero image (which already has a `::before` overlay at 60% opacity), without any visible box behind them.

## What stays the same
- All text content, buttons, and video block
- Hero overlay opacity
- Layout and spacing
