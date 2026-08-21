import { memo, useMemo } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TfCheckCircle, TfTarget, TfPeople, TfGrowth } from "@/components/icons";
import startupGrantsHeader from "@/assets/startup-grants-header.jpg";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import SocialIconsRow from "@/components/shared/SocialIconsRow";

const FeatureCard = memo(({ icon: Icon, title, description }: { icon: typeof TfTarget; title: string; description: string }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
    <CardContent className="p-8">
      <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-6 text-slate-900 text-center">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-center text-lg">{description}</p>
    </CardContent>
  </Card>
));
FeatureCard.displayName = "FeatureCard";

const StepCard = memo(({ step, title, description, showConnector = false }: { step: string; title: string; description: string; showConnector?: boolean }) => (
  <div className="relative">
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden h-full">
      <CardContent className="p-8 text-center h-full flex flex-col">
        <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl font-bold text-white">{step}</span>
        </div>
        <h4 className="text-2xl font-bold text-slate-900 mb-6">{title}</h4>
        <p className="text-slate-600 leading-relaxed text-lg flex-grow">{description}</p>
      </CardContent>
    </Card>
    {showConnector && (
      <div className="hidden lg:block absolute -right-5 top-1/2 w-10 h-0.5 bg-gradient-to-r from-primary to-primary/50 transform -translate-y-1/2"></div>
    )}
  </div>
));
StepCard.displayName = "StepCard";

const StartupGrants = () => {
  useSEO({
    title: "Startup Grants",
    description: "Financial support for early-stage black-owned businesses. Capability vouchers and seed capital for informal and micro enterprises ready to scale.",
    path: "/startup-grants",
  });
  const features = useMemo(() => [
    {
      icon: TfTarget,
      title: "Smart Instrument",
      description: "Small startup grants and convertible vouchers specifically designed for early-stage and informal enterprises seeking growth opportunities."
    },
    {
      icon: TfPeople,
      title: "TfTarget Businesses",
      description: "Township shopkeepers, youth-led tech enterprises, entrepreneurs building prototypes, and informal businesses seeking formalization."
    },
    {
      icon: TfGrowth,
      title: "Perfect Market Fit",
      description: "Tailored for micro and informal businesses that struggle with complex applications – featuring minimal paperwork and maximum impact."
    }
  ], []);

  const steps = useMemo(() => [
    { step: "01", title: "Register Business", description: "Complete our streamlined business registration process with minimal paperwork" },
    { step: "02", title: "Complete Training", description: "Finish our comprehensive capability training program designed for your success" },
    { step: "03", title: "Hit Sales TfTarget", description: "Achieve your first sales milestone and unlock continued funding support" }
  ], []);

  return (
    <main className="min-h-screen bg-white pt-[100px] lg:pt-[120px]">
      <PhakamaniNavbar />

      {/* Social Icons - Fixed position below navbar */}
      <div className="max-w-[1400px] mx-auto px-10 pt-6">
        <SocialIconsRow />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${startupGrantsHeader})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
        <div className="relative container mx-auto px-6 lg:px-8 z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-medium text-sm">Funding Program</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Where <span className="text-primary">Talent</span><br />
              Drives Success
            </h1>
            <p className="text-xl lg:text-2xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
              Capability vouchers designed to provide seed capital for early-stage and informal enterprises ready to scale
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full">
                Start Application
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-medium text-sm">Program Overview</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              Empowering Your Business Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Designed specifically for entrepreneurs who need more than just funding – we provide the complete toolkit for sustainable growth
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10" role="list">
            {features.map((feature, index) => (
              <div key={index} role="listitem">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Explore Program Details →
            </Button>
          </div>
        </div>
      </section>

      {/* Use Case Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-medium text-sm">Real Impact</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Inside Our Success Stories
              </h2>
            </div>
            <Card className="border-0 bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-xl overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                    <TfCheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
                    "We provide seed capital to entrepreneurs who lack initial funding or collateral – transforming 
                    township shopkeepers into formal business owners and empowering youth-led tech enterprises 
                    to build game-changing prototypes."
                  </blockquote>
                  <div className="mt-8 text-primary font-semibold text-lg">
                    Real entrepreneurs, real growth, real impact
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product-Market Fit Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-medium text-sm">Your Journey</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                Three Steps to Success
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our streamlined process eliminates bureaucratic complexity while ensuring your business is set up for sustainable growth
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-10 mb-16" role="list">
              {steps.map((stepData, index) => (
                <div key={index} role="listitem">
                  <StepCard {...stepData} showConnector={index < steps.length - 1} />
                </div>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-white to-slate-50 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                    <TfCheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                    Designed for Real Businesses
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Specifically tailored for micro and informal businesses that struggle with complex loan applications. 
                    Our grants feature easy access with minimal paperwork, disbursed in tranches linked to developmental milestones 
                    that ensure both funding and capability growth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Overcoming Bureaucratic Failures Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-medium text-sm">Our Difference</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Breaking Through Bureaucracy
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We've reimagined the funding process from the ground up, eliminating traditional barriers while ensuring sustainable growth
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <Card className="border-0 bg-slate-50 rounded-3xl overflow-hidden shadow-lg">
                <CardContent className="p-10">
                  <div className="w-16 h-16 mb-8 bg-slate-400 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">❌</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Traditional Approach</h3>
                  <ul className="text-slate-600 space-y-4 text-lg">
                    <li className="flex items-start">
                      <span className="text-slate-400 mr-3 mt-1">•</span>
                      Lengthy application forms that discourage applicants
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-400 mr-3 mt-1">•</span>
                      Significant delays causing missed opportunities
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-400 mr-3 mt-1">•</span>
                      Complex compliance requirements
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-400 mr-3 mt-1">•</span>
                      Money without capacity building
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl overflow-hidden shadow-lg">
                <CardContent className="p-10">
                  <div className="w-16 h-16 mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                    <TfCheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Solution</h3>
                  <ul className="text-slate-700 space-y-4 text-lg">
                    <li className="flex items-start">
                      <TfCheckCircle className="text-primary mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                      Streamlined digital platform for quick applications
                    </li>
                    <li className="flex items-start">
                      <TfCheckCircle className="text-primary mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                      Focus on outcomes, not paperwork
                    </li>
                    <li className="flex items-start">
                      <TfCheckCircle className="text-primary mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                      Conditional grants with capability requirements
                    </li>
                    <li className="flex items-start">
                      <TfCheckCircle className="text-primary mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                      Embedded technical support throughout your journey
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 rounded-3xl overflow-hidden shadow-2xl">
              <CardContent className="p-12 text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                    <TfGrowth className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                    Smart Conditions, Better Outcomes
                  </h3>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    Our grants are conditional on enterprises adopting capability enhancements like basic bookkeeping 
                    on our platform. This approach both simplifies reporting and dramatically improves business survival rates – 
                    addressing the common failure of past schemes where money alone was distributed without building recipient capacity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-8">
              <span className="text-white font-medium text-sm">Ready to Start?</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Turn Your Vision Into 
              <span className="block">Reality Today</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join hundreds of entrepreneurs who've transformed their businesses with our comprehensive funding and capability support program
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-10 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                Start Your Application
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                Schedule Consultation
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <TfCheckCircle className="w-5 h-5" />
                <span>No Lengthy Paperwork</span>
              </div>
              <div className="flex items-center gap-2">
                <TfCheckCircle className="w-5 h-5" />
                <span>Fast Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <TfCheckCircle className="w-5 h-5" />
                <span>Ongoing Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StartupGrants;
