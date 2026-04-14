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
  AlertCircle,
  ArrowRight,
  Truck,
  Settings,
  Sparkles,
  Heart,
  Award,
  Star,
  Clock,
  ThumbsUp,
  Briefcase
} from "lucide-react";

export default function Services() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const intervalRef = useRef(null);

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
      glow.style.opacity = "0.6";
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

  // Auto rotate through services
  useEffect(() => {
    if (!visible) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [visible]);

  const services = [
    {
      id: 1,
      title: "RO Installation",
      shortDesc: "Expert RO system installation with lifetime support",
      description: "Get your RO water purifier installed professionally by our certified technicians. We ensure proper plumbing, electrical connections, and optimal placement for maximum efficiency.",
      icon: Wrench,
      image: "/services/ro-installation.jpg",
      features: ["Free Demo & Training", "Certified Technicians", "Same Day Service", "Free Installation", "Lifetime Support", "Warranty Included"],
      stats: { time: "2-3 Hours", experience: "5+ Years", satisfaction: "99%" },
      color: "from-cyan-600 to-blue-600",
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      number: "01"
    },
    {
      id: 2,
      title: "Water Filter Service",
      shortDesc: "Complete filter maintenance and replacement",
      description: "Regular maintenance keeps your water purifier running at peak performance. We use only genuine filters and provide detailed water quality reports after every service.",
      icon: Droplets,
      image: "/services/water-filter-service.jpg",
      features: ["Water Quality Testing", "Original Filters Only", "Monthly Checkup", "Performance Report", "Filter Replacement", "System Sanitization"],
      stats: { time: "1-2 Hours", experience: "1000+ Services", satisfaction: "98%" },
      color: "from-emerald-600 to-teal-600",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      number: "02"
    },
    {
      id: 3,
      title: "AMC Maintenance",
      shortDesc: "Annual Maintenance Contract for peace of mind",
      description: "Never worry about maintenance again with our comprehensive AMC plans. Enjoy priority service, discounted repairs, and regular checkups throughout the year.",
      icon: FileText,
      image: "/services/amc-maintenance.jpg",
      features: ["Priority Support", "Free Annual Checkups", "Discounted Repairs", "Quarterly Service", "Emergency Coverage", "Filter Replacement"],
      stats: { time: "Yearly Plan", experience: "500+ Clients", satisfaction: "97%" },
      color: "from-amber-600 to-orange-600",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
      number: "03"
    },
    {
      id: 4,
      title: "Repair & Support",
      shortDesc: "24/7 emergency repair service",
      description: "Water purifier breakdown? Don't worry! Our expert technicians are available round the clock to fix any issue with genuine spare parts and quick response time.",
      icon: Zap,
      image: "/services/repair-support.jpg",
      features: ["24/7 Emergency Service", "Quick Response Time", "Expert Technicians", "Genuine Spare Parts", "90-Day Warranty", "Free Inspection"],
      stats: { time: "1 Hour Response", experience: "2000+ Repairs", satisfaction: "96%" },
      color: "from-rose-600 to-pink-600",
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
      number: "04"
    },
  ];

  const currentService = services[activeIndex];
  const prevIndex = (activeIndex - 1 + services.length) % services.length;
  const nextIndex = (activeIndex + 1) % services.length;

  const goToService = (index) => {
    setActiveIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
  };

  // Floating particles config
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 6,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 10,
    opacity: 0.05 + Math.random() * 0.1,
  }));

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`py-16 sm:py-20 lg:py-24 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-surface" : "bg-gray-50"
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

      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-secondary-500/3 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4 fade-up ${visible ? "visible" : ""}`}>
            <Sparkles className="w-3.5 h-3.5 text-secondary-500" />
            <span className="text-secondary-500 font-poppins text-xs font-medium">Our Services</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-text-light-primary dark:text-text-dark-primary mb-3 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            What <span className="text-secondary-500">We Offer</span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            Comprehensive water purification solutions tailored to your needs
          </p>
        </div>

        {/* Main Service Carousel */}
        <div className={`fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
          <div className="relative max-w-5xl mx-auto">
            
            {/* Navigation Buttons */}
            <button
              onClick={() => goToService(prevIndex)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-5 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-secondary-500 hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goToService(nextIndex)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-5 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-secondary-500 hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Service Card - Image Fills Entire Section */}
            <div className="relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${currentService.color} rounded-2xl blur-md opacity-15`}></div>
              
              <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-lg`}>
                <div className="grid md:grid-cols-2 gap-0">
                  
                  {/* Left Side - Image Fills Entire Section */}
                  <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden">
                    <img
                      src={currentService.image}
                      alt={currentService.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/services/placeholder.jpg";
                      }}
                    />
                    
                    {/* Dark overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon on image */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        {currentService.icon && <currentService.icon className="w-5 h-5 text-white" strokeWidth={1.5} />}
                      </div>
                    </div>
                    
                    {/* Step Badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="text-white/90 text-xs font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        Step {currentService.number} of {services.length}
                      </div>
                    </div>
                    
                    {/* Title overlay on image for mobile */}
                    <div className="absolute bottom-4 right-4 z-10 md:hidden">
                      <h3 className="text-white font-bold text-lg text-right">
                        {currentService.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Side - Content (Hidden on mobile, shown on desktop) */}
                  <div className="hidden md:block p-6 md:p-8 flex flex-col h-full">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                        {currentService.title}
                      </h3>
                      <p className="text-secondary-500 text-sm font-medium">
                        {currentService.shortDesc}
                      </p>
                    </div>
                    
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm leading-relaxed mb-5">
                      {currentService.description}
                    </p>
                    
                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-secondary-500 mx-auto mb-1" />
                        <div className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary">{currentService.stats.time}</div>
                        <div className="text-[10px] text-text-light-secondary">Est. Time</div>
                      </div>
                      <div className="text-center">
                        <Briefcase className="w-4 h-4 text-secondary-500 mx-auto mb-1" />
                        <div className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary">{currentService.stats.experience}</div>
                        <div className="text-[10px] text-text-light-secondary">Experience</div>
                      </div>
                      <div className="text-center">
                        <ThumbsUp className="w-4 h-4 text-secondary-500 mx-auto mb-1" />
                        <div className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary">{currentService.stats.satisfaction}</div>
                        <div className="text-[10px] text-text-light-secondary">Satisfaction</div>
                      </div>
                    </div>
                    
                    {/* Features Section - 2 columns */}
                    <div className="mb-5">
                      <h4 className="font-poppins font-semibold text-sm text-text-light-primary dark:text-text-dark-primary mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary-500" />
                        Service Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {currentService.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                          >
                            <div className={`w-5 h-5 rounded-full ${currentService.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <CheckCircle className={`w-3 h-3 ${currentService.iconColor}`} strokeWidth={2} />
                            </div>
                            <span className="text-text-light-secondary dark:text-text-dark-secondary text-xs">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold text-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      Get Quote
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-1.5 mt-6">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToService(idx)}
                  className={`transition-all duration-500 rounded-full ${
                    activeIndex === idx
                      ? "w-6 h-1.5 bg-secondary-500"
                      : `w-1.5 h-1.5 ${isDark ? "bg-gray-700" : "bg-gray-300"} hover:bg-secondary-400`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Content Section - Shows below image on mobile */}
        <div className="md:hidden mt-4 p-4">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">
              {currentService.title}
            </h3>
            <p className="text-secondary-500 text-xs font-medium">
              {currentService.shortDesc}
            </p>
          </div>
          
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs leading-relaxed mb-4">
            {currentService.description}
          </p>
          
          {/* Stats Section - Mobile */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="text-center">
              <Clock className="w-4 h-4 text-secondary-500 mx-auto mb-1" />
              <div className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary">{currentService.stats.time}</div>
              <div className="text-[10px] text-text-light-secondary">Est. Time</div>
            </div>
            <div className="text-center">
              <Briefcase className="w-4 h-4 text-secondary-500 mx-auto mb-1" />
              <div className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary">{currentService.stats.experience}</div>
              <div className="text-[10px] text-text-light-secondary">Experience</div>
            </div>
            <div className="text-center">
              <ThumbsUp className="w-4 h-4 text-secondary-500 mx-auto mb-1" />
              <div className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary">{currentService.stats.satisfaction}</div>
              <div className="text-[10px] text-text-light-secondary">Satisfaction</div>
            </div>
          </div>
          
          {/* Features - Mobile */}
          <div className="mb-4">
            <h4 className="font-poppins font-semibold text-xs text-text-light-primary dark:text-text-dark-primary mb-2 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-secondary-500" />
              Service Highlights
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {currentService.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-full ${currentService.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <CheckCircle className={`w-2.5 h-2.5 ${currentService.iconColor}`} strokeWidth={2} />
                  </div>
                  <span className="text-text-light-secondary dark:text-text-dark-secondary text-[10px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold text-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Get Quote
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
{/* Warranty & Pricing Section - Improved */}
<div
  className={`mt-12 fade-up ${visible ? "visible" : ""}`}
  style={{ animationDelay: "0.4s" }}
>
  <div className="grid md:grid-cols-2 gap-5">
    
    {/* Warranty Card - Filled with more content */}
    <div className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 ${
      isDark ? "bg-dark-card" : "bg-white"
    } shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-800`}>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/0 via-secondary-500/5 to-secondary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-secondary-500/5 group-hover:bg-secondary-500/10 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-secondary-500/5 group-hover:bg-secondary-500/10 transition-all duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-xl text-text-light-primary dark:text-text-dark-primary">
              5 Year Warranty
            </h3>
            <p className="text-secondary-500 text-xs font-medium">Complete peace of mind</p>
          </div>
        </div>
        
        {/* Warranty Coverage - 2 columns */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-emerald-500/10 rounded-lg p-2.5 text-center group-hover:scale-105 transition-transform duration-300">
            <div className="text-emerald-500 text-lg font-bold">100%</div>
            <div className="text-[10px] text-text-light-secondary">Parts Coverage</div>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-2.5 text-center group-hover:scale-105 transition-transform duration-300">
            <div className="text-emerald-500 text-lg font-bold">100%</div>
            <div className="text-[10px] text-text-light-secondary">Labor Coverage</div>
          </div>
        </div>
        
        {/* Warranty Features */}
        <div className="space-y-2 mb-3">
          {[
            { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "Free Installation & Maintenance", color: "text-emerald-500" },
            { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "Free Repair or Replacement", color: "text-emerald-500" },
            { icon: <Clock className="w-3.5 h-3.5" />, text: "24/7 Customer Support", color: "text-secondary-500" },
            { icon: <Truck className="w-3.5 h-3.5" />, text: "Nationwide Service Network", color: "text-secondary-500" },
            { icon: <Settings className="w-3.5 h-3.5" />, text: "Free Annual Checkup", color: "text-secondary-500" },
            { icon: <ThumbsUp className="w-3.5 h-3.5" />, text: "100% Genuine Parts", color: "text-secondary-500" }
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2.5 text-sm group-hover:translate-x-1 transition-transform duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`${item.color}`}>
                {item.icon}
              </div>
              <span className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Warranty Badge */}
        <div className="mt-3 p-2.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400">Consequential damages not covered</span>
            </div>
            <div className="text-[10px] text-amber-500/60">Terms apply</div>
          </div>
        </div>
      </div>
    </div>

    {/* Pricing Card - Redesigned */}
    <div className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 ${
      isDark ? "bg-dark-card" : "bg-white"
    } shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-800`}>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-secondary-500/0 via-secondary-500/5 to-secondary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Decorative circle */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-secondary-500/5 group-hover:bg-secondary-500/10 transition-all duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-xl text-text-light-primary dark:text-text-dark-primary">
              Best Prices
            </h3>
            <p className="text-secondary-500 text-xs font-medium">Affordable & Transparent</p>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="space-y-3">
          {/* Water Conditioner */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-secondary-500/5 to-transparent border border-secondary-500/10 group-hover:border-secondary-500/20 transition-all duration-300 group-hover:bg-secondary-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">Water Conditioner</p>
                <p className="text-[10px] text-text-light-secondary">Depends on pipe diameter</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-secondary-500 text-2xl">₹28k</span>
              <span className="text-xs text-text-light-muted">+</span>
              <p className="text-[9px] text-text-light-muted">excl. GST</p>
            </div>
          </div>
          
          {/* RO Plants */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-secondary-500/5 to-transparent border border-secondary-500/10 group-hover:border-secondary-500/20 transition-all duration-300 group-hover:bg-secondary-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">RO Plants</p>
                <p className="text-[10px] text-text-light-secondary">25 - 1000 LPH capacity</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-secondary-500 text-2xl">₹25k</span>
              <span className="text-xs text-text-light-muted">+</span>
              <p className="text-[9px] text-text-light-muted">excl. GST</p>
            </div>
          </div>
          
          {/* Free Installation */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-emerald-500/15 to-transparent border border-emerald-500/30 group-hover:border-emerald-500/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">Free Installation</p>
                <p className="text-[10px] text-text-light-secondary">Limited time offer</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-500 text-xl">FREE</span>
              <p className="text-[9px] text-emerald-500/70">Save ₹5,000+</p>
            </div>
          </div>
        </div>
        
        {/* Free Consultation & Rating */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <Truck className="w-3 h-3 text-secondary-500" />
              </div>
              <span className="text-[10px] text-text-light-secondary">Free Site Visit & Consultation</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-xs font-semibold text-secondary-500 ml-1">4.9</span>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="text-[9px] text-text-light-secondary">Call for bulk discounts</div>
          <div className="w-1 h-1 rounded-full bg-secondary-500"></div>
          <div className="text-[9px] text-text-light-secondary">EMI available</div>
        </div>
      </div>
    </div>
    
  </div>
</div>

      </div>

      <style>{`
        .cursor-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle, rgba(26,188,156,0.06) 0%, transparent 70%);
          transition: opacity 0.3s ease;
        }

        .bg-grid-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .bg-grid-light {
          background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 35px 35px;
        }
        .bg-grid-dark {
          background-image: linear-gradient(rgba(28,230,201,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(28,230,201,0.04) 1px, transparent 1px);
          background-size: 35px 35px;
        }

        .bg-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .vignette-light {
          background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(249,250,251,0.9) 100%);
        }
        .vignette-dark {
          background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(12,20,34,0.95) 100%);
        }

        .particle {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(26,188,156,0.25), rgba(26,188,156,0.1));
          animation: floatUp linear infinite;
          pointer-events: none;
          z-index: 0;
        }
        .dark .particle {
          background: linear-gradient(135deg, rgba(28,230,201,0.2), rgba(28,230,201,0.05));
        }

        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-90vh) translateX(20px); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; transform: translateY(25px); }
        .fade-up.visible { animation: fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </section>
  );
}