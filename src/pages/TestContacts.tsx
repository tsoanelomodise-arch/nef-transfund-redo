import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { validateAndSanitizeContactForm, buildSafeMailtoLink, type ContactFormData } from "@/lib/validation/contact-form";
import { useToast } from "@/hooks/use-toast";

const TestContacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    surname: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
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
    const mailtoLink = buildSafeMailtoLink(result.sanitizedData);
    window.location.href = mailtoLink;
    toast({ title: "Opening your email client..." });
  };

  return (
    <div className="min-h-screen bg-white">
      <PhakamaniNavbar />

      {/* Spacer for fixed navbar + social bar */}
      <div className="h-[160px] lg:h-[190px]" />

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="w-[60px] h-1 bg-black mb-4" />
            <h1 className="text-[3rem] font-bold leading-[1.2] text-[#111] mb-6 capitalize">
              Contact <span>Us</span>
            </h1>
            <p className="text-[1.1rem] text-[#4a4a4a] mb-8 max-w-[450px] mx-auto lg:mx-0 leading-relaxed">
              Get in touch with our team to learn more about the Transformation Fund or to start your application journey.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="mailto:info@sa-transformationfund.co.za"
                className="inline-block px-8 py-3 text-[0.9rem] font-semibold bg-[#111] text-white hover:bg-[#333] transition-all duration-300 capitalize"
              >
                Email Us Now
              </a>
              <a
                href="tel:+27861113186"
                className="inline-block px-8 py-3 text-[0.9rem] font-semibold bg-transparent border border-[#e0e0e0] text-[#111] hover:border-[#111] hover:bg-[#111] hover:text-white transition-all duration-300 capitalize"
              >
                Call Us
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="border border-[#e0e0e0] p-8 text-center">
              <a href="https://scan.page/p/jJshR7" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/social-media-qr-code.png"
                  alt="Scan QR Code to connect with us"
                  className="w-[200px] h-[200px] mx-auto mb-4 object-contain"
                  width="200"
                  height="200"
                />
              </a>
              <p className="text-[0.8rem] text-[#4a4a4a]">Scan to connect with us</p>
            </div>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center text-[2rem] font-bold text-[#111] mb-12 capitalize">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Email */}
            <div className="bg-[#111] text-white p-8 flex flex-col">
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-[18px] h-[18px] text-white" />
              </div>
              <h3 className="text-white text-[1.1rem] font-bold mb-4">Email</h3>
              <a href="mailto:info@sa-transformationfund.co.za" className="text-[#ccc] text-[0.85rem] mb-2 block hover:text-white hover:underline transition-colors">
                info@sa-transformationfund.co.za
              </a>
              <a href="mailto:applications@nefcorp.co.za" className="text-[#ccc] text-[0.85rem] block hover:text-white hover:underline transition-colors">
                applications@nefcorp.co.za
              </a>
            </div>

            {/* Phone */}
            <div className="bg-[#111] text-white p-8 flex flex-col">
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-[18px] h-[18px] text-white" />
              </div>
              <h3 className="text-white text-[1.1rem] font-bold mb-4">Phone</h3>
              <p className="text-[#ccc] text-[0.85rem]">+27 86 111 3186</p>
            </div>

            {/* Address */}
            <div className="bg-[#111] text-white p-8 flex flex-col">
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-[18px] h-[18px] text-white" />
              </div>
              <h3 className="text-white text-[1.1rem] font-bold mb-4">Address</h3>
              <p className="text-[#ccc] text-[0.85rem]">70 Grayston Drive, Sandown Sandton, Gauteng, 2196 South Africa</p>
            </div>

            {/* Office Hours */}
            <div className="bg-[#111] text-white p-8 flex flex-col">
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-[18px] h-[18px] text-white" />
              </div>
              <h3 className="text-white text-[1.1rem] font-bold mb-4">Office Hours</h3>
              <p className="text-[#ccc] text-[0.85rem] mb-2">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-[#ccc] text-[0.85rem]">Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[2rem] font-bold text-[#111] mb-8 capitalize">Our Location</h2>
          <div className="w-full h-[450px] bg-[#e5e3df] overflow-hidden">
            <iframe
              title="Transformation Fund Office Location"
              width="100%"
              height="100%"
              src="https://maps.google.com/maps?q=70%20Grayston%20Drive%2C%20Sandown%2C%20Sandton%2C%20Gauteng%2C%202196%20South%20Africa&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestContacts;
