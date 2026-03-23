

## Freeze YouTube Video on Last Frame

### Problem
When the YouTube video finishes playing, it shows suggested videos and YouTube branding. The user wants it to freeze on the last frame with nothing displayed after.

### Approach
Replace the simple iframe embed with the YouTube IFrame Player API. This allows listening for the video's `ENDED` state event. When the video ends, we overlay the thumbnail image back on top of the iframe, effectively "freezing" the display and hiding all YouTube end-screen content.

### Implementation

**File: `src/pages/Uat2HtaPortalPage.tsx`**

1. Add a new state `videoEnded` (boolean, default false)
2. Add a `useEffect` that loads the YouTube IFrame Player API script and creates a `YT.Player` instance when `showVideo` becomes true
3. Listen for the player's `onStateChange` event — when `state === YT.PlayerState.ENDED`, set `videoEnded = true`
4. When `videoEnded` is true, render the thumbnail image as an overlay on top of the iframe (same thumbnail used for the play button), hiding YouTube's end screen
5. Optionally include a replay button on the overlay so the user can watch again
6. Use a `ref` for the iframe container div so the API can target it
7. The embed URL will use `enablejsapi=1` in addition to the existing `rel=0&modestbranding=1` parameters

### What stays the same
- Click-to-play thumbnail behavior unchanged
- Video autoplay on click unchanged
- Tab section and all other page content unchanged

