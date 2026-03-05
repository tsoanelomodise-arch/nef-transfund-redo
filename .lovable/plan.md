

## Plan: Cross-tester comparison table view for Test Results

### Summary

Replace the current per-tester card layout with a table where rows are test cases (grouped by category) and columns are testers. Each cell shows pass/fail status with an icon, and hovering or clicking reveals the tester's notes for that test case.

### Layout

```text
                    | Tester A  | Tester B  | Tester C  |
Navigation
  nav-1 Click each… |   ✓       |   ✗ (note)|   ✓       |
  nav-2 Open mobile…|   ✓       |   —       |   ✓       |
Pages Load
  pg-1 Load Home…   |   ✗ (note)|   ✓       |   ✓       |
  ...
```

### Changes

**`src/pages/TestResults.tsx`** -- Major restructure:

1. Keep the summary cards at the top (testers count, passed, failed, completed).
2. Below summary, render a horizontally-scrollable `<Table>` with:
   - A sticky first column showing test case ID + short description (grouped under category header rows).
   - One column per tester (sorted alphabetically or by last activity).
   - Each cell: a colored `CheckCircle` / `XCircle` icon, or a dash `—` if not yet submitted.
   - Notes displayed via a `Tooltip` on hover -- if the submission has notes, show a small indicator dot and the note text in the tooltip.
3. Category header rows span the full width as a bold section divider.
4. Use the existing `CATEGORY_LABELS` map and the `initialCategories` test case list (imported or duplicated as a constant) to define all rows, so even unanswered test cases appear.
5. The table will be wrapped in a `ScrollArea` for horizontal overflow on mobile.

### Data Processing

- Build a lookup: `Map<testCaseId, Map<testerName, Submission>>` from the deduplicated submissions.
- Extract the full ordered list of test cases from a `TEST_CASES` constant (mirroring `initialCategories` structure -- just IDs, descriptions, and category grouping).
- Extract unique tester names from submissions.

### New constant needed

A `TEST_CASES` array matching the checklist structure will be added to `TestResults.tsx` so the table always shows all 37 rows regardless of submissions. This duplicates the test case metadata but keeps the results page self-contained.

### Components used

- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `@/components/ui/table`
- `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` from `@/components/ui/tooltip`
- `ScrollArea` from `@/components/ui/scroll-area`
- Existing `CheckCircle`, `XCircle` icons from lucide-react

