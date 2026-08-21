import type { NavItem, CmsDocument } from "@/types/cms";

export interface MenuNode {
  id: string;
  label: string;
  href: string | null;
  documentPath?: string | null;
  children: MenuNode[];
}

/** The site menu as it ships in code. Used until the client saves menu items in the admin. */
export const DEFAULT_MENU: MenuNode[] = [
  {
    id: "about",
    label: "About",
    href: "/about",
    children: [
      { id: "about-why", label: "Fund purpose", href: "/about/why", children: [] },
      { id: "about-policy", label: "Fund Policy", href: "/about/why/policy-choice", children: [] },
    ],
  },
  {
    id: "eligibility",
    label: "Access to Capital",
    href: "/eligibility",
    children: [
      { id: "elig-process", label: "Funding Process", href: "/eligibility/process", children: [] },
      { id: "elig-segments", label: "Market segments", href: "/eligibility/market-segments", children: [] },
      { id: "elig-products", label: "Products", href: "/eligibility/products", children: [] },
      { id: "elig-checklist", label: "Eligibility Checklist", href: "/eligibility#path-to-funding", children: [] },
    ],
  },
  {
    id: "access-capability",
    label: "Access to Capability",
    href: "/access-to-capability",
    children: [
      { id: "cap-journey", label: "Capability Journey", href: "/access-to-capability#capability-journey", children: [] },
      { id: "cap-interventions", label: "Support Interventions", href: "/access-to-capability#support-interventions", children: [] },
      { id: "cap-documents", label: "Required Documents", href: "/access-to-capability#documents-section", children: [] },
    ],
  },
  {
    id: "access-markets",
    label: "Access to Markets",
    href: "/access-to-markets",
    children: [
      { id: "mkt-how", label: "How it Works", href: "/access-to-markets#markets-journey", children: [] },
      { id: "mkt-opps", label: "Market Opportunities", href: "/access-to-markets#markets-opportunities", children: [] },
    ],
  },
  {
    id: "investors",
    label: "Investors",
    href: null,
    children: [
      { id: "inv-cap", label: "Capitalisation", href: "/investors", children: [] },
      { id: "inv-gov", label: "Governance", href: "/investors/governance", children: [] },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    children: [
      { id: "res-faq", label: "FAQ", href: "/faq", children: [] },
      { id: "res-careers", label: "Careers", href: "/careers", children: [] },
      {
        id: "res-tf",
        label: "TF Framework",
        href: "/resources/Transformation_Fund_Framework_FINAL_03_March_2026.pdf",
        children: [],
      },
      { id: "news", label: "News", href: "/news-media", children: [] },
    ],
  },
  { id: "contacts", label: "Contacts", href: "/contacts", children: [] },
  {
    id: "portal",
    label: "Portal",
    href: "/uat2_hta_portal",
    children: [
      { id: "portal-login", label: "Login", href: "https://dev-online.sa-transformationfund.co.za/", children: [] },
      {
        id: "portal-register",
        label: "Register",
        href: "https://dev-online.sa-transformationfund.co.za/Account/Register",
        children: [],
      },
    ],
  },
];

/** Turns the flat nav_items rows into a menu tree. Returns null when nothing is configured. */
export function buildMenuTree(items?: NavItem[] | null, documents?: CmsDocument[] | null): MenuNode[] | null {
  const visible = (items ?? []).filter((i) => i.visible);
  if (!visible.length) return null;

  const docPath = (id: string | null) =>
    id ? (documents ?? []).find((d) => d.id === id)?.storage_path ?? null : null;

  const byPosition = (a: NavItem, b: NavItem) => a.position - b.position;
  const toNode = (item: NavItem): MenuNode => ({
    id: item.id,
    label: item.label,
    href: item.href,
    documentPath: docPath(item.document_id),
    children: visible.filter((c) => c.parent_id === item.id).sort(byPosition).map(toNode),
  });

  return visible.filter((i) => !i.parent_id).sort(byPosition).map(toNode);
}

export const isExternal = (href?: string | null) => !!href && /^https?:\/\//i.test(href);
export const isFileLink = (href?: string | null) => !!href && /\.(pdf|docx?|xlsx?|pptx?|zip)$/i.test(href);