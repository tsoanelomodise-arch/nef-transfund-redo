interface Props { data: Record<string, any>; }

/** Contacts-style hero: heading + intro + two buttons on the left, QR/image card on the right. */
const ContactHeroBlock = ({ data }: Props) => (
  <section id={data.anchor || undefined} className={`max-w-[1200px] mx-auto px-6 py-16 ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="text-center lg:text-left">
        <div className="w-[60px] h-1 bg-[#111111] mb-4 mx-auto lg:mx-0" />
        {data.eyebrow && (
          <span className="inline-block text-sm font-bold uppercase tracking-[2px] text-[#111111] mb-3">{data.eyebrow}</span>
        )}
        <h1 className="text-[3rem] font-bold leading-[1.2] text-[#111111] mb-6 capitalize">{data.heading}</h1>
        {data.body && (
          <p className="text-[1.1rem] text-[#4a4a4a] mb-8 max-w-[450px] mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
            {data.body}
          </p>
        )}
        <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
          {data.primary_label && (
            <a
              href={data.primary_href || "#"}
              className="inline-block px-8 py-3 text-[0.9rem] font-semibold bg-[#111111] text-white hover:bg-[#333333] transition-all duration-300 capitalize"
            >
              {data.primary_label}
            </a>
          )}
          {data.secondary_label && (
            <a
              href={data.secondary_href || "#"}
              className="inline-block px-8 py-3 text-[0.9rem] font-semibold bg-transparent border border-[#e0e0e0] text-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 capitalize"
            >
              {data.secondary_label}
            </a>
          )}
        </div>
      </div>

      {data.image_url && (
        <div className="flex justify-center items-center">
          <div className="border border-[#e0e0e0] p-8 text-center">
            {data.image_href ? (
              <a href={data.image_href} target="_blank" rel="noopener noreferrer">
                <img loading="lazy" decoding="async" src={data.image_url} alt={data.image_alt || ""} className="w-[200px] h-[200px] mx-auto mb-4 object-contain" width={200} height={200} />
              </a>
            ) : (
              <img loading="lazy" decoding="async" src={data.image_url} alt={data.image_alt || ""} className="w-[200px] h-[200px] mx-auto mb-4 object-contain" width={200} height={200} />
            )}
            {data.image_caption && <p className="text-[0.8rem] text-[#4a4a4a]">{data.image_caption}</p>}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default ContactHeroBlock;
