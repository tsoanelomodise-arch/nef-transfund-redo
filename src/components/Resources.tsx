import { TfBook, TfPeople, TfBriefcase } from "@/components/icons";

const Resources = () => {
  const resources = [
    {
      title: "Business Development",
      description: "Access to business planning, market research, and strategic development resources.",
      icon: TfBook,
      iconColor: "text-teal-700",
      bgColor: "bg-teal-100"
    },
    {
      title: "Mentorship Network", 
      description: "Connect with experienced business leaders and industry experts for guidance and support.",
      icon: TfPeople,
      iconColor: "text-teal-700", 
      bgColor: "bg-teal-100"
    },
    {
      title: "Training Programs",
      description: "Skills development workshops, financial literacy, and business management training.",
      icon: TfBriefcase,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Resources & Support
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive support beyond funding
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-24 h-24 mx-auto mb-8 ${resource.bgColor} rounded-3xl flex items-center justify-center shadow-sm`}>
                  <IconComponent className={`w-12 h-12 ${resource.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                  {resource.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {resource.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resources;