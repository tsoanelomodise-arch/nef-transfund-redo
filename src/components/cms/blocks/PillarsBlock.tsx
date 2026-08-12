interface Props { data: Record<string, any>; }

const PillarsBlock = ({ data }: Props) => (
  <section id={data.anchor || undefined} className={`py-10 md:py-14 ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      {data.heading && (
        <>
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">{data.heading}</h2>
        </>
      )}
      <ol className="space-y-6">
        {(data.steps ?? []).map((step: any, i: number) => (
          <li
            key={i}
            className="bg-white p-6 md:p-8 border-l-4 border-black shadow-sm flex gap-6 items-start transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="w-[50px] h-[50px] shrink-0 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
              {step.number || String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-black leading-[1.3] mb-2">{step.title}</h3>
              {step.body && <p className="text-base text-[#555555] whitespace-pre-line">{step.body}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default PillarsBlock;
