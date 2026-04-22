

## Add TF Framework PDF to Resources

### Changes

**1. Add the uploaded PDF to the project**
- Copy `Transformation_Fund_Framework_FINAL_03_March_2026.pdf` to `public/resources/`

**2. Create a viewer HTML wrapper (so the favicon shows the TF logo, not the Lovable favicon)**
- Create `public/resources/view-tf-framework.html` mirroring the existing `view-print-ad.html` pattern
- Sets `<link rel="icon" href="/images/logo-transformation-fund.jpg">` and a proper `<title>` ("TF Framework – Transformation Fund")
- Embeds the PDF in a full-screen iframe
- This is the page users will open — when they view/download from the browser, the favicon and tab title will be the TF branding (not Lovable's)

**3. Add "TF Framework" to the Resources dropdown menu**
- In `src/components/phakamani/PhakamaniNavbar.tsx`, add a new dropdown item under Resources (alongside FAQ and Careers)
- Link points to `/resources/view-tf-framework.html`, opens in a new tab (`target="_blank"`)
- Add the same item to the mobile menu Resources sub-section

**4. Add a download link on the Resources page**
- In `src/pages/Resources.tsx`, add a download link/button below the "Download Resources" hero text
- Link to `/resources/view-tf-framework.html` (or direct PDF) opening in new tab
- Style as a clear call-to-action button using existing brand colors (#00703C green)

### Files changed
- `public/resources/Transformation_Fund_Framework_FINAL_03_March_2026.pdf` — new file
- `public/resources/view-tf-framework.html` — new viewer wrapper (for branded favicon/title)
- `src/components/phakamani/PhakamaniNavbar.tsx` — add "TF Framework" sub-link to Resources dropdown (desktop + mobile)
- `src/pages/Resources.tsx` — add download link below hero text

### Note on favicon behavior
Browsers display the favicon of the HTML page hosting the PDF iframe — not the PDF itself. By routing users through `view-tf-framework.html` (which explicitly sets the TF logo as favicon), the browser tab will show the Transformation Fund logo instead of the default site favicon. If the user opens the raw `.pdf` URL directly, browsers fall back to the site's default favicon (already the TF logo via `index.html`), so branding is consistent either way.

