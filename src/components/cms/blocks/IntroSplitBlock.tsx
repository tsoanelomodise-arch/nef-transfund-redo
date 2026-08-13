interface Props { data: Record<string, any>; }

/** Intro section: eyebrow + heading, with two overlapping images beside the text. */
const IntroSplitBlock = ({ data }: Props) => (
  <section id={data.anchor || undefined} className={`py-16 md:py-20 pb-24 bg-white ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
    <div className="max-w-[1200px] mx-auto px-8">
      {(data.eyebrow || data.heading) && (
        <div className="max-w-[800px] mb-12">
          {data.eyebrow && (
            <span className="inline-block text-sm font-bold uppercase tracking-[2px] pl-4 border-l-[3px] border-[#111111] text-[#111111] mb-4">
              {data.eyebrow}
            </span>
          )}
          {data.heading && (
            <h2 className="text-3xl md:text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-[#111111]">
              {data.heading}
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div className="relative h-[320px] md:h-[400px] max-w-[500px]">
          {data.back_image_url && (
            <img
              src={data.back_image_url}
              alt={data.back_image_alt || ""}
              loading="lazy"
              className="absolute bottom-0 right-0 w-[80%] z-[1] object-contain"
            />
          )}
          {data.front_image_url && (
            <img
              src={data.front_image_url}
              alt={data.front_image_alt || ""}
              loading="lazy"
              className="absolute bottom-0 left-0 w-[70%] z-[2] object-contain"
            />
          )}
        </div>

        <div>
          {data.lead && (
            <p className="text-xl font-medium text-[#111111] mb-6 whitespace-pre-line">{data.lead}</p>
          )}
          {data.body && <p className="text-[#555555] whitespace-pre-line">{data.body}</p>}
        </div>
      </div>
    </div>
  </section>
);

export default IntroSplitBlock;
