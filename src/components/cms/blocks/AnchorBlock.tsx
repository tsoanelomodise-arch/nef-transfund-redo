interface Props { data: Record<string, any>; }

/** Invisible in-page link target so menu/anchor links keep working, with header offset. */
const AnchorBlock = ({ data }: Props) => {
  if (!data.anchor) return null;
  return <div id={data.anchor} className="scroll-mt-[200px]" aria-hidden="true" />;
};

export default AnchorBlock;
