interface Props { data: Record<string, any>; }

/** Embedded Google map, driven by a plain address typed in the admin. */
const MapBlock = ({ data }: Props) => {
  const src =
    data.embed_url ||
    (data.address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=${data.zoom || 15}&ie=UTF8&iwloc=&output=embed`
      : "");
  if (!src) return null;

  return (
    <section id={data.anchor || undefined} className={`py-16 bg-[#f4f4f4] ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        {data.heading && <h2 className="text-[2rem] font-bold text-[#111111] mb-8 capitalize">{data.heading}</h2>}
        <div className="w-full h-[450px] bg-[#e5e3df] overflow-hidden">
          <iframe
            title={data.title || data.heading || "Location map"}
            width="100%"
            height="100%"
            src={src}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default MapBlock;
