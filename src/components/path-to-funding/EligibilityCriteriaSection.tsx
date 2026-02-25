import React, { memo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus } from 'lucide-react';

const EligibilityCriteriaSection: React.FC = memo(() => {
  const eligibilityItems = [
    {
      title: 'Informal and start-up enterprises',
      content: 'Includes township traders, emerging farmers, and micro manufacturers needing support to formalise and grow. These greenfield ventures often lie outside formal supply chains and lack access to capital.',
    },
    {
      title: 'Early-stage industrial and high-impact ventures',
      content: 'Targets Black Industrialist projects and strategic sectors such as manufacturing, agro-processing, mineral beneficiation, and green economy. These ventures require patient, risk-tolerant capital to scale.',
    },
    {
      title: 'Growth-phase MSMEs',
      content: 'Supports small and medium enterprises that have survived initial hurdles and are ready to expand, but face barriers accessing conventional finance due to collateral or paperwork requirements.',
    },
    {
      title: 'Mid-size firms graduating to large enterprises',
      content: 'Backs majority Black-owned firms with proven unit economics aiming for structural growth through technology upgrades, M&A, and market expansion, while preserving Black ownership.',
    },
    {
      title: 'Cooperatives and collective enterprises',
      content: 'Includes community-owned entities such as agricultural cooperatives and village savings groups, especially in rural and township areas. Support will be tailored to help them scale and access larger markets.',
    },
    {
      title: 'Youth-, women-, and designated group-led businesses',
      content: 'Prioritises enterprises led by black women, youth, and people with disabilities. A mandated portion of funding is reserved for these groups, with flexible requirements and linked technical support.',
    },
    {
      title: 'Township and rural enterprises',
      content: 'Special emphasis is placed on businesses located in disadvantaged geographies. Dedicated funding and on-site support will help overcome infrastructure and market access barriers.',
    },
  ];

  return (
    <section id="eligibility-criteria" className="py-10 md:py-14 bg-[#F8FAFC]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Content Section */}
        <div className="space-y-8">
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Eligibility and criteria
          </h2>

          <p className="text-lg text-[#64748B] leading-relaxed">
            The Transformation Fund is designed to serve a broad yet intentionally segmented market of majority Black-owned enterprises that are underserved by traditional finance.
          </p>

          <p className="text-base text-[#334155] leading-relaxed">
            Applicants will need to show that their businesses are legally compliant, properly registered and meet basic operational and financial management standards. This approach will ensure that support is provided to enterprises that are ready to succeed and contribute to economic development. Eligibility is segmented across firm types and structural contexts to ensure inclusive coverage. This includes:
          </p>

          {/* Accordion */}
          <div className="mt-8">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
              {eligibilityItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-[#E2E8F0] px-6 shadow-sm hover:border-[#D97706] transition-colors data-[state=open]:border-[#D97706]"
                >
                  <AccordionTrigger className="text-left text-[#0F172A] font-semibold py-5 hover:no-underline group [&>svg]:hidden">
                    <span className="flex-1">{item.title}</span>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#D97706] transition-transform duration-200 group-data-[state=open]:rotate-45">
                      <Plus className="w-5 h-5" strokeWidth={2.5} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#334155] pb-5 leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
});

EligibilityCriteriaSection.displayName = 'EligibilityCriteriaSection';

export default EligibilityCriteriaSection;
