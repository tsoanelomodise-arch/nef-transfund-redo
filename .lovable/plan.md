

## Prevent YouTube Suggested Videos on Portal Page

### Change

In `src/pages/Uat2HtaPortalPage.tsx`, update the YouTube embed URL from:

```
https://www.youtube.com/embed/8UX1guPBADg?autoplay=1
```

to:

```
https://www.youtube.com/embed/8UX1guPBADg?autoplay=1&rel=0&modestbranding=1
```

- `rel=0` — disables suggested videos from other channels at the end
- `modestbranding=1` — reduces YouTube branding in the player

**Note**: YouTube no longer fully hides *all* suggestions with `rel=0` — it limits them to the same channel only. Complete removal of end-screen suggestions is not possible with standard embeds. If no other videos exist on the channel, the end screen will appear mostly clean.

### Files changed
- `src/pages/Uat2HtaPortalPage.tsx` — one line change to the iframe `src` attribute

