interface Props { data: Record<string, any>; }

const CardGridBlock = ({ data }: Props) => (
  <section className="py-10 md:py-14">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      {data.heading && (
        <>
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">{data.heading}</h2>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(data.cards ?? []).map((card: any, i: number) => (
          <article
            key={i}
            className="bg-white p-8 md:p-10 flex flex-col border-l-4 border-black shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          >
            {card.number && (
              <div className="w-[50px] h-[50px] bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                {card.number}
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-black leading-[1.3] mb-4">{card.title}</h3>
            {card.body && <p className="text-base text-[#555555] whitespace-pre-line">{card.body}</p>}
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CardGridBlock;
