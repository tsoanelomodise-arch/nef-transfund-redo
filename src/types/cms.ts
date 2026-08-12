export type BlockType =
  | "hero"
  | "richtext"
  | "card_grid"
  | "accordion"
  | "stat_row"
  | "cta"
  | "document_list"
  | "table"
  | "image"
  | "pillars"
  | "two_column"
  | "anchor";

export type PageStatus = "draft" | "published";

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  template: string;
  seo_title: string | null;
  seo_description: string | null;
  status: PageStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsPageVersion {
  id: string;
  page_id: string;
  status: PageStatus;
  created_at: string;
  updated_at: string;
}

export interface CmsBlock {
  id: string;
  version_id: string;
  type: BlockType;
  position: number;
  data: Record<string, any>;
}

export interface NavItem {
  id: string;
  parent_id: string | null;
  label: string;
  href: string | null;
  document_id: string | null;
  position: number;
  visible: boolean;
}

export interface CmsDocument {
  id: string;
  title: string;
  description: string | null;
  storage_path: string;
  file_type: string | null;
  file_size: number | null;
  visible: boolean;
  position: number;
  created_at: string;
}

export interface CmsMedia {
  id: string;
  storage_path: string;
  alt_text: string | null;
  file_name: string | null;
  file_size: number | null;
  created_at: string;
}

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero banner",
  richtext: "Text section",
  card_grid: "Card grid",
  accordion: "Accordion (FAQ)",
  stat_row: "Statistics row",
  cta: "Call to action",
  document_list: "Document list",
  table: "Table",
  image: "Image",
  pillars: "Numbered steps / pillars",
  two_column: "Text + image (two columns)",
  anchor: "Anchor link target",
};

export const DEFAULT_BLOCK_DATA: Record<BlockType, Record<string, any>> = {
  hero: { eyebrow: "", heading: "Heading", highlight: "", body: "" },
  richtext: { heading: "", body: "Write your content here." },
  card_grid: { heading: "", cards: [{ number: "01", title: "Card title", body: "" }] },
  accordion: { heading: "", items: [{ question: "Question", answer: "Answer" }] },
  stat_row: { heading: "", stats: [{ value: "0", label: "Label" }] },
  cta: { heading: "", body: "", button_label: "Learn more", button_href: "/" },
  document_list: { heading: "Downloads", document_ids: [] },
  table: { heading: "", columns: ["Column 1", "Column 2"], rows: [["", ""]] },
  image: { url: "", alt: "", caption: "" },
  pillars: { heading: "", anchor: "", steps: [{ number: "01", title: "Step title", body: "" }] },
  two_column: { heading: "", body: "", image_url: "", image_alt: "", image_position: "right", anchor: "" },
  anchor: { anchor: "section-name" },
};
