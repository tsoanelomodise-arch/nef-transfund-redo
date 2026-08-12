interface Props { data: Record<string, any>; }

const TwoColumnBlock = ({ data }: Props) => {
  const imageFirst = data.image_position === "left";
  const image = data.image_url ? (
    <img src={data.image_url} alt={data.image_alt || ""} loading="lazy" className="w-full h-auto object-contain" />
  ) : null;

  return (
    <section id={data.anchor || undefined} className={`py-10 md:py-14 ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {imageFirst && image}
        <div>
          {data.heading && (
            <>
              <div className="w-[60px] h-1 bg-black mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">{data.heading}</h2>
            </>
          )}
          {data.body && <p className="text-base text-[#555555] whitespace-pre-line">{data.body}</p>}
        </div>
        {!imageFirst && image}
      </div>
    </section>
  );
};

export default TwoColumnBlock;
