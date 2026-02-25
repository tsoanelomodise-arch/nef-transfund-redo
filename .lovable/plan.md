

## Replace Default Favicon Files with Transformation Fund Logo

### Problem
When downloading or opening PDFs (TF Framework, TF Executive Summary) from the Resources page, the browser tab shows the Lovable favicon instead of the Transformation Fund logo. This happens because the `public/` directory contains old favicon files (`favicon.ico`, `favicon-32.png`, `favicon.jpg`) that browsers auto-detect.

### Solution
Replace the contents of the existing favicon files in `public/` with the Transformation Fund logo so that every browser context (including PDF viewer tabs) shows the correct branding.

### Changes

**1. Copy the TF logo over the old favicon files**
- Copy `/images/logo-transformation-fund.jpg` to replace `public/favicon.jpg`
- Copy `/images/logo-transformation-fund.jpg` to replace `public/favicon-32.png` (browsers will still read it)
- Copy `/images/logo-transformation-fund.jpg` to replace `public/favicon.ico`

**2. Update `index.html` favicon references** (minor cleanup)
- Add a `<link rel="icon" type="image/x-icon" href="/favicon.ico" />` entry to ensure the root favicon.ico is also explicitly declared, providing full coverage across all browser contexts.

### Why This Works
Browsers look for `/favicon.ico` at the root by default when opening new tabs (e.g., for PDF downloads). By replacing these files with the TF logo, all contexts will show the correct branding without needing to change the PDF files or download behavior.
