

## Fix Apache directory listing on refresh

### Root cause

Your `public/resources/` folder (containing the PDFs and viewer HTML files) gets deployed as a real directory on your Apache host. When you refresh `/resources`, Apache:
1. Sees the physical directory exists
2. Skips the SPA fallback rule (which only fires for non-existent paths)
3. Falls back to showing the raw "Index of /resources" listing

The same issue would hit any URL that collides with a real folder under `public/` (currently only `/resources`).

### Fix

Update `public/.htaccess` to:

1. **Disable directory listings** entirely with `Options -Indexes` — even if Apache reaches a directory, it won't expose the file list. As a bonus this will return a 403 instead of leaking filenames if anything else goes wrong.
2. **Force the SPA fallback for `/resources` (the bare folder URL)** so React Router renders your Resources page on refresh, while still allowing direct file requests like `/resources/Transformation_Fund_Framework_FINAL_03_March_2026.pdf` and `/resources/view-tf-framework.html` to be served as static files.

Final `.htaccess`:

```apache
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Let index.html through
  RewriteRule ^index\.html$ - [L]

  # If the URL is exactly /resources (the bare folder), send it to the SPA
  RewriteRule ^resources/?$ /index.html [L]

  # Otherwise, only fall back to SPA for paths that are not real files or dirs
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Notes
- This is hosting-specific to your Apache server (cPanel/shared hosting). On `uat2tf.lovable.app` the issue does not occur — Lovable's SPA fallback is built in and ignores `_redirects`/`.htaccess`.
- No React/code changes required. Direct PDF links like `/resources/Transformation_Fund_Framework_FINAL_03_March_2026.pdf` continue to work.
- If you later add other folders under `public/` whose names match React routes, add a similar `RewriteRule ^foldername/?$ /index.html [L]` line.

### Files changed
- `public/.htaccess` — add `Options -Indexes` and an explicit rewrite for `/resources` to `index.html`.

