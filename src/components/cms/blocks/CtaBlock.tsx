interface Props { data: Record<string, any>; }

const CtaBlock = ({ data }: Props) => (
  <section className="py-10 md:py-14">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="bg-white border-l-4 border-black shadow-sm p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-[720px]">
          {data.heading && <h2 className="text-2xl font-bold text-black mb-3">{data.heading}</h2>}
          {data.body && <p className="text-[#555555] whitespace-pre-line">{data.body}</p>}
        </div>
        {data.button_href && (
          <a
            href={data.button_href}
            className="inline-flex items-center justify-center bg-[#00703C] hover:bg-[#005c30] text-white font-bold uppercase px-6 py-3 rounded-md transition-colors shadow-md whitespace-nowrap"
          >
            {data.button_label || "Learn more"}
          </a>
        )}
      </div>
    </div>
  </section>
);

export default CtaBlock;
