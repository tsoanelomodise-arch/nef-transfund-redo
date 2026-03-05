

## Plan: Mandatory Completion Before PDF Export

### What Changes

**`src/pages/TestingChecklist.tsx`**

1. **Validate before printing** — Replace the direct `window.print()` call with a validation function that checks:
   - Tester name is not empty
   - Every test case has a status of "pass" or "fail" (no "pending")
   - Failed test cases have non-empty notes

2. **Show validation errors** — Import `toast` from `sonner` to display a specific error message when validation fails (e.g., "Please complete all test cases and add notes for failures before exporting").

3. **Visual indicators for incomplete items** — Add a red highlight/border to the tester name input when empty on export attempt, and optionally auto-expand collapsed categories that contain pending items so testers can see what's missing.

4. **Update instructions** — Add a note in the instructions card: "All test cases must be marked Pass or Fail, and failed tests must include notes, before you can export to PDF."

### How It Works

- User clicks "Print / Export PDF"
- If `testerName` is empty → toast error, highlight name field
- If any test case is still "pending" → toast error listing incomplete categories
- If any "fail" case has empty/whitespace notes → toast error
- Only if all checks pass → call `window.print()`

