const NationalAgenda = () => {
  return (
    <section id="national-agenda" className="py-8 bg-white">
      <div className="max-w-[1400px] mx-auto px-10">
        <div>
          
          <h3 className="text-2xl font-bold mb-8 text-gray-900">
            The four focus areas will be:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#E31C23] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 font-bold text-lg mb-2">Entrepreneurship and SMME development</p>
                  <p className="text-gray-500 leading-relaxed">to help small and medium enterprises to become competitive and sustainable businesses.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#E31C23] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 font-bold text-lg mb-2">Job creation and poverty reduction</p>
                  <p className="text-gray-500 leading-relaxed">to generate employment and enable more South Africans to participate meaningfully in the economy.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#E31C23] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 font-bold text-lg mb-2">Broadening black ownership and participation</p>
                  <p className="text-gray-500 leading-relaxed">to expand ownership and active participation of black South Africans in key sectors and value chains.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#E31C23] rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 font-bold text-lg mb-2">Strengthening social protection and economic resilience</p>
                  <p className="text-gray-500 leading-relaxed">to build capacity across enterprises to support a more resilient economy and stronger social safety nets.</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500 text-lg leading-relaxed max-w-4xl">
            This approach is fully aligned with the Constitution and B-BBEE framework while encouraging collaboration between government, corporates, DFIs and civil society to ensure that more opportunities are created in underserved and under-resourced communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NationalAgenda;
