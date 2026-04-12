import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Wrench,
  Droplets,
  FileText,
  Zap,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Clock,
  Users,
  Award,
  Calendar,
  Headphones,
  Truck,
  Settings,
} from "lucide-react";

export default function Services() {
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

    const section = document.getElementById("services");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "RO Installation",
      description: "Professional RO water purifier installation with free demo and guidance by certified technicians.",
      icon: Wrench,
      features: ["Free Demo", "Certified Technicians", "Same Day Service"],
      color: "from-blue-500 to-cyan-500",
      bgHover: "hover:border-blue-500/40",
      iconColor: "text-blue-500",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: 2,
      title: "Water Filter Service",
      description: "Regular maintenance, filter replacement, and water quality testing for optimal performance.",
      icon: Droplets,
      features: ["Quality Testing", "Original Filters", "Monthly Checkup"],
      color: "from-emerald-500 to-teal-500",
      bgHover: "hover:border-emerald-500/40",
      iconColor: "text-emerald-500",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: 3,
      title: "AMC Maintenance",
      description: "Annual Maintenance Contract with priority support, free checkups, and discounted repairs.",
      icon: FileText,
      features: ["Priority Support", "Free Checkups", "Discounted Repairs"],
      color: "from-amber-500 to-orange-500",
      bgHover: "hover:border-amber-500/40",
      iconColor: "text-amber-500",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: 4,
      title: "Repair & Support",
      description: "24/7 emergency repair service and technical support for all water purification systems.",
      icon: Zap,
      features: ["24/7 Emergency", "Quick Response", "Expert Technicians"],
      color: "from-rose-500 to-pink-500",
      bgHover: "hover:border-rose-500/40",
      iconColor: "text-rose-500",
      gradient: "from-rose-500/20 to-pink-500/20",
    },
  ];

  const benefits = [
    { icon: Shield, title: "5 Year Warranty", description: "Complete repair or replacement coverage" },
    { icon: Clock, title: "24/7 Support", description: "Round the clock emergency service" },
    { icon: Users, title: "Expert Team", description: "Certified & experienced technicians" },
    { icon: Award, title: "Best Price", description: "Affordable rates guaranteed" },
  ];

  // Floating particles config
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 10,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 10,
    duration: 5 + Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.25,
  }));

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`py-20 sm:py-28 lg:py-36 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-surface" : "bg-white"
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
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span className="text-secondary-500 font-poppins text-sm font-medium">What We Offer</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-1px] sm:tracking-[-2px] text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            Our <span className="text-secondary-500">Services</span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            Comprehensive water purification solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid - Main Cards */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 fade-up ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0.3s" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-3 overflow-hidden shimmer-card ${
                  isDark ? "bg-dark-card" : "bg-white"
                } shadow-lg border border-gray-200 dark:border-gray-800 ${service.bgHover}`}
                style={{ animationDelay: `${0.3 + index * 0.08}s` }}
              >
                {/* Animated gradient background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Icon container with pulse effect */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-3 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-full h-full text-white" strokeWidth={1.5} />
                </div>
                
                <h3 className={`font-poppins font-bold text-xl text-text-light-primary dark:text-text-dark-primary mb-3 relative z-10 ${service.iconColor}`}>
                  {service.title}
                </h3>
                
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4 relative z-10">
                  {service.description}
                </p>
                
                {/* Features list */}
                <div className="space-y-2 mb-4 relative z-10">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${service.iconColor}`} strokeWidth={1.5} />
                      <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
                
               
                
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Benefits Banner */}
        <div
          className={`mb-16 fade-up ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className={`rounded-2xl p-8 shimmer-card ${
            isDark ? "bg-dark-card" : "bg-gradient-to-r from-secondary-50 to-white"
          } shadow-lg border border-secondary-500/20`}>
            
            <div className="text-center mb-8">
              <h3 className="font-poppins font-bold text-2xl text-text-light-primary dark:text-text-dark-primary">
                Why Choose <span className="text-secondary-500">Sushiraj Enterprise ?</span>
              </h3>
              <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">
                We deliver excellence with every service
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 mx-auto rounded-full bg-secondary-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-secondary-500" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-poppins font-semibold text-text-light-primary dark:text-text-dark-primary">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

{/* Warranty & Pricing Banner */}
<div
  className={`mb-16 fade-up ${visible ? "visible" : ""}`}
  style={{ animationDelay: "0.45s" }}
>
  <div className="grid md:grid-cols-2 gap-6">
    
   {/* Warranty Card */}
<div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
  isDark ? "bg-dark-card" : "bg-white"
} shadow-lg border-l-4 border-l-secondary-500 border border-gray-200 dark:border-gray-800`}>
  
  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-500/5 group-hover:bg-secondary-500/10 transition-all duration-500"></div>
  
  <div className="relative z-10">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-4 shadow-lg">
      <Shield className="w-7 h-7 text-white" strokeWidth={1.5} />
    </div>
    
    <h3 className="font-poppins font-bold text-2xl text-text-light-primary dark:text-text-dark-primary mb-1">
      5 Years
    </h3>
    <p className="text-secondary-500 font-medium text-sm mb-4">Complete Warranty</p>
    
    {/* Warranty Features */}
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-emerald-500" strokeWidth={2} />
        </div>
        <span className="text-sm">Free Installation & Maintenance</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-emerald-500" strokeWidth={2} />
        </div>
        <span className="text-sm">Free Repair or Replacement</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-emerald-500" strokeWidth={2} />
        </div>
        <span className="text-sm">24/7 Customer Support</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-emerald-500" strokeWidth={2} />
        </div>
        <span className="text-sm">Certified Technicians</span>
      </div>
    </div>
    
    {/* Warranty Badge */}
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 mt-2">
      <Shield className="w-3 h-3 text-secondary-500" strokeWidth={2} />
      <span className="text-xs text-secondary-600 dark:text-secondary-400 font-medium">100% Genuine Warranty</span>
    </div>
    
    <p className="text-xs text-amber-500 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      *Consequential damages not covered
    </p>
  </div>
</div>
    
    {/* Pricing Card */}
    <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
      isDark ? "bg-dark-card" : "bg-white"
    } shadow-lg border-r-4 border-r-secondary-500 border border-gray-200 dark:border-gray-800`}>
      
      <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-secondary-500/5 group-hover:bg-secondary-500/10 transition-all duration-500"></div>
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-4 shadow-lg">
          <Award className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        
        <h3 className="font-poppins font-bold text-2xl text-text-light-primary dark:text-text-dark-primary mb-1">
          Best Prices
        </h3>
        <p className="text-secondary-500 font-medium text-sm mb-4">Starts From</p>
        
        <div className="space-y-4">
          {/* Water Conditioner */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-secondary-500/5 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-secondary-500" />
                <span className="font-semibold text-sm">Water Conditioner</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-secondary-500 text-xl">₹28,000</span>
                <span className="text-xs text-text-light-muted">/+</span>
              </div>
            </div>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary pl-6">
              Depends on pipe diameter • Various models available
            </p>
          </div>
          
          {/* RO Plants */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-secondary-500/5 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-secondary-500" />
                <span className="font-semibold text-sm">RO Plants</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-secondary-500 text-xl">₹25,000</span>
                <span className="text-xs text-text-light-muted">/+</span>
              </div>
            </div>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary pl-6">
              25 LPH to 1000 LPH capacity • Cost depends on capacity
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Truck className="w-4 h-4 text-secondary-500" />
          <span className="text-sm">Free Site Visit & Consultation</span>
        </div>
      </div>
    </div>
    
  </div>
</div>

        {/* CTA Banner */}
        <div
          className={`fade-up ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary-600 to-secondary-500 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 1000 1000">
                <circle cx="200" cy="200" r="150" fill="white" />
                <circle cx="800" cy="800" r="200" fill="white" />
                <circle cx="500" cy="500" r="100" fill="white" />
                <circle cx="300" cy="700" r="80" fill="white" />
                <circle cx="700" cy="300" r="120" fill="white" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-3">
                Ready for Pure Water?
              </h3>
              <p className="text-white/90 mb-8 max-w-md mx-auto">
                Contact our experts for free consultation and site visit
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <a href="tel:8888800773" className="flex items-center gap-2 text-white bg-white/20 px-5 py-2.5 rounded-full hover:bg-white/30 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                  8888800773
                </a>
                <a href="tel:9763473858" className="flex items-center gap-2 text-white bg-white/20 px-5 py-2.5 rounded-full hover:bg-white/30 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                  97634 73858
                </a>
                <a href="mailto:Sushiraj.enterprises@gmail.com" className="flex items-center gap-2 text-white bg-white/20 px-5 py-2.5 rounded-full hover:bg-white/30 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-secondary-600 font-poppins font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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