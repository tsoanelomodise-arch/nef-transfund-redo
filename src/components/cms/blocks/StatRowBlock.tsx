interface Props { data: Record<string, any>; }

const StatRowBlock = ({ data }: Props) => (
  <section className="py-10 md:py-14 bg-[#f8f8f8]">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      {data.heading && <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">{data.heading}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(data.stats ?? []).map((s: any, i: number) => (
          <div key={i} className="bg-white p-6 border-l-4 border-black shadow-sm">
            <div className="text-3xl font-bold text-[#00703C] mb-2">{s.value}</div>
            <div className="text-sm text-[#555555]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatRowBlock;
