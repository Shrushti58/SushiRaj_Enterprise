import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { t } = useTranslation();
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.69L5 10.19C5 13.83 8.13 17 12 17C15.87 17 19 13.83 19 10.19L12 2.69Z" fill="currentColor" />
    </svg>
  );
  const ShieldIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const HeartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
  const LeafIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C9 7 4 9 4 14c0 4 4 6 8 6s8-2 8-6c0-5-5-7-8-12z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 2v18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
  const AwardIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M12 14v8M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const ClockIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const UsersIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const features = [
    { key: "warranty", icon: <ShieldIcon />, color: "from-blue-500 to-cyan-500", bgHover: "hover:border-blue-500/40", iconColor: "text-blue-500" },
    { key: "customerFirst", icon: <HeartIcon />, color: "from-rose-500 to-pink-500", bgHover: "hover:border-rose-500/40", iconColor: "text-rose-500" },
    { key: "ecoFriendly", icon: <LeafIcon />, color: "from-emerald-500 to-teal-500", bgHover: "hover:border-emerald-500/40", iconColor: "text-emerald-500" },
    { key: "bestPricing", icon: <AwardIcon />, color: "from-amber-500 to-orange-500", bgHover: "hover:border-amber-500/40", iconColor: "text-amber-500" },
  ];

  // Floating particles config
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 7,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 relative overflow-hidden ${
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

      {/* Animated background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary-500/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-500/5 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4 fade-up ${visible ? "visible" : ""}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary-500"></span>
            </span>
            <span className="text-secondary-500 font-poppins text-xs font-medium">{t('about.since')}</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-1px] text-text-light-primary dark:text-text-dark-primary mb-3 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            {t('about.title')}
            <br />
            <span className="bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">
              {t('about.titleHighlight')}
            </span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            {t('about.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-10">

          {/* Left Side - Quote Card */}
          <div className={`space-y-5 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
            <div className={`relative rounded-xl p-5 sm:p-6 overflow-hidden ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-lg border border-secondary-500/20 group hover:shadow-xl transition-all duration-500`}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-secondary-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-500">
                      <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H10C10.5304 5 11.0391 5.21071 11.4142 5.58579C11.7893 5.96086 12 6.46957 12 7V13C12 14.3261 11.4732 15.5979 10.5355 16.5355C9.59785 17.4732 8.32608 18 7 18" />
                      <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V13C22 14.3261 21.4732 15.5979 20.5355 16.5355C19.5979 17.4732 18.3261 18 17 18" />
                    </svg>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-secondary-500/20 to-transparent"></div>
                </div>
                <p className="font-poppins text-lg sm:text-xl lg:text-2xl font-semibold text-text-light-primary dark:text-text-dark-primary leading-relaxed">
                  {t('about.quote')}
                  <span className="text-secondary-500 block mt-1">{t('about.quoteHighlight')}</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className={`space-y-3 p-5 sm:p-6 rounded-xl shimmer-card ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-md border border-gray-200 dark:border-gray-800`}>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed text-sm">
                {t('about.description1')}
              </p>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed text-sm">
                {t('about.description2')}
              </p>
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`space-y-3 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.35s" }}>
              <div className={`rounded-xl p-4 text-center transition-all duration-300 group shimmer-card ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-md border border-secondary-500/20 hover:border-secondary-500/40 hover:shadow-lg`}>
                <div className="text-secondary-500 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  <UsersIcon />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.families.toLocaleString()}+
                </div>
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">{t('about.stats.happyFamilies')}</div>
              </div>
              <div className={`rounded-xl p-4 text-center transition-all duration-300 group shimmer-card ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-md border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg`}>
                <div className="text-emerald-500 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  <DropIcon />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.installations.toLocaleString()}+
                </div>
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">{t('about.stats.installations')}</div>
              </div>
            </div>
            <div className={`space-y-3 mt-3 sm:mt-6 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
              <div className={`rounded-xl p-4 text-center transition-all duration-300 group shimmer-card ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-md border border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg`}>
                <div className="text-amber-500 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  <ClockIcon />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.experience}+
                </div>
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">{t('about.stats.yearsTrust')}</div>
              </div>
              <div className={`rounded-xl p-4 text-center transition-all duration-300 group shimmer-card ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-md border border-rose-500/20 hover:border-rose-500/40 hover:shadow-lg`}>
                <div className="text-rose-500 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  <AwardIcon />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {counters.satisfaction}%
                </div>
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">{t('about.stats.satisfaction')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-up ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0.5s" }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden shimmer-card ${
                isDark ? "bg-dark-card" : "bg-white"
              } shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg ${feature.bgHover}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none feature-hover-glow" />
              <div className={`${feature.iconColor} mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-base text-text-light-primary dark:text-text-dark-primary mb-1 relative z-10">
                {t(`about.features.${feature.key}`)}
              </h3>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary leading-relaxed relative z-10">
                {t(`about.features.${feature.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .cursor-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle, rgba(26,188,156,0.08) 0%, transparent 70%);
          transition: opacity 0.3s ease;
        }

        .bg-grid-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .bg-grid-light {
          background-image: linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 35px 35px;
        }
        .bg-grid-dark {
          background-image: linear-gradient(rgba(28,230,201,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(28,230,201,0.06) 1px, transparent 1px);
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
          background: linear-gradient(135deg, rgba(26,188,156,0.4), rgba(26,188,156,0.2));
          animation: floatUp linear infinite;
          pointer-events: none;
          z-index: 0;
        }
        .dark .particle {
          background: linear-gradient(135deg, rgba(28,230,201,0.3), rgba(28,230,201,0.1));
        }

        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-90vh) translateX(20px); opacity: 0; }
        }

        .shimmer-card {
          position: relative;
          overflow: hidden;
        }
        .shimmer-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: none;
          pointer-events: none;
        }
        .shimmer-card:hover::after {
          animation: shimmerSweep 0.5s ease forwards;
        }
        .dark .shimmer-card::after {
          background: linear-gradient(105deg, transparent 40%, rgba(28,230,201,0.06) 50%, transparent 60%);
        }

        @keyframes shimmerSweep {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        .feature-hover-glow {
          background: radial-gradient(circle at 50% 0%, rgba(26,188,156,0.08) 0%, transparent 70%);
        }
        .dark .feature-hover-glow {
          background: radial-gradient(circle at 50% 0%, rgba(28,230,201,0.1) 0%, transparent 70%);
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