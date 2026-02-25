

## Rename "Investors" to "Capitalisation" + Link Audit

### Link Audit Results
All navigation links were tested against the defined routes in `App.tsx`. **No broken links or 404-causing issues were found.** Every internal link has a matching route, external links open in new tabs, and hash links use smooth scrolling.

### Rename Changes

**File: `src/components/phakamani/PhakamaniNavbar.tsx`**

The word "Investors" appears as display text in 4 places and needs to be changed to "Capitalisation":

1. **Line 124** (Desktop dropdown label): `Investors` --> `Capitalisation`
2. **Line 224** (Mobile menu label): `Investors` --> `Capitalisation`

The route paths (`/investors`, `/investors/governance`) and the `InvestorsPage` component will remain unchanged -- only the visible label text changes.

**File: `src/pages/InvestorsPage.tsx`**

3. **Line 16** (Page heading `<h1>`): `Investors` --> `Capitalisation`

No other files are affected. The "Investorss" span item remains as-is since it was a separate addition.
