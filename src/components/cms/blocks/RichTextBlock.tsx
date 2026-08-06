interface Props { data: Record<string, any>; }

const RichTextBlock = ({ data }: Props) => (
  <section className="py-10 md:py-14">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="max-w-[900px]">
        {data.heading && (
          <>
            <div className="w-[60px] h-1 bg-black mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">{data.heading}</h2>
          </>
        )}
        <div className="text-base md:text-lg text-[#555555] leading-relaxed whitespace-pre-line">{data.body}</div>
      </div>
    </div>
  </section>
);

export default RichTextBlock;
