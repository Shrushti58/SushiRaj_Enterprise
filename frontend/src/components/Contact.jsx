// src/components/Contact.jsx
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);

  // Cursor light-spot effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const glow = cursorGlowRef.current;
      if (!glow) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      const glow = cursorGlowRef.current;
      if (glow) glow.style.opacity = "0";
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("contact");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.phone || !formData.message) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `*🏭 SUSHIRAJ ENTERPRISE - New Enquiry*%0A%0A
*📝 Customer Details:*%0A
*Name:* ${formData.name}%0A
*📞 Phone:* ${formData.phone}%0A
*💬 Message:* ${formData.message}%0A%0A
*⏰ Time:* ${new Date().toLocaleString()}%0A
*🌐 Source:* Website Contact Form%0A%0A
_Please respond to this customer at the earliest._`;

    // Open WhatsApp with trial number: 8208584646
    window.open(`https://wa.me/918208584646?text=${whatsappMessage}`, '_blank');
    
    // Show success message
    setSubmitStatus("success");
    setFormData({ name: "", phone: "", message: "" });
    setIsSubmitting(false);

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const contactInfo = [
    { icon: Phone, title: "Call Us", details: ["8888800773", "97634 73858"], link: "tel:8888800773" },
    { icon: Mail, title: "Email Us", details: ["Sushiraj.enterprises@gmail.com"], link: "mailto:Sushiraj.enterprises@gmail.com" },
    { icon: MapPin, title: "Visit Us", details: ["Sangli, Maharashtra", "India"], link: "#" },
    { icon: Clock, title: "Business Hours", details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"], link: "#" },
  ];

  // Floating particles config
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 sm:py-28 lg:py-36 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-bg" : "bg-gray-50"
      }`}
    >
      {/* Cursor light-spot */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow"
        style={{ opacity: 0 }}
      />

      {/* BG line grid */}
      <div className={`bg-grid-dots ${isDark ? 'bg-grid-dark' : 'bg-grid-light'}`} />

      {/* Radial vignette */}
      <div className={`bg-vignette ${isDark ? 'vignette-dark' : 'vignette-light'}`} />

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-secondary-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-secondary-500/5 blur-3xl"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span className="text-secondary-500 font-poppins text-sm font-medium">Get in Touch</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-1px] sm:tracking-[-2px] text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            Contact <span className="text-secondary-500">Us</span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            Have questions? Fill the form and we'll respond on WhatsApp instantly
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side - Contact Info Cards */}
          <div className={`space-y-4 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.link}
                    className={`group block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shimmer-card ${
                      isDark ? "bg-dark-card" : "bg-white"
                    } shadow-lg border border-gray-200 dark:border-gray-800 hover:border-secondary-500/40`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-text-light-primary dark:text-text-dark-primary mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {detail}
                      </p>
                    ))}
                  </a>
                );
              })}
            </div>

            {/* WhatsApp Card */}
            <div className={`rounded-2xl p-5 ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-lg border border-green-500/20 bg-gradient-to-r from-green-500/5 to-transparent`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21L4.65 17.5C3.874 16.188 3.5 14.682 3.5 13.125C3.5 8.062 7.562 4 12.625 4C17.688 4 21.75 8.062 21.75 13.125C21.75 18.188 17.688 22.25 12.625 22.25C11.1 22.25 9.612 21.887 8.25 21.2L3 21Z" stroke="#25D366" strokeWidth="2" fill="none"/>
                    <path d="M9.5 9.5C9.5 9.5 10.5 8.5 11.5 10C12.5 11.5 13 12 14 13" stroke="#25D366" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Quick Response on WhatsApp
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Get reply within minutes
                  </p>
                </div>
                <a
                  href="https://wa.me/918208584646"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#20b859] transition"
                >
                  Chat Now
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
            <div className={`rounded-2xl p-6 sm:p-8 shimmer-card ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-lg border border-gray-200 dark:border-gray-800`}>
              <h3 className="font-poppins font-bold text-2xl text-text-light-primary dark:text-text-dark-primary mb-2">
                Send us a Message
              </h3>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mb-6">
                We'll respond on WhatsApp within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                      isDark 
                        ? "bg-dark-surface border-gray-700 text-text-dark-primary focus:border-secondary-500" 
                        : "bg-white border-gray-300 text-text-light-primary focus:border-secondary-500"
                    }`}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
                    Phone Number * (For WhatsApp)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                      isDark 
                        ? "bg-dark-surface border-gray-700 text-text-dark-primary focus:border-secondary-500" 
                        : "bg-white border-gray-300 text-text-light-primary focus:border-secondary-500"
                    }`}
                    placeholder="Enter your WhatsApp number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                      isDark 
                        ? "bg-dark-surface border-gray-700 text-text-dark-primary focus:border-secondary-500" 
                        : "bg-white border-gray-300 text-text-light-primary focus:border-secondary-500"
                    }`}
                    placeholder="Tell us about your requirement..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-poppins font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21L4.65 17.5C3.874 16.188 3.5 14.682 3.5 13.125C3.5 8.062 7.562 4 12.625 4C17.688 4 21.75 8.062 21.75 13.125C21.75 18.188 17.688 22.25 12.625 22.25C11.1 22.25 9.612 21.887 8.25 21.2L3 21Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M9.5 9.5C9.5 9.5 10.5 8.5 11.5 10C12.5 11.5 13 12 14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Send on WhatsApp
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm text-center flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Message sent! We'll contact you on WhatsApp shortly.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Please fill all fields correctly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={`mt-12 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.45s" }}>
          <div className={`rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 ${
            isDark ? "bg-dark-card" : "bg-white"
          }`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary-500" />
                <span className="font-poppins font-medium text-text-light-primary dark:text-text-dark-primary">
                  Find Us Here
                </span>
              </div>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-secondary-500 mx-auto mb-2" />
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
                  Sangli, Maharashtra, India
                </p>
                <p className="text-text-light-muted dark:text-text-dark-muted text-xs mt-1">
                  Google Maps Integration Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .cursor-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(
            circle,
            rgba(26, 188, 156, 0.10) 0%,
            rgba(26, 188, 156, 0.04) 40%,
            transparent 70%
          );
          transition: opacity 0.3s ease;
          will-change: left, top;
        }

        .bg-grid-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .bg-grid-light {
          background-image:
            linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .bg-grid-dark {
          background-image:
            linear-gradient(rgba(28, 230, 201, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 230, 201, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .bg-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .vignette-light {
          background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(249,250,251,0.85) 100%);
        }
        .vignette-dark {
          background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(12,20,34,0.95) 100%);
        }

        .particle {
          position: absolute;
          bottom: -20px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          background: linear-gradient(135deg, rgba(26,188,156,0.5), rgba(26,188,156,0.3));
          animation: floatUp linear infinite;
          pointer-events: none;
          z-index: 0;
        }
        .dark .particle {
          background: linear-gradient(135deg, rgba(28,230,201,0.4), rgba(28,230,201,0.2));
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-45vh) translateX(18px) scale(1.1);
          }
          100% {
            transform: translateY(-90vh) translateX(-8px) scale(0.7);
            opacity: 0;
          }
        }

        .shimmer-card {
          position: relative;
          overflow: hidden;
        }
        .shimmer-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.12) 50%,
            transparent 60%
          );
          transform: translateX(-100%);
          transition: none;
          pointer-events: none;
        }
        .shimmer-card:hover::after {
          animation: shimmerSweep 0.55s ease forwards;
        }
        .dark .shimmer-card::after {
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(28, 230, 201, 0.08) 50%,
            transparent 60%
          );
        }

        @keyframes shimmerSweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
        }
        .fade-up.visible {
          animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .particle, .cursor-glow, .shimmer-card::after { display: none; }
          .fade-up.visible { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}