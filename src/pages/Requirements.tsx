import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import SocialIconsRow from "@/components/shared/SocialIconsRow";

const Requirements = () => {
  const requirements = [
    {
      title: "General Requirements",
      items: [
        "South African registered business or individual",
        "Valid tax clearance certificate",
        "Company registration certificate (for businesses)",
        "Proof of identity (South African ID/passport)",
        "Bank statements (last 6 months)",
        "Proof of address (not older than 3 months)"
      ]
    },
    {
      title: "Business Documentation",
      items: [
        "Detailed business plan (minimum 20 pages)",
        "Financial projections (3-year forecast)",
        "Management accounts/financial statements",
        "Market analysis and competitive landscape",
        "Operational plan and implementation timeline",
        "Risk assessment and mitigation strategies"
      ]
    },
    {
      title: "Legal & Compliance",
      items: [
        "B-BBEE certificate (where applicable)",
        "Industry-specific licenses and permits",
        "Environmental compliance certificates",
        "Labour relations compliance documentation",
        "Intellectual property documentation",
        "Contracts and agreements (key suppliers/customers)"
      ]
    },
    {
      title: "Financial Requirements",
      items: [
        "Audited financial statements (last 2 years)",
        "Management accounts (latest month-end)",
        "Cash flow projections",
        "Debt schedule and repayment capacity analysis",
        "Collateral documentation (if applicable)",
        "Use of funds breakdown and justification"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px]">
      <PhakamaniNavbar />
      
      <main>
        {/* Social Icons - Fixed position below navbar */}
        <div className="max-w-[1400px] mx-auto px-10 pt-6">
          <SocialIconsRow />
        </div>
        {/* Hero Section */}
        <header className="pt-[30px] pb-[60px] phakamani-hero-bg overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Hero Content */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Hero Label */}
                <span className="font-mono text-[#00703C] font-bold text-sm mb-3 block">
                  // Requirements
                </span>

                {/* Headline */}
                <div className="w-[60px] h-1 bg-black mb-4" />
                <h1 className="phakamani-headline text-black mb-6">
                  Application <span className="text-[#00703C]">Requirements</span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
                  Everything you need to know to prepare a successful funding application
                </p>

                {/* Action Button */}
                <Button 
                  variant="cta" 
                  size="lg"
                  onClick={() => (document.getElementById('assessment-modal') as HTMLDialogElement)?.showModal()}
                  className="phakamani-btn-primary"
                >
                  Start Your Application
                </Button>
              </div>

              {/* Hero Visual - Empty for now, can add image later */}
              <div className="hidden lg:block" aria-hidden="true" />
            </div>
          </div>
        </header>

        {/* Requirements Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8" role="list">
              {requirements.map((category, index) => (
                <Card key={index} className="hover:shadow-[var(--card-shadow-hover)] transition-all duration-300" role="listitem">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help Preparing Your Application?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our application specialists provide free consultation to help you gather the right documentation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="cta"
                onClick={() => (document.getElementById('consultation-modal') as HTMLDialogElement)?.showModal()}
              >
                Schedule Consultation
              </Button>
              <Button variant="outline">Download Checklist</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Requirements;
