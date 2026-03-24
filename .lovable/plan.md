

## Add Green Border to Homepage Video

### Change
In `src/components/test-home/TestHomePortalSection.tsx`, add a thick green border around the video container to match the portal page styling.

**What gets added to the video wrapper div (line 37):**
- `border: 4px solid #007847` (Phakamani Green)
- `padding: 16px` (spacing between border and video)
- `box-shadow: 20px 20px 0px 0px rgba(0, 120, 71, 0.2)` (matching the portal page offset shadow)
- Green background on the wrapper to fill the padding area

### File changed
- `src/components/test-home/TestHomePortalSection.tsx` — update the video container div styling

