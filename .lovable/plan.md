
# Fix: Add Active State to "Why" Sub-navigation Items

## Problem
When viewing a "Why" sub-page (e.g., Value Proposition at `/about/why/value`), the dropdown menu items all look identical -- there's no visual indicator showing which sub-page is currently active. The top-level "About" link correctly shows an active state, but the individual dropdown items (Policy Choice, Theory, Value, Operating Model, National Agenda) do not.

## Solution
Add active styling to dropdown sub-items by comparing the current `location.pathname` with each link's target path. The active item will get a brighter text color and a highlighted background.

## Changes

### File: `src/components/phakamani/PhakamaniNavbar.tsx`

**Desktop dropdown sub-items (lines 85-91):** Add a conditional class to each sub-link that checks if its path matches the current route. When active, the item will display with full white text and a subtle highlighted background instead of the default `text-white/70`.

For each sub-link, change:
```
className="dropdown-item pl-6 text-sm text-white/70 hover:!text-white ..."
```
To:
```
className={`dropdown-item pl-6 text-sm hover:!text-white ... ${location.pathname === '/about/why/[sub-path]' ? 'text-white bg-[#004d30]' : 'text-white/70'}`}
```

This applies to all 5 sub-links: Policy Choice, Theory, Value, Operating Model, and National Agenda.

**Why top-level link (line 84):** Similarly highlight the "Why" link when on the `/about/why` route exactly:
```
className={`dropdown-item font-bold ${location.pathname === '/about/why' ? 'bg-[#004d30]' : ''}`}
```

**Mobile menu (lines 175-183):** The mobile sub-links already have conditional styling via inline checks, but they also lack per-item active state. Add the same active color for each mobile sub-link when its path matches `location.pathname`.
