interface Props { data: Record<string, any>; }

/** Numbered outline cards in a three-column grid, each with one or more paragraphs. */
const FeatureCardsBlock = ({ data }: Props) => (
  <section id={data.anchor || undefined} className={`py-16 md:py-20 bg-white ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
    <div className="max-w-[1200px] mx-auto px-8">
      {(data.eyebrow || data.heading || data.intro) && (
        <div className="max-w-[800px] mb-12">
          {data.eyebrow && (
            <span className="inline-block text-sm font-bold uppercase tracking-[2px] pl-4 border-l-[3px] border-[#111111] text-[#111111] mb-4">
              {data.eyebrow}
            </span>
          )}
          {data.heading && (
            <h2 className="text-3xl md:text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-[#111111] mb-4">
              {data.heading}
            </h2>
          )}
          {data.intro && <p className="text-[#555555] whitespace-pre-line">{data.intro}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(data.cards ?? []).map((card: any, i: number) => {
          const paragraphs: string[] = Array.isArray(card.paragraphs)
            ? card.paragraphs
            : String(card.body ?? "").split("\n\n").filter(Boolean);
          return (
            <div
              key={i}
              className="border border-[#e0e0e0] p-8 bg-white flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#111111] group"
            >
              {card.number && (
                <div className="text-[2.5rem] font-black text-[#e0e0e0] leading-none mb-4 transition-colors duration-300 group-hover:text-[#111111]">
                  {card.number}
                </div>
              )}
              <h3 className="text-xl font-bold uppercase tracking-[1px] text-[#111111] mb-4">{card.title}</h3>
              {paragraphs.map((p, pi) => (
                <p key={pi} className="text-[0.95rem] text-[#555555] mb-2 last:mb-0 whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeatureCardsBlock;
