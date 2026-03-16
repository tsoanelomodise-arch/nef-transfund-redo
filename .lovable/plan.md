

## Plan: Fix Search to Index All Website Content

### Problem
Two issues prevent "eligibility requirements" (and other queries) from returning results:

1. **`useExtendedSearch: true`** in Fuse.js config changes how queries are parsed --- space-separated words get treated as special operators instead of normal search terms, breaking standard queries.

2. **Many pages are not indexed.** The current index has ~35 entries but is missing content from most site pages.

### Changes

**File 1: `src/lib/search/search-engine.ts`**
- Remove `useExtendedSearch: true` from Fuse options so normal multi-word queries work correctly.

**File 2: `src/lib/search/content-index.ts`**
Add entries for all unindexed page content (~25-30 new entries):

| Page | Content to Index |
|------|-----------------|
| `/eligibility` | Eligibility criteria section (7 accordion items: informal enterprises, early-stage ventures, growth-phase MSMEs, mid-size firms, cooperatives, designated groups, township/rural) |
| `/eligibility/products` | 4 funding products (startup grants, growth loans, equity instruments, blended finance) |
| `/eligibility/market-segments` | 3 foundations (ownership, geographic, enterprise stage) + 7 priority sectors (renewable energy, mining, agro-processing, ICT, infrastructure, manufacturing, services/BPO) |
| `/eligibility/process` | 8 funding process stages (initiation through operations handover) |
| `/investors` | 5 investment channels (EEIP, ESD, DFIs, donors, innovative financing) + mid-sized firms section |
| `/investors/governance` | Governance framework, board oversight, digital oversight, public reporting |
| `/about` | Objectives (4 items), The Method, The Architecture (5 pillars) |
| `/requirements` | 4 requirement categories (general, business docs, legal/compliance, financial) |
| `/startup-grants` | Startup grant program overview |

Each entry will have appropriate `type`, `category`, `audience`, `keywords`, and `priority` fields following the existing pattern.

### Technical Details
- Removing `useExtendedSearch` is the critical fix --- it alone should make "eligibility requirements" work with the existing FAQ entries
- New entries expand coverage from ~35 to ~65 items, ensuring every page section is searchable
- No changes to search UI, hooks, or types needed

