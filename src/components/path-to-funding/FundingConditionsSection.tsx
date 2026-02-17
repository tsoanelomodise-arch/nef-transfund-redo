import React, { memo } from 'react';
import { ClipboardCheck, FileText, Send } from 'lucide-react';

interface FundingConditionsSectionProps {
  onCheckEligibility: () => void;
  onCheckDocuments: () => void;
  onApply: () => void;
  appState: { elig: boolean; docs: boolean };
}

const FundingConditionsSection: React.FC<FundingConditionsSectionProps> = memo(({
  onCheckEligibility,
  onCheckDocuments,
  onApply,
  appState
}) => {
  const portalUrl = 'https://tfportaltest-bjggc8febhc3aucy.southafricanorth-01.azurewebsites.net/';

  const steps = [
    {
      number: 1,
      icon: ClipboardCheck,
      title: 'Eligibility Checklist',
      description: 'Use the eligibility checklist to ensure your business is ready for funding support.',
      action: onCheckEligibility,
      actionText: 'Click here',
      completed: appState.elig,
    },
    {
      number: 2,
      icon: FileText,
      title: 'Document Checklist',
      description: 'Use our document checklist to ensure you have all required documentation ready.',
      action: onCheckDocuments,
      actionText: 'Click here',
      completed: appState.docs,
    },
    {
      number: 3,
      icon: Send,
      title: 'Submit Application',
      description: 'Once prepared, submit your application through our online portal.',
      action: () => window.open(portalUrl, '_blank'),
      actionText: 'Apply Now',
      completed: false,
      requiresBoth: true,
    },
  ];

  return (
    <section id="path-to-funding" className="py-8 bg-[hsl(var(--ptf-section-bg))]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-[hsl(var(--ptf-accent))]/10 text-[hsl(var(--ptf-accent))] rounded-full text-sm font-semibold mb-4">
            Getting Started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--ptf-heading))] mb-4">
            Eligibility & Document Checklist
          </h2>
          <p className="text-lg text-[hsl(var(--ptf-text))] max-w-2xl mx-auto">
            Follow these three simple steps to apply for funding support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`ptf-step-card relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                step.completed ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {step.completed && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              <div className="ptf-step-icon w-16 h-16 bg-[hsl(var(--ptf-accent))]/10 rounded-xl flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-[hsl(var(--ptf-accent))]" />
              </div>
              
              <div className="text-sm font-semibold text-[hsl(var(--ptf-accent))] mb-2">
                Step {step.number}
              </div>
              
              <h3 className="text-xl font-bold text-[hsl(var(--ptf-heading))] mb-3">
                {step.title}
              </h3>
              
              <p className="text-[hsl(var(--ptf-text))] mb-6 leading-relaxed">
                {step.description}
              </p>
              
              <button
                onClick={step.action}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  step.requiresBoth && (!appState.elig || !appState.docs)
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[hsl(var(--ptf-accent))] text-white hover:bg-[hsl(var(--ptf-accent-hover))]'
                }`}
                disabled={step.requiresBoth && (!appState.elig || !appState.docs)}
              >
                {step.completed ? '✓ Completed' : step.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FundingConditionsSection.displayName = 'FundingConditionsSection';

export default FundingConditionsSection;
