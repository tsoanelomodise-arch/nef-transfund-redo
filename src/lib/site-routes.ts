/** Public pages of the site that an admin may hide from visitors. Admin routes are never listed. */
export interface SiteRoute {
  route: string;
  label: string;
  group: string;
}

export const SITE_ROUTES: SiteRoute[] = [
  { route: "/about", label: "About", group: "About" },
  { route: "/about/why", label: "Fund purpose", group: "About" },
  { route: "/about/why/policy-choice", label: "Fund Policy", group: "About" },

  { route: "/eligibility", label: "Access to Capital", group: "Access to Capital" },
  { route: "/eligibility/process", label: "Funding Process", group: "Access to Capital" },
  { route: "/eligibility/market-segments", label: "Market segments", group: "Access to Capital" },
  { route: "/eligibility/products", label: "Products", group: "Access to Capital" },
  { route: "/requirements", label: "Requirements", group: "Access to Capital" },
  { route: "/startup-grants", label: "Startup grants", group: "Access to Capital" },

  { route: "/access-to-capability", label: "Access to Capability", group: "Capability & Markets" },
  { route: "/access-to-markets", label: "Access to Markets", group: "Capability & Markets" },

  { route: "/investors", label: "Capitalisation", group: "Investors" },
  { route: "/investors/governance", label: "Governance", group: "Investors" },

  { route: "/resources", label: "Resources", group: "Resources" },
  { route: "/faq", label: "FAQ", group: "Resources" },
  { route: "/careers", label: "Careers", group: "Resources" },
  { route: "/news-media", label: "News & Media", group: "Resources" },

  { route: "/contacts", label: "Contacts", group: "Other" },
  { route: "/uat2_hta_portal", label: "Portal", group: "Other" },
];

/** True when `pathname` is the hidden route itself or one of its sub-pages. */
export const matchesRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);
