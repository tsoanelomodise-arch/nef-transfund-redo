
# Use Uploaded Screenshot as Video Thumbnail

## Overview
Replace the current YouTube default thumbnail with the uploaded screenshot image, which shows the frame at 1:24 of the video.

## Changes

### 1. Copy the uploaded image to the project
- Copy `user-uploads://image.png` to `src/assets/video-thumbnail.png`

### 2. Update `src/components/test-home/TestHomePortalSection.tsx`
- Import the new thumbnail image
- Replace the YouTube thumbnail URL (`https://img.youtube.com/vi/C3yyl_4lrd4/hqdefault.jpg`) with the imported local image
- Keep the existing click-to-play pattern (lazy-loading iframe on click) unchanged

## Technical Details
- **File to copy**: `user-uploads://image.png` to `src/assets/video-thumbnail.png`
- **File to edit**: `src/components/test-home/TestHomePortalSection.tsx`
  - Add import: `import videoThumbnail from "@/assets/video-thumbnail.png";`
  - Line ~63: Change `src` from the YouTube thumbnail URL to `{videoThumbnail}`
- No structural or behavioral changes -- only the thumbnail image source changes
