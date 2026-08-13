interface Props { data: Record<string, any>; }

/** Dark panel with a large vertical side label and a stack of paragraphs. */
const SideLabelBlock = ({ data }: Props) => (
  <section
    id={data.anchor || undefined}
    className={`py-16 md:py-20 bg-[#5D5E60] text-white ${data.anchor ? "scroll-mt-[200px]" : ""}`}
  >
    <div className="max-w-[1200px] mx-auto px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">
        <div className="border-l border-white/20 pl-8 flex flex-col justify-center">
          <h2 className="lg:hidden text-3xl font-bold uppercase tracking-[-0.5px] text-white mb-8">
            {data.heading}
          </h2>
          <h2
            className="hidden lg:block text-[3rem] font-bold uppercase tracking-[5px] text-white"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
          >
            {data.side_label || data.heading}
          </h2>
        </div>
        <div>
          {data.heading && (
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/30 pb-4">{data.heading}</h3>
          )}
          {(data.paragraphs ?? []).map((p: any, i: number, arr: any[]) => (
            <p
              key={i}
              className={`text-lg text-[#f0f0f0] whitespace-pre-line ${i === arr.length - 1 ? "mb-0" : "mb-6"}`}
            >
              {typeof p === "string" ? p : p?.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SideLabelBlock;
