import type { CmsBlock } from "@/types/cms";
import HeroBlock from "./blocks/HeroBlock";
import RichTextBlock from "./blocks/RichTextBlock";
import CardGridBlock from "./blocks/CardGridBlock";
import AccordionBlock from "./blocks/AccordionBlock";
import StatRowBlock from "./blocks/StatRowBlock";
import CtaBlock from "./blocks/CtaBlock";
import DocumentListBlock from "./blocks/DocumentListBlock";
import TableBlock from "./blocks/TableBlock";
import ImageBlock from "./blocks/ImageBlock";
import PillarsBlock from "./blocks/PillarsBlock";
import TwoColumnBlock from "./blocks/TwoColumnBlock";
import AnchorBlock from "./blocks/AnchorBlock";
import IntroSplitBlock from "./blocks/IntroSplitBlock";
import ImageListBlock from "./blocks/ImageListBlock";
import SideLabelBlock from "./blocks/SideLabelBlock";
import FeatureCardsBlock from "./blocks/FeatureCardsBlock";

const MAP: Record<string, (p: { data: Record<string, any> }) => JSX.Element | null> = {
  hero: HeroBlock,
  richtext: RichTextBlock,
  card_grid: CardGridBlock,
  accordion: AccordionBlock,
  stat_row: StatRowBlock,
  cta: CtaBlock,
  document_list: DocumentListBlock,
  table: TableBlock,
  image: ImageBlock,
  pillars: PillarsBlock,
  two_column: TwoColumnBlock,
  anchor: AnchorBlock,
  intro_split: IntroSplitBlock,
  image_list: ImageListBlock,
  side_label: SideLabelBlock,
  feature_cards: FeatureCardsBlock,
};


const BlockRenderer = ({ blocks }: { blocks: CmsBlock[] }) => (
  <>
    {blocks.map((block) => {
      const Component = MAP[block.type];
      if (!Component) return null;
      return <Component key={block.id} data={block.data ?? {}} />;
    })}
  </>
);

export default BlockRenderer;
