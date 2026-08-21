import { TfMail, TfPhone, TfPin, TfClock, TfGlobe, TfMessage } from "@/components/icons";

interface Props { data: Record<string, any>; }

const ICONS: Record<string, typeof TfMail> = {
  mail: TfMail,
  phone: TfPhone,
  address: TfPin,
  clock: TfClock,
  globe: TfGlobe,
  message: TfMessage,
};

/** Dark contact cards (email, phone, address, hours) in a four-column grid. */
const ContactCardsBlock = ({ data }: Props) => (
  <section id={data.anchor || undefined} className={`py-16 ${data.anchor ? "scroll-mt-[200px]" : ""}`}>
    <div className="max-w-[1200px] mx-auto px-6">
      {data.heading && (
        <h2 className="text-center text-[2rem] font-bold text-[#111111] mb-12 capitalize">{data.heading}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(data.cards ?? []).map((card: any, i: number) => {
          const Icon = ICONS[card.icon] ?? TfMail;
          const lines: any[] = Array.isArray(card.lines) ? card.lines : [];
          return (
            <div key={i} className="bg-[#111111] text-white p-8 flex flex-col">
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-[18px] h-[18px] text-white" />
              </div>
              <h3 className="text-white text-[1.1rem] font-bold mb-4">{card.title}</h3>
              {lines.map((line, li) => {
                const text = typeof line === "string" ? line : line.text;
                const href = typeof line === "string" ? "" : line.href;
                return href ? (
                  <a key={li} href={href} className="text-[#cccccc] text-[0.85rem] mb-2 last:mb-0 block hover:text-white hover:underline transition-colors">
                    {text}
                  </a>
                ) : (
                  <p key={li} className="text-[#cccccc] text-[0.85rem] mb-2 last:mb-0 whitespace-pre-line">{text}</p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ContactCardsBlock;
