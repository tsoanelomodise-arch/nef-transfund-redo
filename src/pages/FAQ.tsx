import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";

const faqs = [
  {
    question: "What is the Transformation Fund?",
    answer: "The Transformation Fund is a government-backed initiative designed to provide financial support to Black-owned businesses in South Africa. We offer various funding options including grants, loans, and equity investments to help entrepreneurs grow and scale their businesses.",
  },
  {
    question: "What are the eligibility requirements for funding?",
    answer: `Eligibility varies by program, but general requirements include:

• South African registered business or individual
• Clear business plan and financial projections  
• Compliance with regulatory requirements
• Demonstration of economic impact potential
• Meeting specific program criteria (B-BBEE status, sector focus, etc.)`,
  },
  {
    question: "How much funding can I apply for?",
    answer: "Funding amounts vary based on your business needs and eligibility. We offer support ranging from R50,000 for early-stage businesses up to R10 million for established enterprises. The exact amount will be determined during the assessment process based on your business plan and requirements.",
  },
  {
    question: "How long does the application process take?",
    answer: `Application timelines vary by program complexity:

**Standard Applications:** 14-21 business days for review and approval

**Complex Applications:** 30-45 business days for comprehensive due diligence`,
  },
  {
    question: "What documents do I need to apply?",
    answer: `Required documentation typically includes:

**Business Documents:**
• Company registration certificate
• Tax clearance certificate  
• B-BBEE certificate (if applicable)
• Audited financial statements

**Project Documents:**
• Detailed business plan
• Financial projections
• Market analysis
• Impact assessment`,
  },
  {
    question: "Can I apply if my business is less than 12 months old?",
    answer: "Yes, we have specific funding programs for early-stage businesses. While some programs require a longer operational history, our Start-up Grant program is specifically designed for businesses under 12 months old. Check your eligibility using our quiz on the How to Apply page.",
  },
  {
    question: "What support do you provide beyond funding?",
    answer: `We provide comprehensive support throughout your journey:

**Business Development:** Strategic planning and market research support

**Mentorship:** Access to experienced business leaders

**Training:** Skills development and capacity building`,
  },
  {
    question: "Can I apply for multiple funding programs?",
    answer: `Yes, you can apply for multiple programs, but there are guidelines:

**Recommended Approach:** Start with one program that best fits your current needs, then explore additional programs as your business grows.

• Each application is evaluated independently
• Funding amounts may be adjusted to prevent over-leveraging
• Our specialists can help you choose the optimal combination
• Sequential applications often work better than simultaneous ones`,
  },
  {
    question: "Is there any cost to apply?",
    answer: "No, there is absolutely no fee to apply for funding through the Transformation Fund. Beware of any third parties claiming to charge application fees on our behalf – this is a scam.",
  },
  {
    question: "What happens after my application is approved?",
    answer: "Once approved, you'll receive a formal offer letter outlining the terms. After accepting, funds are typically disbursed within 2-4 weeks. You'll also be assigned a relationship manager to support you throughout your funding journey.",
  },
  {
    question: "What happens if my application is declined?",
    answer: `We believe in supporting your success, even if your initial application isn't approved:

**Detailed Feedback:** Receive specific reasons for decline and improvement recommendations

**Reapplication Support:** Access to mentorship to strengthen your next application

**Alternative Programs:** Guidance on other programs that might be a better fit

**Development Resources:** Access to training and development programs`,
  },
  {
    question: "Can I reapply if my application is rejected?",
    answer: "Yes, you can reapply after 6 months. We recommend addressing the reasons for rejection before reapplying. Our team will provide feedback on your application to help you improve your chances in future applications.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      
      <main>
        {/* Hero Section */}
        <section className="phakamani-hero-bg py-10 md:py-16">
          <div className="max-w-[1400px] mx-auto px-10">
            <div className="max-w-3xl">
              <div className="w-[60px] h-1 bg-black mb-4" />
              <h1 className="phakamani-headline mb-6">
                Frequently Asked <span className="text-[#00703C]">Questions</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Find answers to common questions about the Transformation Fund, 
                eligibility requirements, application process, and the support we provide.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-10 bg-white">
          <div className="max-w-[1400px] mx-auto px-10">
            
            <div className="max-w-4xl">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-8 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 will-change-transform [transform:translateZ(0)]"
                  >
                    <AccordionTrigger className="text-left text-lg font-bold text-black hover:text-[#00703C] transition-colors py-6 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 pb-6 leading-relaxed whitespace-pre-line text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 p-8 bg-gray-50 border border-gray-200 rounded-2xl max-w-4xl">
              <p className="text-gray-500 mb-4">
                Still have questions? We're here to help.
              </p>
              <a
                href="/contacts"
                className="inline-flex items-center gap-2 text-[#00703C] font-semibold hover:underline"
              >
                Contact our support team
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
