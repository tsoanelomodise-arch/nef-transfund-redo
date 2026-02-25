

## Add "Investorss" Menu Item

A simple, non-navigating menu item will be added to both desktop and mobile navigation in the `PhakamaniNavbar` component.

### Approach
- Use a `<span>` (or `<button>`) styled like a nav link instead of a `<Link>` or `<a>`, so clicking it does nothing and no route change occurs -- therefore no 404.
- Place it after the existing "Investors" menu item in both desktop and mobile menus.
- Apply the same `nav-link` CSS class used by other menu items for consistent styling.

### Changes

**File: `src/components/phakamani/PhakamaniNavbar.tsx`**

1. **Desktop nav** (after the Investors dropdown, before News link ~line 133): Add:
   ```tsx
   <span className="nav-link cursor-pointer">Investorss</span>
   ```

2. **Mobile nav** (after the Investors/Governance links, before News link ~line 209): Add:
   ```tsx
   <span className="block px-3 py-2 text-base font-bold text-gray-700 cursor-pointer">Investorss</span>
   ```

No new routes, pages, or components are needed. No other files are affected.

