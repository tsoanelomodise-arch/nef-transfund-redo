import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props { data: Record<string, any>; }

const AccordionBlock = ({ data }: Props) => (
  <section className="py-10 md:py-14">
    <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
      {data.heading && (
        <>
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">{data.heading}</h2>
        </>
      )}
      <Accordion type="single" collapsible className="space-y-4">
        {(data.items ?? []).map((item: any, i: number) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-white border-l-4 border-black shadow-sm rounded-none px-6"
          >
            <AccordionTrigger className="text-left text-lg font-semibold text-black py-5 hover:text-[#00703C]">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#555555] pb-5 leading-relaxed whitespace-pre-line">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default AccordionBlock;
