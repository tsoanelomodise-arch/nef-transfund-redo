interface Props { data: Record<string, any>; }

/** Image on one side, an eyebrow/heading and a marked list of points on the other. */
const ImageListBlock = ({ data }: Props) => {
  const imageRight = data.image_position === "right";

  const image = (
    <div className="min-h-[300px] overflow-hidden">
      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.image_alt || ""}
          loading="lazy"
          className="w-full h-full object-cover min-h-[300px]"
        />
      )}
    </div>
  );

  const text = (
    <div className={imageRight ? "md:pr-8" : "md:pl-8"}>
      {data.eyebrow && (
        <span className="inline-block text-sm font-bold uppercase tracking-[2px] pl-4 border-l-[3px] border-[#111111] text-[#111111] mb-4">
          {data.eyebrow}
        </span>
      )}
      {data.heading && (
        <h2 className="text-3xl md:text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-[#111111] mb-8">
          {data.heading}
        </h2>
      )}
      <ul className="list-none mt-8">
        {(data.items ?? []).map((item: any, i: number) => (
          <li key={i} className="relative pl-10 mb-6 text-[#222222] font-medium">
            <span className="absolute left-0 top-0 w-6 h-6 bg-[#cccccc] rounded-sm" />
            {typeof item === "string" ? item : item?.text}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id={data.anchor || undefined} className={`py-16 md:py-20 bg-[#f4f4f4] ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imageRight ? (
            <>
              {text}
              {image}
            </>
          ) : (
            <>
              {image}
              {text}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageListBlock;
