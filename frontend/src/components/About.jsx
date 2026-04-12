import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState({
    families: 0,
    installations: 0,
    experience: 0,
    satisfaction: 0
  });
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
          startCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    const targets = { families: 5000, installations: 1000, experience: 5, satisfaction: 99 };
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounters({
        families: Math.min(Math.floor(targets.families * progress), targets.families),
        installations: Math.min(Math.floor(targets.installations * progress), targets.installations),
        experience: Math.min(Math.floor(targets.experience * progress), targets.experience),
        satisfaction: Math.min(Math.floor(targets.satisfaction * progress), targets.satisfaction),
      });
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
  };

  // SVG Icons
  const DropIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.69L5 10.19C5 13.83 8.13 17 12 17C15.87 17 19 13.83 19 10.19L12 2.69Z" fill="currentColor" />
    </svg>
  );
  const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
  const LeafIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C9 7 4 9 4 14c0 4 4 6 8 6s8-2 8-6c0-5-5-7-8-12z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 2v18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
  const AwardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M12 14v8M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const QuoteIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H10C10.5304 5 11.0391 5.21071 11.4142 5.58579C11.7893 5.96086 12 6.46957 12 7V13C12 14.3261 11.4732 15.5979 10.5355 16.5355C9.59785 17.4732 8.32608 18 7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V13C22 14.3261 21.4732 15.5979 20.5355 16.5355C19.5979 17.4732 18.3261 18 17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const features = [
    { icon: <ShieldIcon />, title: "5 Year Warranty", description: "Complete repair or replacement coverage for 5 years from purchase date", color: "from-blue-500 to-cyan-500", bgHover: "hover:border-blue-500/40", iconColor: "text-blue-500" },
    { icon: <HeartIcon />, title: "Customer First", description: "5000+ happy families trust our water purification systems", color: "from-rose-500 to-pink-500", bgHover: "hover:border-rose-500/40", iconColor: "text-rose-500" },
    { icon: <LeafIcon />, title: "Installation Service", description: "Professional installation & maintenance for 5 years", color: "from-emerald-500 to-teal-500", bgHover: "hover:border-emerald-500/40", iconColor: "text-emerald-500" },
    { icon: <AwardIcon />, title: "Best Pricing", description: "Water conditioner from ₹28,000 | RO plant from ₹25,000", color: "from-amber-500 to-orange-500", bgHover: "hover:border-amber-500/40", iconColor: "text-amber-500" },
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
      id="about"
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

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span className="text-secondary-500 font-poppins text-sm font-medium">Since 2020</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-1px] sm:tracking-[-2px] text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            More Than Just
            <br />
            <span className="bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Pure Water
            </span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            We're on a mission to provide every home with safe, pure, and great-tasting water through innovative technology and exceptional service.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">

          {/* Left Side */}
          <div className={`space-y-6 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
            {/* Quote Card */}
            <div className={`relative rounded-2xl p-6 sm:p-8 shimmer-card ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg border border-secondary-500/10`}>
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center">
                <QuoteIcon />
              </div>
              <p className="font-poppins text-xl sm:text-2xl lg:text-3xl font-semibold text-text-light-primary dark:text-text-dark-primary leading-relaxed pt-4 pl-2">
                Water isn't just our business.
                <span className="text-secondary-500"> It's our passion.</span>
              </p>
            </div>

            {/* Description */}
            <div className={`space-y-4 p-6 sm:p-8 rounded-2xl shimmer-card ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg`}>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                Founded in <span className="text-secondary-500 font-semibold">2020</span>, Sushiraj Enterprise began with a simple yet powerful vision: to make clean, healthy drinking water accessible to every home.
              </p>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                We believe that <span className="text-secondary-500 font-semibold">pure water is the foundation of a healthy life</span>. That's why we've dedicated ourselves to providing cutting-edge RO systems, reliable maintenance, and unparalleled customer support.
              </p>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                Our team of certified technicians and water quality experts works tirelessly to ensure that every drop from your tap meets the highest standards of purity and safety.
              </p>
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-4 items-center content-center self-center">
            <div className={`space-y-4 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.35s" }}>
              <div className={`rounded-2xl p-6 text-center transition-all duration-300 group shimmer-card ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg border border-secondary-500/20 hover:border-secondary-500/40`}>
                <div className="text-secondary-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  <UsersIcon />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.families.toLocaleString()}+
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">Happy Families</div>
              </div>
              <div className={`rounded-2xl p-6 text-center transition-all duration-300 group shimmer-card ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg border border-emerald-500/20 hover:border-emerald-500/40`}>
                <div className="text-emerald-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  <DropIcon />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.installations.toLocaleString()}+
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">Installations</div>
              </div>
            </div>
            <div className={`space-y-4 mt-4 sm:mt-8 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
              <div className={`rounded-2xl p-6 text-center transition-all duration-300 group shimmer-card ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg border border-amber-500/20 hover:border-amber-500/40`}>
                <div className="text-amber-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  <ClockIcon />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.experience}+
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">Years of Trust</div>
              </div>
              <div className={`rounded-2xl p-6 text-center transition-all duration-300 group shimmer-card ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg border border-rose-500/20 hover:border-rose-500/40`}>
                <div className="text-rose-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  <AwardIcon />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.satisfaction}%
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

       

        {/* Features Grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 sm:mb-20 fade-up ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0.5s" }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden shimmer-card ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-lg border border-gray-200 dark:border-gray-800 ${feature.bgHover}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none feature-hover-glow" />

              <div className={`${feature.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-lg text-text-light-primary dark:text-text-dark-primary mb-2 relative z-10">
                {feature.title}
              </h3>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
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

        .feature-hover-glow {
          background: radial-gradient(circle at 50% 0%, rgba(26,188,156,0.08) 0%, transparent 70%);
        }
        .dark .feature-hover-glow {
          background: radial-gradient(circle at 50% 0%, rgba(28,230,201,0.1) 0%, transparent 70%);
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