

## Plan: Refresh button clears and reloads results

Currently the Refresh button calls `fetchSubmissions()` which appends/updates data but the existing `submissions` state persists until the new data arrives. The fix is simple:

### Change in `src/pages/TestResults.tsx`

In the Refresh button's `onClick` handler, clear the `submissions` state before fetching:

```tsx
onClick={() => { setSubmissions([]); setLoading(true); fetchSubmissions(); }}
```

This ensures the UI resets to a clean loading state, then populates with the latest data from the database -- effectively "resetting" the currently loaded tester results.

