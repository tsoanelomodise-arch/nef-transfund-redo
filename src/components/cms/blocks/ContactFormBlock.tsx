import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  validateAndSanitizeContactForm,
  buildSafeMailtoLink,
  type ContactFormData,
} from "@/lib/validation/contact-form";

interface Props { data: Record<string, any>; }

const EMPTY: ContactFormData = { firstName: "", surname: "", email: "", telephone: "", message: "" };

/** Contact form that opens the visitor's email client, addressed to the recipient set in the admin. */
const ContactFormBlock = ({ data }: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAndSanitizeContactForm(formData);
    if (result.success === false) {
      setErrors(result.errors);
      toast({ title: "Please fix the errors below", variant: "destructive" });
      return;
    }
    setErrors({});
    let link = buildSafeMailtoLink(result.sanitizedData);
    if (data.recipient) link = link.replace(/^mailto:[^?]*/, `mailto:${encodeURIComponent(data.recipient)}`);
    window.location.href = link;
    toast({ title: "Opening your email client..." });
    setFormData(EMPTY);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-4 border rounded-none focus:outline-none focus:border-[#111111] bg-white text-[#111111] transition-all ${
      errors[field] ? "border-red-500" : "border-[#e0e0e0]"
    }`;

  return (
    <section id={data.anchor || "contact-form"} className="py-16 bg-white scroll-mt-[200px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {data.heading && (
          <h2 className="text-center text-[2rem] font-bold text-[#111111] mb-4 capitalize">{data.heading}</h2>
        )}
        {data.intro && (
          <p className="text-[#4a4a4a] text-[1.05rem] text-center mb-12 max-w-2xl mx-auto whitespace-pre-line">{data.intro}</p>
        )}

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cf-firstName" className="block text-sm font-bold text-[#111111] mb-2">Name *</label>
              <input id="cf-firstName" type="text" required maxLength={50} value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)} className={inputClass("firstName")} placeholder="Enter your name" />
              {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="cf-surname" className="block text-sm font-bold text-[#111111] mb-2">Surname *</label>
              <input id="cf-surname" type="text" required maxLength={50} value={formData.surname}
                onChange={(e) => handleChange("surname", e.target.value)} className={inputClass("surname")} placeholder="Enter your surname" />
              {errors.surname && <p className="text-sm text-red-500 mt-1">{errors.surname}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cf-email" className="block text-sm font-bold text-[#111111] mb-2">Email *</label>
              <input id="cf-email" type="email" required maxLength={255} value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)} className={inputClass("email")} placeholder="Enter your email" />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="cf-telephone" className="block text-sm font-bold text-[#111111] mb-2">Telephone *</label>
              <input id="cf-telephone" type="tel" required maxLength={20} value={formData.telephone}
                onChange={(e) => handleChange("telephone", e.target.value)} className={inputClass("telephone")} placeholder="Enter your phone number" />
              {errors.telephone && <p className="text-sm text-red-500 mt-1">{errors.telephone}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="cf-message" className="block text-sm font-bold text-[#111111] mb-2">Message *</label>
            <textarea id="cf-message" rows={5} required maxLength={2000} value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)} className={`${inputClass("message")} resize-vertical`} placeholder="How can we help you?" />
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
          </div>
          <div className="text-center pt-4">
            <button type="submit" className="inline-block px-8 py-3 text-[0.9rem] font-semibold bg-[#111111] text-white hover:bg-[#333333] transition-all duration-300 capitalize">
              {data.button_label || "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormBlock;
