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
  | "anchor"
  | "intro_split"
  | "image_list"
  | "side_label"
  | "feature_cards";


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
  intro_split: "Intro with overlapping images",
  image_list: "Image + bulleted list",
  side_label: "Dark panel with side label",
  feature_cards: "Numbered outline cards (3 columns)",

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
  intro_split: {
    eyebrow: "",
    heading: "Heading",
    lead: "",
    body: "",
    back_image_url: "",
    back_image_alt: "",
    front_image_url: "",
    front_image_alt: "",
    anchor: "",
  },
  image_list: {
    eyebrow: "",
    heading: "Heading",
    image_url: "",
    image_alt: "",
    image_position: "left",
    items: ["First point"],
    anchor: "",
  },
  side_label: { heading: "Heading", side_label: "", paragraphs: ["Write your content here."], anchor: "" },
  feature_cards: {
    eyebrow: "",
    heading: "Heading",
    intro: "",
    cards: [{ number: "01", title: "Card title", paragraphs: [""] }],
    anchor: "",
  },

};
