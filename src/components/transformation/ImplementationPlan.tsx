import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ImplementationPlan = () => {
  return (
    <section id="implementation" className="py-14 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Implementation Plan</h2>
          <p className="text-xl max-w-4xl mx-auto">
            The Transformation Fund will be implemented through phased, principle-based stages rather than rigid timelines. This ensures sequencing is aligned with institutional capacity and stakeholder readiness, while remaining flexible to adapt based on on-the-ground learning.
          </p>
        </div>

        <Tabs defaultValue="pre-launch" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white p-2 rounded-lg h-auto gap-2">
            <TabsTrigger 
              value="pre-launch" 
              className="text-xs sm:text-sm px-3 sm:px-4 py-3 text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white transition-all whitespace-normal h-auto min-h-[44px]"
            >
              Pre-Launch
            </TabsTrigger>
            <TabsTrigger 
              value="activation" 
              className="text-xs sm:text-sm px-3 sm:px-4 py-3 text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white transition-all whitespace-normal h-auto min-h-[44px]"
            >
              Activation
            </TabsTrigger>
            <TabsTrigger 
              value="scale-up" 
              className="text-xs sm:text-sm px-3 sm:px-4 py-3 text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white transition-all whitespace-normal h-auto min-h-[44px]"
            >
              Scale-Up
            </TabsTrigger>
            <TabsTrigger 
              value="institutionalisation" 
              className="text-xs sm:text-sm px-3 sm:px-4 py-3 text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white transition-all whitespace-normal h-auto min-h-[44px]"
            >
              Institutionalisation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pre-launch" className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Phase 1: Pre-Launch (Foundational Setup)</h3>
            <ul className="space-y-4 list-disc list-inside leading-relaxed">
              <li>In this preparatory phase, the Fund's special purpose vehicle (SPV) is established and capitalised with initial commitments from aligned contributors.</li>
              <li>The digital platform and telemetry infrastructure for data and performance tracking are designed and prototyped. This includes setting up the Transformation Index framework, key metrics and data systems, and basic automation for reporting.</li>
              <li>Critically, Phase 1 focuses on institutional alignment: engaging public-sector partners to ensure the Fund's mandate complements national programmes and onboarding initial private and DFI partners through MOUs.</li>
            </ul>
          </TabsContent>

          <TabsContent value="activation" className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Phase 2: Activation (Early Adoption)</h3>
            <ul className="space-y-4 list-disc list-inside leading-relaxed">
              <li>With fundamentals in place, the Fund launches initial programmes to deploy capital and capability support on a small scale.</li>
              <li>This phase tests the platform model in action: a first cohort of MSMEs or projects receive blended finance combined with technical support.</li>
              <li>The Fund's digital platform begins capturing telemetry data from these interventions, feeding into the Transformation Index.</li>
            </ul>
          </TabsContent>

          <TabsContent value="scale-up" className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Phase 3: Scale-Up (Expansion and Mainstreaming)</h3>
            <ul className="space-y-4 list-disc list-inside leading-relaxed">
              <li>After successful early adoption, the Fund enters an expansion phase, scaling up the volume of investments and the breadth of support services.</li>
              <li>The Fund's digital operating system is fully deployed nationwide, onboarding many more MSMEs onto the platform and extending the capability toolkits, including adding sector-specific modules for agriculture and manufacturing.</li>
              <li>Scale-up also entails institutional mainstreaming: integrating the Fund's activities with government initiatives, including coordinating with the Jobs Fund, sector Master Plans, or provincial development programmes to avoid duplication.</li>
            </ul>
          </TabsContent>

          <TabsContent value="institutionalisation" className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Phase 4: Institutionalisation (Sustainability & Policy Embedding)</h3>
            <ul className="space-y-4 list-disc list-inside leading-relaxed">
              <li>In the final phase, the Transformation Fund transitions from a special initiative into a permanent feature of South Africa's financial architecture.</li>
              <li>The governance model is firmly entrenched – for instance, the independent board and committees become long-standing bodies with succession plans, and possibly a statutory mandate is defined for the Fund.</li>
              <li>In Phase 4, long-term funding streams are secured: for instance, budget allocations, or regulated contributions, such as a portion of B-BBEE enterprise development spend or DFI commitments, are programmatically channelled into the Fund, reducing reliance on ad-hoc fundraising.</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ImplementationPlan;