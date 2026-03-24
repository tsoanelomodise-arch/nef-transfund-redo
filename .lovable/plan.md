

## Replace Homepage YouTube Embed with Native MP4 Video

### What changes
Replace the YouTube IFrame Player API embed in `src/components/test-home/TestHomePortalSection.tsx` with a native HTML5 `<video>` element using the uploaded MP4 file.

### Steps

1. **Copy uploaded video** to `public/videos/V3_TF_EligibilityAndDocumentChecker.mp4`

2. **Simplify `TestHomePortalSection.tsx`**:
   - Remove all YouTube IFrame Player API logic (`useEffect`, `playerRef`, `playerContainerRef`, `onYouTubeIframeAPIReady`, time-check interval, `videoEnded` state, `handleReplay`, `showVideo` state)
   - Remove `videoThumbnail` import and `RotateCcw` / `Play` icon imports
   - Replace with a simple `<video controls preload="metadata">` element pointing to `/videos/V3_TF_EligibilityAndDocumentChecker.mp4`
   - Native player freezes on last frame automatically — no overlay logic needed

### Files changed
- `public/videos/V3_TF_EligibilityAndDocumentChecker.mp4` — new file
- `src/components/test-home/TestHomePortalSection.tsx` — replace ~90 lines of YouTube logic with ~10 lines of native video

