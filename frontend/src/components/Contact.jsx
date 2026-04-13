import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Phone, Mail, MapPin, Clock, MessageSquare, MessageCircle, Navigation, ExternalLink, ChevronRight, Building, Star } from "lucide-react";

export default function Contact() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const fullAddress = "F-7, Shubham Residency, near Khare Sanskrutik Bhavan, Vishrambag, Sangli, Maharashtra 416416, India";
  const encodedAddress = encodeURIComponent(fullAddress);
  // Vite uses import.meta.env for environment variables
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Primary contact methods (top priority)
  const primaryContacts = [
    { 
      icon: Phone, 
      title: "Call Us", 
      subtitle: "Quick support & inquiries",
      details: ["8888800773", "97634 73858"], 
      action: "call",
      primaryNumber: "8888800773",
      secondaryNumber: "9763473858",
      gradient: "from-emerald-500 to-teal-600",
      priority: "primary",
      actionLabel: "Tap to Call Now"
    },
    { 
      icon: MessageCircle, 
      title: "WhatsApp", 
      subtitle: "Chat & share documents",
      details: ["Click to start conversation"], 
      action: "whatsapp",
      number: "8888800773",
      gradient: "from-green-500 to-emerald-600",
      priority: "primary",
      actionLabel: "Start WhatsApp Chat"
    },
  ];

  // Secondary contact methods
  const secondaryContacts = [
    { 
      icon: Mail, 
      title: "Email Us", 
      subtitle: "For formal communication",
      details: ["Sushiraj.enterprises@gmail.com"], 
      action: "email",
      email: "Sushiraj.enterprises@gmail.com",
      gradient: "from-blue-500 to-indigo-600",
      priority: "secondary",
      actionLabel: "Send Email"
    },
    { 
      icon: Navigation, 
      title: "Visit Us", 
      subtitle: "Get directions to office",
      details: ["Open in Google Maps"], 
      action: "map",
      location: fullAddress,
      gradient: "from-purple-500 to-pink-600",
      priority: "secondary",
      actionLabel: "Get Directions"
    },
  ];

  const handleContactAction = (action, data) => {
    switch(action) {
      case 'call':
        window.location.href = `tel:${data}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/91${data.number}?text=Hello%21%20I%27m%20interested%20in%20your%20services.%20Can%20you%20please%20help%20me%3F`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${data.email}?subject=Inquiry%20about%20your%20services&body=Hello%2C%0A%0AI%20would%20like%20to%20know%20more%20about...%0A%0ARegards%2C%0A`;
        break;
      case 'map':
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        break;
      default:
        break;
    }
  };

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
            We're here to help! Choose your preferred way to connect with our team.
          </p>
        </div>

        {/* Contact Info Grid - Hierarchical Layout */}
        <div className={`max-w-6xl mx-auto fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
          
          {/* Primary Contact Cards - Larger, more prominent */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-secondary-500" />
              <h3 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                Fastest Way to Reach Us
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {primaryContacts.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 shimmer-card ${
                      isDark ? "bg-dark-card" : "bg-white"
                    } shadow-xl border-2 border-secondary-500/30 hover:border-secondary-500/60 cursor-pointer overflow-hidden`}
                    onMouseEnter={() => setHoveredCard(info.title)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => {
                      if (info.action === 'call') {
                        handleContactAction('call', info.primaryNumber);
                      } else if (info.action === 'whatsapp') {
                        handleContactAction('whatsapp', { number: info.number });
                      }
                    }}
                  >
                    {/* Priority Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary-500/20 text-secondary-500">
                        PRIORITY
                      </span>
                    </div>
                    
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-text-light-primary dark:text-text-dark-primary mb-1">
                      {info.title}
                    </h3>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-3">
                      {info.subtitle}
                    </p>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-base font-medium text-text-light-primary dark:text-text-dark-primary">
                        {detail}
                      </p>
                    ))}
                    
                    {/* Action Button */}
                    <div className="mt-5 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-secondary-500 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        {info.actionLabel}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary Contact Cards */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-text-light-muted dark:text-text-dark-muted" />
              <h3 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                Other Ways to Connect
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {secondaryContacts.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shimmer-card ${
                      isDark ? "bg-dark-card" : "bg-white"
                    } shadow-md border border-gray-200 dark:border-gray-800 hover:border-secondary-500/30 cursor-pointer`}
                    onClick={() => {
                      if (info.action === 'email') {
                        handleContactAction('email', { email: info.email });
                      } else if (info.action === 'map') {
                        handleContactAction('map', { location: info.location });
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-poppins font-semibold text-lg text-text-light-primary dark:text-text-dark-primary">
                            {info.title}
                          </h3>
                          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                            {info.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-light-muted dark:text-text-dark-muted group-hover:translate-x-1 group-hover:text-secondary-500 transition-all" />
                    </div>
                    
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-3 ml-14">
                        {detail}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phone Numbers with Direct Actions - Quick Action Bar */}
          <div className={`mt-8 rounded-2xl p-5 ${
            isDark ? "bg-dark-card" : "bg-white"
          } shadow-lg border border-green-500/20 bg-gradient-to-r from-green-500/5 to-transparent`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Quick Connect Hotline
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Tap any number to call directly - We're available 9 AM to 7 PM
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleContactAction('call', '8888800773')}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-poppins font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  8888800773
                </button>
                
                <button
                  onClick={() => handleContactAction('call', '9763473858')}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-secondary-500 text-secondary-500 font-poppins font-semibold hover:bg-secondary-500 hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  97634 73858
                </button>

                <button
                  onClick={() => handleContactAction('whatsapp', { number: '8888800773' })}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-poppins font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Support Info Cards */}
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className={`rounded-2xl p-5 ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-md border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Quick Response
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    We reply within 24 hours
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-text-light-muted dark:text-text-dark-muted">Average response</p>
                  <p className="text-sm font-semibold text-blue-500">&lt; 12 hours</p>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-md border border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-transparent`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Business Hours
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Monday - Saturday: 9:00 AM - 7:00 PM
                  </p>
                  <p className="text-xs text-text-light-muted dark:text-text-dark-muted">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section with Satellite/Street View */}
        <div className={`mt-12 max-w-6xl mx-auto fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.45s" }}>
          <div className={`rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 ${
            isDark ? "bg-dark-card" : "bg-white"
          }`}>
            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary-500" />
                <span className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                  Our Location
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary-500/10 text-secondary-500">
                  Visit Us
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleContactAction('map', { location: fullAddress })}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-500/10 text-secondary-500 text-sm font-medium hover:bg-secondary-500/20 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <a
                  href={`https://www.google.com/maps/place/${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Full Screen
                </a>
              </div>
            </div>
            
            {/* Address Display */}
            <div className="p-5 bg-secondary-500/5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Sushiraj Enterprises
                  </p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    F-7, Shubham Residency, near Khare Sanskrutik Bhavan, <br />
                    Vishrambag, Sangli, Maharashtra 416416, India
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-[400px] lg:h-[450px] bg-gray-100 dark:bg-gray-900">
              {GOOGLE_MAPS_API_KEY ? (
                <iframe
                  title="Sushiraj Enterprises Location - Shubham Residency, Sangli"
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}&zoom=18&maptype=roadmap`}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-text-light-secondary dark:text-text-dark-secondary">
                      Google Maps API key not configured
                    </p>
                    <p className="text-sm text-text-light-muted dark:text-text-dark-muted mt-1">
                      Please add VITE_GOOGLE_MAPS_API_KEY to your .env file
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Location Features */}
            <div className="p-5 bg-gray-50 dark:bg-gray-900/50 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-text-light-muted dark:text-text-dark-muted">Nearby Landmark</p>
                <p className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">Khare Sanskrutik Bhavan</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-light-muted dark:text-text-dark-muted">Area</p>
                <p className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">Vishrambag</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-light-muted dark:text-text-dark-muted">City</p>
                <p className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">Sangli</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-light-muted dark:text-text-dark-muted">PIN Code</p>
                <p className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">416416</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 z-50 lg:hidden">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleContactAction('whatsapp', { number: '8888800773' })}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleContactAction('call', '8888800773')}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Call"
            >
              <Phone className="w-6 h-6" />
            </button>
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

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle, .cursor-glow, .shimmer-card::after { display: none; }
          .fade-up.visible { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}