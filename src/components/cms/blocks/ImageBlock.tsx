interface Props { data: Record<string, any>; }

const ImageBlock = ({ data }: Props) => {
  if (!data.url) return null;
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <img src={data.url} alt={data.alt || ""} loading="lazy" className="w-full h-auto object-contain" />
        {data.caption && <p className="text-sm text-[#555555] mt-3">{data.caption}</p>}
      </div>
    </section>
  );
};

export default ImageBlock;
