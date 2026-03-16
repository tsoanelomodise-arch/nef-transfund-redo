

## Plan: Comprehensive SEO Implementation

### Problem
Most pages lack unique `document.title`, meta descriptions, Open Graph tags, Twitter Card tags, and canonical URLs. Only `PathToFunding` and a few "why" pages set `document.title`. No `sitemap.xml` exists.

### Approach
Create a reusable `useSEO` hook and apply it to every page. Generate a static `sitemap.xml`.

---

### Changes

**1. New file: `src/hooks/useSEO.ts`**

A hook that sets `document.title`, meta description, canonical URL, OG tags (title, description, url, image, type), and Twitter Card tags on mount. Cleans up on unmount. Accepts:
```ts
useSEO({
  title: string,        // Page title (appends " | Transformation Fund")
  description: string,
  path: string,         // e.g. "/about" — used for canonical + OG url
  image?: string,       // OG image, defaults to logo
  type?: string,        // OG type, defaults to "website"
})
```

**2. Apply `useSEO` to all 20+ pages**

| Page | Title | Description (summary) |
|------|-------|-----------------------|
| `TestHome` | Home | SA's national platform for inclusive economic transformation... |
| `About` | About | Learn about the Transformation Fund's objectives, architecture... |
| `PathToFunding` | Eligibility & Criteria | Check eligibility, prepare documents, apply for funding... |
| `FAQ` | FAQ | Answers to common questions about the Transformation Fund... |
| `TestContacts` | Contact Us | Get in touch with the Transformation Fund team... |
| `Resources` | Resources | Download Transformation Fund documents and resources... |
| `StartupGrants` | Startup Grants | Financial support for early-stage black-owned businesses... |
| `NewsMediaPage` | News & Media | Latest news, updates and media from the Transformation Fund... |
| `NewsMediaDetailPage` | (dynamic from article) | (dynamic from article) |
| `InvestorsPage` | Capitalisation | Resource mobilisation and investment channels... |
| `GovernancePage` | Governance | Governance framework, oversight and public reporting... |
| `ProductsPage` | Funding Products | Explore startup grants, growth loans, equity instruments... |
| `MarketSegmentsPage` | Market Segments | Priority sectors and market foundations... |
| `FundingProcessPage` | Funding Process | 8-stage funding process from initiation to operations... |
| `TransformationIndex` | Why the Fund | The case for a national transformation platform... |
| `PolicyChoicePage` | Policy Choice | Policy framework underpinning the Transformation Fund... |
| `TheoryPage` | Theory of Change | How the Fund drives systemic economic transformation... |
| `ValuePage` | Value Proposition | The Fund's unique value for entrepreneurs and investors... |
| `NationalAgendaPage` | National Agenda | Alignment with South Africa's national development goals... |
| `OperatingModelPage` | Operating Model | How the Transformation Fund operates and delivers... |
| `Requirements` | Requirements | Documentation and requirements for funding applications... |
| `NotFound` | Page Not Found | ... |

**3. New file: `public/sitemap.xml`**

Static sitemap listing all public routes with `https://sa-transformationfund.co.za` as base URL, `lastmod` set to current date, appropriate `changefreq` and `priority` values. Excludes admin routes.

**4. Update `public/robots.txt`**

Add `Sitemap: https://sa-transformationfund.co.za/sitemap.xml` directive.

**5. Update `index.html`**

Add fallback/default canonical link tag that the hook will override per-page.

---

### Technical Details
- The `useSEO` hook uses `useEffect` to create/update `<meta>` and `<link>` tags in `<head>`, with cleanup on unmount to restore defaults
- Each page component adds a single `useSEO({...})` call — minimal per-page change
- `NewsMediaDetailPage` will set dynamic SEO from the article data (title, excerpt, image)
- No external libraries needed

