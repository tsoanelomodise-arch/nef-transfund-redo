import { useState } from "react";
import { TfMail, TfPhone, TfPin, TfClock } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { validateAndSanitizeContactForm, buildSafeMailtoLink } from "@/lib/validation/contact-form";

const Contacts = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    telephone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validationResult = validateAndSanitizeContactForm(formData);
    
    if (!validationResult.success) {
      if ('errors' in validationResult) {
        setErrors(validationResult.errors);
      }
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted fields.",
        variant: "destructive",
      });
      return;
    }
    
    const mailtoLink = buildSafeMailtoLink(validationResult.sanitizedData);
    window.location.href = mailtoLink;

    toast({
      title: "Message Prepared",
      description: "Your email client will open to send the message.",
    });

    setFormData({ firstName: '', surname: '', email: '', telephone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <PhakamaniNavbar />
      <main className="pt-[180px] lg:pt-[210px]">
        {/* Hero Section - Phakamani Style */}
        <section className="phakamani-hero-bg py-10 md:py-16 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                {/* Monospace Label */}
                

                {/* Main Headline */}
                <h1 className="phakamani-headline">
                  Contact <span className="text-[#00703C]">Us</span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                  Get in touch with our team to learn more about the Transformation Fund or to start your application journey.
                </p>

                {/* CTA Button */}
                <div className="flex gap-4 pt-4">
                  <a href="#contact-form" className="phakamani-btn-primary">
                    Email Us Now
                  </a>
                  <a href="tel:+27861113186" className="phakamani-btn-secondary">
                    Call Us
                  </a>
                </div>
              </div>

              {/* Right Column - QR Code */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative">
                  <a href="https://scan.page/p/jJshR7" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/social-media-qr-code.png" 
                      alt="Scan QR Code to connect with us" 
                      className="w-64 h-64 rounded-2xl shadow-2xl"
                      width="256"
                      height="256"
                      loading="eager"
                    />
                  </a>
                  <p className="text-center mt-4 text-gray-500 text-sm">Scan to connect with us</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-10 bg-white">
          <div className="max-w-[1400px] mx-auto px-10">
            <h2 className="phakamani-section-title text-center mb-12">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Email Card */}
              <div className="bg-black text-white rounded-2xl p-6 hover:translate-y-[-8px] transition-transform duration-300 shadow-lg">
                <div className="w-12 h-12 bg-[#00703C] rounded-full flex items-center justify-center mb-4">
                  <TfMail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <a href="mailto:info@sa-transformationfund.co.za" className="text-gray-300 hover:text-[#00703C] transition-colors block text-sm mb-1">
                  info@sa-transformationfund.co.za
                </a>
                <a href="mailto:applications@nefcorp.co.za" className="text-gray-300 hover:text-[#00703C] transition-colors block text-sm">
                  applications@nefcorp.co.za
                </a>
              </div>

              {/* TfPhone Card */}
              <div className="bg-black text-white rounded-2xl p-6 hover:translate-y-[-8px] transition-transform duration-300 shadow-lg">
                <div className="w-12 h-12 bg-[#00703C] rounded-full flex items-center justify-center mb-4">
                  <TfPhone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">TfPhone</h3>
                <a href="tel:+27861113186" className="text-gray-300 hover:text-[#00703C] transition-colors block text-sm">
                  +27 86 111 3186
                </a>
              </div>

              {/* Address Card */}
              <div className="bg-black text-white rounded-2xl p-6 hover:translate-y-[-8px] transition-transform duration-300 shadow-lg">
                <div className="w-12 h-12 bg-[#00703C] rounded-full flex items-center justify-center mb-4">
                  <TfPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Address</h3>
                <p className="text-gray-300 text-sm">
                  70 Grayston Drive, Sandown<br />
                  Sandton, Gauteng, 2196<br />
                  South Africa
                </p>
              </div>

              {/* Office Hours Card */}
              <div className="bg-black text-white rounded-2xl p-6 hover:translate-y-[-8px] transition-transform duration-300 shadow-lg">
                <div className="w-12 h-12 bg-[#00703C] rounded-full flex items-center justify-center mb-4">
                  <TfClock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Office Hours</h3>
                <p className="text-gray-300 text-sm">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-10">
            <h2 className="phakamani-section-title text-center mb-12">Our Location</h2>
            <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.2697844786704!2d28.051544!3d-26.107598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9573493dbe26c5%3A0x1b1e2f4a4e4e4e4e!2s70%20Grayston%20Dr%2C%20Sandown%2C%20Sandton%2C%202196!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-10 bg-white">
          <div className="max-w-[1400px] mx-auto px-10">
            <h2 className="phakamani-section-title text-center mb-4">Send us a Message</h2>
            <p className="text-gray-500 text-lg text-center mb-12 max-w-2xl mx-auto">
              Have a question or want to learn more? Fill out the form below and we'll get back to you.
            </p>
            
            <form id="contact-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-black mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    maxLength={50}
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00703C] focus:border-[#00703C] bg-white text-black transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter your name"
                  />
                  {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="surname" className="block text-sm font-bold text-black mb-2">
                    Surname *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    required
                    maxLength={50}
                    value={formData.surname}
                    onChange={(e) => setFormData({...formData, surname: e.target.value})}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00703C] focus:border-[#00703C] bg-white text-black transition-all ${errors.surname ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter your surname"
                  />
                  {errors.surname && <p className="text-sm text-red-500 mt-1">{errors.surname}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00703C] focus:border-[#00703C] bg-white text-black transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-bold text-black mb-2">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    required
                    maxLength={20}
                    value={formData.telephone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00703C] focus:border-[#00703C] bg-white text-black transition-all ${errors.telephone ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.telephone && <p className="text-sm text-red-500 mt-1">{errors.telephone}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-black mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00703C] focus:border-[#00703C] bg-white text-black resize-vertical transition-all ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
              </div>
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="phakamani-btn-primary"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
