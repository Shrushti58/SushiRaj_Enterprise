import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../context/ThemeContext";
import { Star, Quote, User, CheckCircle, Sprout, Droplets, Tractor, Leaf } from "lucide-react";

export default function Testimonials() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Cursor light-spot effect (disabled on mobile)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("testimonials");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    // Agriculture Testimonials
    {
      id: 1,
      rating: 5,
      text: t('testimonials.agri1'),
      product: t('testimonials.ubcalAgriculture'),
      category: "agriculture",
      verified: true,
    },
    {
      id: 2,
      rating: 5,
      text: t('testimonials.agri2'),
      product: t('testimonials.ubcalAgriculture'),
      category: "agriculture",
      verified: true,
    },
    {
      id: 3,
      rating: 5,
      text: t('testimonials.agri3'),
      product: t('testimonials.ubcalAgriculture'),
      category: "agriculture",
      verified: true,
    },
    {
      id: 4,
      rating: 5,
      text: t('testimonials.agri4'),
      product: t('testimonials.ubcalAgriculture'),
      category: "agriculture",
      verified: true,
    },
    {
      id: 5,
      rating: 5,
      text: t('testimonials.agri5'),
      product: t('testimonials.ubcalAgriculture'),
      category: "agriculture",
      verified: true,
    },
    {
      id: 6,
      rating: 4,
      text: t('testimonials.agri6'),
      product: t('testimonials.ubcalAgriculture'),
      category: "agriculture",
      verified: true,
    },
    
    // RO Water Purifier Testimonials
    {
      id: 7,
      rating: 5,
      text: t('testimonials.ro1'),
      product: t('testimonials.roPurifier'),
      category: "ro",
      verified: true,
    },
    {
      id: 8,
      rating: 5,
      text: t('testimonials.ro2'),
      product: t('testimonials.roPurifier'),
      category: "ro",
      verified: true,
    },
    {
      id: 9,
      rating: 5,
      text: t('testimonials.ro3'),
      product: t('testimonials.roPurifier'),
      category: "ro",
      verified: true,
    },
    {
      id: 10,
      rating: 5,
      text: t('testimonials.ro4'),
      product: t('testimonials.roPurifier'),
      category: "ro",
      verified: true,
    },
    {
      id: 11,
      rating: 5,
      text: t('testimonials.ro5'),
      product: t('testimonials.roPurifier'),
      category: "ro",
      verified: true,
    },
    {
      id: 12,
      rating: 4,
      text: t('testimonials.ro6'),
      product: t('testimonials.roPurifier'),
      category: "ro",
      verified: true,
    },
  ];

  // Double the array for seamless infinite scroll on both mobile and desktop
  const doubledTestimonials = [...testimonials, ...testimonials];

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  const getProductIcon = (category) => {
    if (category === "agriculture") {
      return <Sprout className="w-3 h-3" />;
    }
    return <Droplets className="w-3 h-3" />;
  };

  const getProductColor = (category) => {
    if (category === "agriculture") {
      return "from-green-500 to-emerald-500";
    }
    return "from-cyan-500 to-blue-500";
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`pt-4 pb-20 sm:pb-28 lg:pb-36 transition-colors duration-300 relative overflow-hidden ${
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
          className="particle hidden sm:block"
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
            <span className="text-secondary-500 font-poppins text-sm font-medium">{t('testimonials.realStories')}</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-1px] sm:tracking-[-2px] text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            {t('testimonials.title')} <span className="text-secondary-500">{t('testimonials.titleEnd')}</span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Category Badges */}
        <div className={`flex justify-center gap-3 mb-10 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <Sprout className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">{t('testimonials.agriculture')}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Droplets className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">{t('testimonials.ro')}</span>
          </div>
        </div>

        {/* Infinite Scrolling Testimonials Carousel */}
        <div className={`relative overflow-hidden fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-dark-surface to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-dark-surface to-transparent z-20 pointer-events-none"></div>
          
          {/* Scrolling Container */}
          <div
            ref={scrollContainerRef}
            className="testimonial-scroll flex gap-4 sm:gap-6 py-4"
          >
            {doubledTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`testimonial-card flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] transition-all duration-300 hover:-translate-y-2 shimmer-card ${
                  isDark ? "bg-dark-card" : "bg-white"
                } shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl overflow-hidden rounded-2xl`}
              >
                {/* Top gradient bar based on category */}
                <div className={`h-1 bg-gradient-to-r ${getProductColor(testimonial.category)}`}></div>
                
                <div className="p-5 sm:p-6">
                  {/* Category Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    {testimonial.category === "agriculture" ? (
                      <Tractor className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                    ) : (
                      <Droplets className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-500" />
                    )}
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Product Tag with Icon */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs px-2 py-1 rounded-full ${
                      testimonial.category === "agriculture" 
                        ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                        : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                    }`}>
                      {getProductIcon(testimonial.category)}
                      {testimonial.product}
                    </span>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${getProductColor(testimonial.category)} flex items-center justify-center`}>
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="text-[10px] sm:text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        {t('testimonials.verifiedCustomer')}
                      </div>
                    </div>
                    {testimonial.verified && (
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className={`text-center mt-12 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
          <div className={`inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full ${
            isDark ? "bg-dark-card" : "bg-white"
          } shadow-md border border-gray-200 dark:border-gray-800`}>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-text-light-primary dark:text-text-dark-primary font-medium">
              {t('testimonials.rating')}
            </span>
            <span className="text-[10px] sm:text-xs text-text-light-secondary dark:text-text-dark-secondary">
              {t('testimonials.basedOn')}
            </span>
            <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sprout className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-green-500" />
              <span className="text-[10px] sm:text-xs text-text-light-secondary dark:text-text-dark-secondary">
                {t('testimonials.farmers')}
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Droplets className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-500" />
              <span className="text-[10px] sm:text-xs text-text-light-secondary dark:text-text-dark-secondary">
                {t('testimonials.homes')}
              </span>
            </div>
          </div>
        </div>
      </div>

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
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-90vh) translateX(20px) scale(0.7);
            opacity: 0;
          }
        }

        /* Infinite Scroll Animation - Works on ALL devices (mobile + desktop) */
        .testimonial-scroll {
          display: flex;
          gap: 1rem;
          animation: scrollLeft 35s linear infinite;
          width: fit-content;
        }

        /* Pause animation on hover for all devices */
        .testimonial-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Mobile specific adjustments */
        @media (max-width: 640px) {
          .testimonial-scroll {
            gap: 0.75rem;
            animation-duration: 25s;
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

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .line-clamp-4 {
            -webkit-line-clamp: 3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle, .cursor-glow, .shimmer-card::after { display: none; }
          .fade-up.visible { animation: none; opacity: 1; transform: none; }
          .testimonial-scroll { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}