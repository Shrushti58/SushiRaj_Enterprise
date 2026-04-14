import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  AlertCircle,
  TrendingUp,
  Sparkles,
  Heart,
  Leaf,
  Shield,
  Clock,
  Droplets,
  Zap,
  Wrench,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function EducationalInfo() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    const section = document.getElementById("how-it-works");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: "problem", name: "The Problem", icon: AlertCircle, color: "text-amber-500" },
    { id: "science", name: "The Science", icon: TrendingUp, color: "text-secondary-500" },
    { id: "solution", name: "The Solution", icon: Sparkles, color: "text-secondary-500" },
    { id: "benefits", name: "Benefits", icon: Heart, color: "text-secondary-500" },
  ];

  const benefits = [
    { icon: Leaf, title: "No Salt or Chemicals", description: "Environmentally friendly solution" },
    { icon: Wrench, title: "No Maintenance", description: "Set it and forget it" },
    { icon: Zap, title: "Negligible Power Consumption", description: "Low running cost" },
    { icon: Shield, title: "Retains Healthy Minerals", description: "Only changes crystal structure" },
    { icon: Clock, title: "Long-lasting Effect", description: "Existing scale removed over time" },
    { icon: Droplets, title: "No Waste Water", description: "100% water-efficient" },
  ];

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 8,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.05 + Math.random() * 0.1,
  }));

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`py-12 sm:py-16 transition-colors duration-300 relative overflow-hidden ${
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
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary-500/3 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4 fade-up ${visible ? "visible" : ""}`}>
            <Sparkles className="w-3.5 h-3.5 text-secondary-500" />
            <span className="text-secondary-500 font-poppins text-xs font-medium">Learn More</span>
          </div>
          <h2
            className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-text-light-primary dark:text-text-dark-primary mb-3 fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            How UB'CAL <span className="text-secondary-500">Works</span>
          </h2>
          <p
            className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            Understanding the science behind electronic water conditioning
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-secondary-500 text-white shadow-md"
                    : isDark
                      ? "bg-dark-card text-text-dark-secondary hover:bg-secondary-500/20"
                      : "bg-white text-text-light-secondary hover:bg-secondary-500/10 shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className={`fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
          
          {/* The Problem Tab */}
          {activeTab === "problem" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  Understanding Hard Water Problem
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    Rain water is naturally slightly acidic as it combines with carbon dioxide in the air to form carbonic acid:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl font-mono text-center">
                    <span className="text-lg font-semibold">H₂O + CO₂ = H₂CO₃</span>
                  </div>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    This slightly acidic water dissolves calcium and magnesium salts from rocks, creating hard water. 
                    When hard water is heated or evaporates, these salts precipitate as hard, white scale (limescale).
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    The Impact of Hard Water
                  </h4>
                  <ul className="space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    <li className="flex items-center gap-2">• Clogs pipes and reduces water flow</li>
                    <li className="flex items-center gap-2">• Damages geysers, solar heaters & boilers</li>
                    <li className="flex items-center gap-2">• Reduces soap lather and leaves residue</li>
                    <li className="flex items-center gap-2">• Leaves white marks on taps, sinks & tiles</li>
                    <li className="flex items-center gap-2">• Increases energy consumption by up to 25%</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Scale Fact:</strong> Just 1/8 inch of scale reduces heating efficiency by 25%! 
                  At 80°C, water containing 145 ppm of calcite produces 29.9 kg of scale per year.
                </p>
              </div>
            </div>
          )}

          {/* The Science Tab */}
          {activeTab === "science" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-500" />
                </div>
                <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  The Science Behind UB'CAL
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    Research has shown that calcium and magnesium salts combine to form crystals that attach to surfaces as scale. 
                    Scientists discovered that rapidly changing electronic waveforms can neutralize these bonds.
                  </p>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    UB'CAL uses a series of controlled, complex modulating high-frequency waveforms that neutralize the bonding ability 
                    of minerals in water.
                  </p>
                </div>
                <div className="bg-secondary-500/10 p-5 rounded-xl">
                  <h4 className="font-bold text-secondary-500 mb-3">Key Scientific Principles:</h4>
                  <ul className="space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    <li className="flex items-start gap-2">• Different waveforms for different minerals</li>
                    <li className="flex items-start gap-2">• Precise frequency generation with controlled speed</li>
                    <li className="flex items-start gap-2">• Breaks bonds between molecules and water</li>
                    <li className="flex items-start gap-2">• Reduces large crystals to tiny particles</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* The Solution Tab */}
          {activeTab === "solution" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary-500" />
                </div>
                <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  The UB'CAL Solution
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4">
                    Two coiled antennas wrap around the water pipe, broadcasting a controlled complex modulated signal field into the water. 
                    As water passes through this field, it changes the behavior of mineral particles.
                  </p>
                  <div className="bg-secondary-500/10 p-5 rounded-xl">
                    <h4 className="font-bold text-secondary-500 mb-3">How It Works:</h4>
                    <ul className="space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      <li className="flex items-start gap-2">1️⃣ Antennas wrap around existing pipe</li>
                      <li className="flex items-start gap-2">2️⃣ Signal field agitates mineral molecules</li>
                      <li className="flex items-start gap-2">3️⃣ Large crystals break into tiny particles</li>
                      <li className="flex items-start gap-2">4️⃣ Existing scale breaks down over time</li>
                      <li className="flex items-start gap-2">5️⃣ Water becomes scale-free and non-corrosive</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-green-600 dark:text-green-400 mb-3">The Result:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">✓ Better tasting, non-corrosive water</li>
                    <li className="flex items-center gap-2">✓ Healthy plants grow well</li>
                    <li className="flex items-center gap-2">✓ No scale formation on surfaces</li>
                    <li className="flex items-center gap-2">✓ Existing scale gradually removed</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary-500" />
                </div>
                <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  Key Benefits of UB'CAL
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                        isDark ? "bg-dark-card" : "bg-white"
                      } shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-4 bg-secondary-500/10 rounded-xl text-center">
                <p className="text-secondary-600 dark:text-secondary-400 text-sm font-medium">
                  Money Back Guarantee • Easy to Install • Works on PVC, HDPE, Copper & Steel Pipes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .cursor-glow {
          position: absolute;
          width: 350px;
          height: 350px;
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
          background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 35px 35px;
        }
        .bg-grid-dark {
          background-image: linear-gradient(rgba(28,230,201,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(28,230,201,0.05) 1px, transparent 1px);
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
          background: linear-gradient(135deg, rgba(28,230,201,0.15), rgba(28,230,201,0.05));
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