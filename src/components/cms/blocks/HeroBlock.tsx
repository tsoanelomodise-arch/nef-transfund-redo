interface Props { data: Record<string, any>; }

const HeroBlock = ({ data }: Props) => (
  <section className="phakamani-hero-bg py-10 md:py-16">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="max-w-3xl">
        {data.eyebrow && (
          <span className="block text-sm font-bold uppercase tracking-[2px] text-[#555555] mb-4">{data.eyebrow}</span>
        )}
        <div className="w-[60px] h-1 bg-black mb-4" />
        <h1 className="phakamani-headline mb-6">
          {data.heading}
          {data.highlight && <span className="text-[#00703C]"> {data.highlight}</span>}
        </h1>
        {data.body && <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-line">{data.body}</p>}
      </div>
    </div>
  </section>
);

export default HeroBlock;
