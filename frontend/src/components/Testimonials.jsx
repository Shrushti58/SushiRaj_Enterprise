import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Star, Quote, User, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

    const section = document.getElementById("testimonials");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Patil",
      location: "Kolhapur",
      rating: 5,
      text: "The water quality has improved dramatically after installing the water conditioner. No more white scales on utensils. The technician came on time and explained everything clearly.",
      date: "2 weeks ago",
      product: "Water Conditioner",
      verified: true,
    },
    {
      id: 2,
      name: "Sneha Deshmukh",
      location: "Sangli",
      rating: 5,
      text: "Best decision for our home. The RO water tastes pure and clean. My kids now drink more water without any hesitation. Customer support is very responsive.",
      date: "1 month ago",
      product: "RO Purifier Basic",
      verified: true,
    },
    {
      id: 3,
      name: "Vikram Jadhav",
      location: "Satara",
      rating: 4,
      text: "Good product at reasonable price. Installation was quick and professional. The 5 year warranty gives peace of mind. Would recommend to family and friends.",
      date: "3 weeks ago",
      product: "Water Conditioner",
      verified: true,
    },
    {
      id: 4,
      name: "Priya Kulkarni",
      location: "Pune",
      rating: 5,
      text: "Very happy with the AMC service. They come on time every quarter for maintenance. The filter replacement is done properly. Water tastes great.",
      date: "2 months ago",
      product: "AMC Service",
      verified: true,
    },
    {
      id: 5,
      name: "Mahesh Shinde",
      location: "Miraj",
      rating: 5,
      text: "Finally found a solution for our hard water problem. The conditioner works like magic. No more dry skin and hair fall issues. Worth every rupee.",
      date: "1 week ago",
      product: "Water Conditioner",
      verified: true,
    },
    {
      id: 6,
      name: "Anita Gaikwad",
      location: "Karad",
      rating: 5,
      text: "Professional team and quality product. They called me after installation to check if everything was working fine. Rare to see such service these days.",
      date: "3 months ago",
      product: "RO Plant",
      verified: true,
    },
    {
      id: 7,
      name: "Suresh Nalawade",
      location: "Ichalkaranji",
      rating: 5,
      text: "Installation was super fast. The team was very professional. Water taste is excellent now. Highly recommended!",
      date: "1 month ago",
      product: "RO Purifier",
      verified: true,
    },
    {
      id: 8,
      name: "Kavita More",
      location: "Mumbai",
      rating: 4,
      text: "Good service and support. The AMC plan is affordable and worth it. They respond quickly to any issues.",
      date: "2 months ago",
      product: "AMC Service",
      verified: true,
    },
  ];

  // Double the array for seamless infinite scroll
  const doubledTestimonials = [...testimonials, ...testimonials];

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
      id="testimonials"
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
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span className="text-secondary-500 font-poppins text-sm font-medium">Real Stories</span>
          </div>

          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-1px] sm:tracking-[-2px] text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            What Our <span className="text-secondary-500">Customers Say</span>
          </h2>

          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            Join 5000+ happy families who trust Sushiraj Enterprise
          </p>
        </div>

        {/* Infinite Scrolling Testimonials Carousel */}
        <div className={`relative overflow-hidden fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-dark-surface to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-dark-surface to-transparent z-20 pointer-events-none"></div>
          
          {/* Scrolling Container */}
          <div
            ref={scrollContainerRef}
            className="testimonial-scroll flex gap-6 py-4"
          >
            {doubledTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`testimonial-card flex-shrink-0 w-[350px] md:w-[400px] transition-all duration-300 hover:-translate-y-2 shimmer-card ${
                  isDark ? "bg-dark-card" : "bg-white"
                } shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl overflow-hidden rounded-2xl`}
              >
                {/* Top gradient bar */}
                <div className="h-1 bg-gradient-to-r from-secondary-500 to-secondary-400"></div>
                
                <div className="p-6">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-12 h-12 text-secondary-500" />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4 text-sm line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Product Tag */}
                  <div className="mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary-500/10 text-secondary-500">
                      {testimonial.product}
                    </span>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-poppins font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                        {testimonial.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        <span>{testimonial.location}</span>
                        <span>•</span>
                        <span>{testimonial.date}</span>
                      </div>
                    </div>
                    {testimonial.verified && (
                      <div className="ml-auto">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className={`text-center mt-12 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
          <div className={`inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-full ${
            isDark ? "bg-dark-card" : "bg-white"
          } shadow-md border border-gray-200 dark:border-gray-800`}>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-text-light-primary dark:text-text-dark-primary font-medium">
              4.9 out of 5
            </span>
            <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
              Based on 500+ customer reviews
            </span>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
              ⭐ Rated Excellent
            </span>
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

        /* Infinite Scroll Animation */
        .testimonial-scroll {
          display: flex;
          gap: 1.5rem;
          animation: scrollLeft 30s linear infinite;
          width: fit-content;
        }

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

        @media (max-width: 768px) {
          .testimonial-card {
            width: 300px;
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