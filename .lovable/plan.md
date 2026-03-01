

## Migration: uat2_hta_portal HTML to Lovable Page

### Overview
Migrate the standalone `uat2_hta_portal.html` into a new React page, add it to the navigation under a new "Portal" dropdown, and preserve all content, styling, and interactivity exactly.

### 1. Copy Image Asset
- Copy `user-uploads://WomanOnPhone-2.jpg` to `public/images/hero/WomanOnPhone.jpg` (used as hero background)

### 2. Create New Page: `src/pages/Uat2HtaPortalPage.tsx`
- Wrap content in the global layout: `PhakamaniNavbar` + `Footer`
- Use `pt-[180px] lg:pt-[210px]` wrapper matching other pages
- Embed all CSS from the HTML `<style>` block as a scoped `<style>` tag (or CSS module) to avoid conflicts with global styles
- Recreate the HTML body content as JSX:
  - **Hero section**: background image from `/images/hero/WomanOnPhone.jpg`, overlay, two-column grid with text block (h1, support text, Login/Register buttons) and embedded YouTube iframe (`C3yyl_4lrd4`)
  - **Tabs section**: 5 vertical tabs (Access to Capital, Access to Markets, Access to Capabilities, Other Aggregators, Sectors) with React `useState` for active tab management (replacing the `openTab()` vanilla JS)
  - All table data, list items, text preserved character-for-character
- All CSS variables, font families (`Helvetica Neue`), sizes, weights, letter-spacing, hover states preserved exactly via scoped styles
- Responsive breakpoints at 992px and 768px preserved

### 3. Add Route in `src/App.tsx`
- Add lazy import: `const Uat2HtaPortalPage = lazy(() => import("./pages/Uat2HtaPortalPage"));`
- Add route: `<Route path="/uat2_hta_portal" element={<Uat2HtaPortalPage />} />`

### 4. Modify Navigation: `src/components/phakamani/PhakamaniNavbar.tsx`

**Desktop Navigation:**
- Add new state: `portalDropdownOpen`
- Add detection: `isPortalSection = location.pathname.startsWith("/uat2_hta_portal")`
- Convert the existing "PORTAL LOGIN" CTA area into a "Portal" dropdown trigger in the main nav bar containing:
  - `uat2_hta_portal` -- links to `/uat2_hta_portal`
  - `Portal Login` -- external link to `https://dev-online.sa-transformationfund.co.za/`
- Keep the standalone "PORTAL LOGIN" CTA button as-is for quick access
- The dropdown follows the same pattern as About/Eligibility/Investors dropdowns (hover open, ChevronDown icon, active state highlighting)

**Mobile Navigation:**
- Add "Portal" as a top-level bold item (non-navigating label, like "Investors")
- Add `uat2_hta_portal` as indented sub-link to `/uat2_hta_portal`
- Keep existing "Portal Login" mobile link

### 5. Interactive Tab Behavior (React Implementation)
- Replace vanilla JS `openTab()` with React state: `const [activeTab, setActiveTab] = useState('tab-capital')`
- Tab buttons call `setActiveTab`
- Tab panes render conditionally based on `activeTab`
- Preserve fade-in animation via CSS `@keyframes fadeIn`
- Preserve logo-color-coded tab borders (red, blue, green, yellow, black)

### Technical Details

**Scoped CSS Strategy:**
- All HTML styles will be scoped inside a wrapper class (e.g., `.hta-portal-page`) to prevent leaking into global styles
- CSS variables from the source HTML will be defined within the scoped wrapper

**Files Modified:**
1. `src/App.tsx` -- add route
2. `src/components/phakamani/PhakamaniNavbar.tsx` -- add Portal dropdown with `uat2_hta_portal` sub-item

**Files Created:**
1. `src/pages/Uat2HtaPortalPage.tsx` -- new page component
2. `public/images/hero/WomanOnPhone.jpg` -- hero background image

