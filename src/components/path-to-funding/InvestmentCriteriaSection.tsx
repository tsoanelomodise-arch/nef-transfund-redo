import React, { memo } from 'react';
import { Users, Building2, FileCheck, TrendingUp } from 'lucide-react';

const InvestmentCriteriaSection: React.FC = memo(() => {
  const criteria = [
    {
      icon: Users,
      title: 'Ownership',
      description: 'Minimum 51% Black ownership required for eligibility.',
      highlight: '51%+',
    },
    {
      icon: Building2,
      title: 'Registration',
      description: 'Business must be registered with CIPC as a legal entity.',
      highlight: 'CIPC',
    },
    {
      icon: FileCheck,
      title: 'Compliance',
      description: 'Must be tax compliant with valid SARS tax clearance.',
      highlight: 'SARS',
    },
    {
      icon: TrendingUp,
      title: 'Turnover',
      description: 'Annual turnover requirements vary by funding tier.',
      highlight: 'R10M-R50M',
    },
  ];

  return (
    <section id="how-it-works" className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-[hsl(var(--ptf-accent))]/10 text-[hsl(var(--ptf-accent))] rounded-full text-sm font-semibold mb-4">
            Requirements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--ptf-heading))] mb-4">
            Investment Criteria
          </h2>
          <p className="text-lg text-[hsl(var(--ptf-text))] max-w-2xl mx-auto">
            To qualify for funding, your business must meet the following criteria.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {criteria.map((item, index) => (
            <div
              key={index}
              className="ptf-criteria-card group relative bg-gradient-to-br from-[hsl(var(--ptf-card-bg))] to-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 text-3xl font-bold text-[hsl(var(--ptf-accent))]/10 group-hover:text-[hsl(var(--ptf-accent))]/20 transition-colors">
                {item.highlight}
              </div>
              
              <div className="w-14 h-14 bg-[hsl(var(--ptf-accent))] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-[hsl(var(--ptf-heading))] mb-2">
                {item.title}
              </h3>
              
              <p className="text-[hsl(var(--ptf-text))] text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#E31C23]/5 to-[#E31C23]/10 rounded-2xl p-8 border border-[#E31C23]/20">
            <h3 className="text-xl font-bold text-[#E31C23] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#E31C23] rounded-full flex items-center justify-center text-white text-sm">i</span>
              Important Note
            </h3>
            <p className="text-[hsl(var(--ptf-text))] leading-relaxed">
              Meeting checklist criteria does not guarantee funding approval. Each application is assessed individually based on business viability, 
              growth potential, and alignment with the Transformation Fund's objectives. We encourage all eligible businesses to apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

InvestmentCriteriaSection.displayName = 'InvestmentCriteriaSection';

export default InvestmentCriteriaSection;
