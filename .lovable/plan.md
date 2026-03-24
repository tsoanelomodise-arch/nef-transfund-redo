

## Replace YouTube Video with Uploaded MP4 on Portal Page

### What changes
Replace the YouTube embed in `src/pages/Uat2HtaPortalPage.tsx` with a native HTML5 `<video>` element using the uploaded MP4 file.

### Steps

1. **Copy the uploaded video** to `public/videos/P4_ApplicationProcess_Video.mp4`

2. **Simplify `Uat2HtaPortalPage.tsx`**:
   - Remove all YouTube IFrame Player API logic (the `useEffect` for loading YT API, `playerRef`, `playerContainerRef`, `onYouTubeIframeAPIReady`, etc.)
   - Remove `videoEnded` state and replay overlay logic
   - Remove the click-to-play thumbnail pattern
   - Replace with a simple `<video>` element with `controls`, no `autoplay`, and styled to fill the video wrapper
   - The native video player naturally freezes on the last frame when playback ends — no extra logic needed

### Technical detail

The video element will be:
```html
<video
  controls
  preload="metadata"
  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
>
  <source src="/videos/P4_ApplicationProcess_Video.mp4" type="video/mp4" />
</video>
```

This eliminates ~60 lines of YouTube API code and all related state/refs. The native player handles end-of-video gracefully with no suggested content.

### Files changed
- `public/videos/P4_ApplicationProcess_Video.mp4` — new file (copied from upload)
- `src/pages/Uat2HtaPortalPage.tsx` — replace YouTube embed with native video player

