
# Remove Duplicate "About" Sub-menu Item

## Overview
The "About" dropdown currently has a redundant "About" link as its first sub-item (line 84), while the top-level nav button already links to `/about`. Removing the duplicate sub-item and its separator keeps the dropdown clean.

## Changes

### File: `src/components/phakamani/PhakamaniNavbar.tsx`

**Desktop dropdown (lines 84-85):** Remove the duplicate "About" link and the divider below it. The dropdown will start directly with the "Why" section.

Before:
```
<Link to="/about" className="dropdown-item" ...>About</Link>
<div className="border-t border-gray-100 my-1" />
<Link to="/about/why" ...>Why</Link>
```

After:
```
<Link to="/about/why" ...>Why</Link>
```

No changes needed for mobile -- the mobile menu has "About" as a standalone top-level link (not nested inside itself), so there is no duplication there.
