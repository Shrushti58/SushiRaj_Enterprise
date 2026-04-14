import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
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
  CheckCircle2,
  Play,
  Pause,
  Waves,
  Recycle
} from "lucide-react";

export default function EducationalInfo() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);
  const [imgError, setImgError] = useState({});
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const animationIntervalRef = useRef(null);

  // Images directly from public/agri/ folder
  const animationSteps = [
    { 
      title: t('howItWorks.animation.problemTitle'),
      description: t('howItWorks.animation.problemDesc'),
      image: "/agri/clogged-dripper.png",
      type: "problem"
    },
    { 
      title: t('howItWorks.animation.installationTitle'),
      description: t('howItWorks.animation.installationDesc'),
      image: "/agri/ubcal-installation.png",
      type: "solution"
    },
    { 
      title: t('howItWorks.animation.wavesTitle'),
      description: t('howItWorks.animation.wavesDesc'),
      image: "/agri/waves-effect.jpg",
      type: "animation"
    },
    { 
      title: t('howItWorks.animation.cleanTitle'),
      description: t('howItWorks.animation.cleanDesc'),
      image: "/agri/clean-drip.jpg",
      type: "result"
    },
    { 
      title: t('howItWorks.animation.cropTitle'),
      description: t('howItWorks.animation.cropDesc'),
      image: "/agri/healthy-crop.jpg",
      type: "result"
    }
  ];

  // Auto-play animation
  useEffect(() => {
    if (isAnimating && activeTab === "solution") {
      animationIntervalRef.current = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % animationSteps.length);
      }, 4000);
    } else {
      clearInterval(animationIntervalRef.current);
    }
    return () => clearInterval(animationIntervalRef.current);
  }, [isAnimating, activeTab, t]);

  // Reset animation when tab changes
  useEffect(() => {
    setAnimationStep(0);
    setIsAnimating(true);
  }, [activeTab]);

  // Cursor light-spot effect (disabled on mobile)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

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
    const section = document.getElementById("how-it-works");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: "problem", name: t('howItWorks.tabs.problem'), icon: AlertCircle, color: "from-amber-500 to-orange-500" },
    { id: "science", name: t('howItWorks.tabs.science'), icon: TrendingUp, color: "from-secondary-500 to-teal-500" },
    { id: "solution", name: t('howItWorks.tabs.solution'), icon: Sparkles, color: "from-secondary-500 to-emerald-500" },
    { id: "benefits", name: t('howItWorks.tabs.benefits'), icon: Heart, color: "from-rose-500 to-pink-500" },
  ];

  const benefits = [
    { icon: Leaf, key: "noSalt", color: "from-green-500 to-emerald-500" },
    { icon: Wrench, key: "noMaintenance", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, key: "lowElectricity", color: "from-yellow-500 to-amber-500" },
    { icon: Shield, key: "keepsMinerals", color: "from-purple-500 to-indigo-500" },
    { icon: Clock, key: "longLasting", color: "from-orange-500 to-red-500" },
    { icon: Droplets, key: "noWaste", color: "from-cyan-500 to-blue-500" },
  ];

  const agricultureBenefits = [
    { value: "30%", label: t('agriculture.higherYield'), icon: Leaf },
    { value: "40%", label: t('agriculture.lessWater'), icon: Droplets },
    { value: "50%", label: t('agriculture.lessMaintenance'), icon: Wrench },
    { value: "25%", label: t('agriculture.electricitySaved'), icon: Zap },
  ];

  const handleImageError = (stepIndex) => {
    setImgError(prev => ({ ...prev, [stepIndex]: true }));
  };

  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 6,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.05 + Math.random() * 0.1,
  }));

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`pt-4 pb-20 sm:pb-28 lg:pb-36 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-surface" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Background Effects */}
      <div ref={cursorGlowRef} className="cursor-glow hidden md:block" style={{ opacity: 0 }} />
      <div className={`bg-grid-dots ${isDark ? 'bg-grid-dark' : 'bg-grid-light'}`} />
      <div className={`bg-vignette ${isDark ? 'vignette-dark' : 'vignette-light'}`} />

      {particles.map((p) => (
        <span key={p.id} className="particle hidden sm:block" style={{ width: p.size, height: p.size, left: `${p.left}%`, opacity: p.opacity, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span className="text-secondary-500 font-poppins text-sm font-medium">{t('howItWorks.agricultureSolution')}</span>
          </div>
          <h2 className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-1px] sm:tracking-[-2px] text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}>
            UB'CAL for <span className="text-secondary-500">{t('howItWorks.agriculture')}</span>
          </h2>
          <p className={`font-poppins text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}>
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Agriculture Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 fade-up ${visible ? "visible" : ""}`}>
          {agricultureBenefits.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`text-center p-3 sm:p-4 rounded-xl ${isDark ? "bg-dark-card/50" : "bg-white/50"} backdrop-blur-sm border border-secondary-500/10`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-500 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-500">{stat.value}</div>
                <div className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className={`flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 fade-up ${visible ? "visible" : ""}`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  isActive
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : isDark
                      ? "bg-dark-card text-text-dark-secondary hover:bg-secondary-500/20"
                      : "bg-white text-text-light-secondary hover:bg-secondary-500/10 shadow-sm"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          
          {/* THE PROBLEM Tab */}
          {activeTab === "problem" && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-500">
                    <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                    {t('howItWorks.problem.title')}
                  </h3>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mt-1">
                    {t('howItWorks.problem.subtitle')}
                  </p>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-5">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-950/20 dark:to-amber-950/20 p-5 border border-red-200 dark:border-red-800">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <span className="text-red-500 text-lg font-bold">!</span>
                        </div>
                        <span className="text-red-600 dark:text-red-400 font-semibold text-sm">{t('howItWorks.problem.criticalIssue')}</span>
                      </div>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed text-sm sm:text-base">
                        <strong className="text-amber-600 dark:text-amber-400">{t('howItWorks.problem.theProblem')}:</strong> {t('howItWorks.problem.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-light-primary dark:text-text-dark-primary flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                      {t('howItWorks.problem.commonIssues')}
                    </h4>
                    {[
                      { text: t('howItWorks.problem.scale'), icon: Droplets, color: "text-red-500" },
                      { text: t('howItWorks.problem.salinity'), icon: AlertCircle, color: "text-amber-500" },
                      { text: t('howItWorks.problem.cropDamage'), icon: Leaf, color: "text-orange-500" },
                      { text: t('howItWorks.problem.yieldLoss'), icon: TrendingUp, color: "text-red-500" },
                      { text: t('howItWorks.problem.electricity'), icon: Zap, color: "text-amber-500" }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="group flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-dark-card/50 hover:bg-red-50 dark:hover:bg-red-950/10 transition-all duration-300 hover:translate-x-1 cursor-pointer border border-transparent hover:border-red-200 dark:hover:border-red-800"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="relative flex-shrink-0 mt-0.5">
                          <div className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                          </div>
                        </div>
                        <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary group-hover:text-text-light-primary dark:group-hover:text-text-dark-primary transition-colors duration-300">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-text-light-primary dark:text-text-dark-primary flex items-center gap-2">
                    <span className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                    {t('howItWorks.problem.seeDamage')}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "/agri/clogged-dripper.png", label: t('howItWorks.problem.cloggedDripper'), key: "prob1", icon: Droplets, desc: t('howItWorks.problem.cloggedDesc') },
                      { src: "/agri/white-soil.jpg", label: t('howItWorks.problem.whiteCrust'), key: "prob2", icon: AlertCircle, desc: t('howItWorks.problem.crustDesc') },
                      { src: "/agri/damaged-crop.jpg", label: t('howItWorks.problem.damagedCrop'), key: "prob3", icon: Leaf, desc: t('howItWorks.problem.cropDesc') },
                      { src: "/agri/scale-pipe.jpg", label: t('howItWorks.problem.scalePipe'), key: "prob4", icon: AlertCircle, desc: t('howItWorks.problem.pipeDesc') }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          {!imgError[item.key] ? (
                            <img
                              src={item.src}
                              alt={item.label}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={() => handleImageError(item.key)}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <item.icon className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-xs text-center">{item.desc}</p>
                          </div>
                        </div>
                        <div className={`p-2 text-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-amber-50 group-hover:to-orange-50 dark:group-hover:from-amber-950/20 dark:group-hover:to-orange-950/20 ${isDark ? "bg-dark-card" : "bg-white"}`}>
                          <p className="text-xs font-semibold text-text-light-primary dark:text-text-dark-primary group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-5 shadow-xl">
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                      <span className="text-white text-xl font-bold">₹</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs">{t('howItWorks.problem.financialImpact')}</p>
                      <p className="text-white font-bold text-sm sm:text-base">
                        {t('howItWorks.problem.impactText')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">30%</span>
                    </div>
                    <div className="text-white/80 text-xs">
                      <p>{t('howItWorks.problem.average')}</p>
                      <p>{t('howItWorks.problem.yieldLossShort')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* THE SCIENCE Tab */}
          {activeTab === "science" && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-teal-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-teal-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-500">
                    <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary-600 to-teal-600 dark:from-secondary-400 dark:to-teal-400 bg-clip-text text-transparent">
                    {t('howItWorks.science.title')}
                  </h3>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mt-1">
                    {t('howItWorks.science.subtitle')}
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex flex-col h-full">
                  <div className={`flex-1 p-5 sm:p-6 rounded-2xl ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg hover:shadow-xl transition-all duration-500 border border-secondary-500/10 hover:border-secondary-500/30 flex flex-col`}>
                    {/* Easy to Understand Section */}
                    <div className="relative overflow-hidden rounded-xl bg-secondary-50 dark:bg-secondary-950/20 p-4 mb-5 border border-secondary-200 dark:border-secondary-800">
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center">
                            <Zap className="w-3 h-3 text-secondary-500" />
                          </div>
                          <span className="text-gray-800 dark:text-gray-200 font-semibold text-xs">
                            {t('howItWorks.science.easyToUnderstand')}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
                          <strong className="text-secondary-600 dark:text-secondary-400">
                            {t('howItWorks.science.simpleScience')}:
                          </strong>{" "}
                          {t('howItWorks.science.simpleScienceText')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-500 to-teal-500 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-secondary-500 dark:text-secondary-400 text-base">{t('howItWorks.science.howItWorks')}</span>
                    </div>
                    <div className="space-y-3 flex-1">
                      {[
                        { step: 1, text: t('howItWorks.science.step1'), color: "from-cyan-500 to-blue-500" },
                        { step: 2, text: t('howItWorks.science.step2'), color: "from-secondary-500 to-teal-500" },
                        { step: 3, text: t('howItWorks.science.step3'), color: "from-emerald-500 to-green-500" },
                        { step: 4, text: t('howItWorks.science.step4'), color: "from-amber-500 to-orange-500" }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:translate-x-1 cursor-pointer"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className={`relative w-7 h-7 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                            <span className="text-white text-xs font-bold">{item.step}</span>
                          </div>
                          <span className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary group-hover:text-text-light-primary dark:group-hover:text-text-dark-primary transition-colors duration-300">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  <div className={`flex-1 p-5 sm:p-6 rounded-2xl ${isDark ? "bg-dark-card" : "bg-white"} shadow-lg border-l-4 border-secondary-500 hover:shadow-xl transition-all duration-500 flex flex-col`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-secondary-500" />
                      </div>
                      <h4 className="font-bold text-secondary-500 dark:text-secondary-400 text-base">
                        {t('howItWorks.science.whyChoose')}
                      </h4>
                    </div>
                    <div className="space-y-3 flex-1">
                      {[
                        { text: t('howItWorks.science.noChemicals'), iconColor: "text-green-500" },
                        { text: t('howItWorks.science.allPipes'), iconColor: "text-cyan-500" },
                        { text: t('howItWorks.science.lowPower'), iconColor: "text-yellow-500" },
                        { text: t('howItWorks.science.zeroMaintenance'), iconColor: "text-purple-500" },
                        { text: t('howItWorks.science.keepsMinerals'), iconColor: "text-secondary-500" }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-950/10 transition-all duration-300 hover:translate-x-1 cursor-pointer"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className="relative flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-secondary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle2 className={`w-3 h-3 ${item.iconColor}`} />
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary group-hover:text-text-light-primary dark:group-hover:text-text-dark-primary transition-colors duration-300">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-secondary-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary-500/15 flex items-center justify-center">
                          <Zap className="w-3 h-3 text-secondary-500" />
                        </div>
                        <p className="text-xs text-secondary-600 dark:text-secondary-400">
                          <span className="font-semibold">{t('howItWorks.science.didYouKnow')}</span> {t('howItWorks.science.powerFact')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* THE SOLUTION Tab */}
          {activeTab === "solution" && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-secondary-500 to-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                    {t('howItWorks.solution.title')}
                  </h3>
                </div>
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isAnimating 
                      ? "bg-secondary-500 text-white" 
                      : isDark ? "bg-dark-card text-text-dark-secondary" : "bg-gray-100 text-text-light-secondary"
                  }`}
                >
                  {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  {isAnimating ? t('howItWorks.solution.pause') : t('howItWorks.solution.playStory')}
                </button>
              </div>
              
              <div className={`p-4 sm:p-6 rounded-2xl ${isDark ? "bg-dark-card" : "bg-white"} shadow-xl border border-secondary-500/20`}>
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 min-h-[250px] sm:min-h-[350px]">
                    {!imgError[animationStep] ? (
                      <img
                        src={animationSteps[animationStep].image}
                        alt={animationSteps[animationStep].title}
                        className="w-full h-[250px] sm:h-[350px] object-cover transition-all duration-500"
                        onError={() => handleImageError(animationStep)}
                      />
                    ) : (
                      <div className="w-full h-[250px] sm:h-[350px] flex flex-col items-center justify-center">
                        {animationStep === 0 && <AlertCircle className="w-12 h-12 text-amber-500" />}
                        {animationStep === 1 && <Zap className="w-12 h-12 text-secondary-500" />}
                        {animationStep === 2 && <TrendingUp className="w-12 h-12 text-secondary-500" />}
                        {animationStep === 3 && <Droplets className="w-12 h-12 text-secondary-500" />}
                        {animationStep === 4 && <Leaf className="w-12 h-12 text-green-500" />}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Image: {animationSteps[animationStep].title}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Place image in: /public/agri/</p>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2 justify-center">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.6s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center gap-2">
                    {animationSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setAnimationStep(idx); setIsAnimating(false); }}
                        className={`transition-all duration-300 rounded-full ${
                          animationStep === idx
                            ? "w-8 h-2 bg-secondary-500"
                            : `w-2 h-2 ${isDark ? "bg-gray-600" : "bg-gray-300"} hover:bg-secondary-500/50`
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h4 className="text-lg sm:text-xl font-bold text-secondary-500 mb-1">
                      {animationSteps[animationStep].title}
                    </h4>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {animationSteps[animationStep].description}
                    </p>
                  </div>
                  
                  <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary-500 to-emerald-500 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${((animationStep + 1) / animationSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mt-4">
                <div className={`p-5 sm:p-6 rounded-xl ${isDark ? "bg-secondary-500/5" : "bg-secondary-50"}`}>
                  <h4 className="font-bold text-secondary-500 dark:text-secondary-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    {t('howItWorks.solution.simpleInstallation')}:
                  </h4>
                  <div className="space-y-3">
                    {[
                      t('howItWorks.solution.step1'),
                      t('howItWorks.solution.step2'),
                      t('howItWorks.solution.step3'),
                      t('howItWorks.solution.step4')
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center text-secondary-500 text-xs font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`p-5 sm:p-6 rounded-xl border-l-4 border-green-500 ${isDark ? "bg-green-900/10" : "bg-green-50"}`}>
                  <h4 className="font-bold text-green-600 dark:text-green-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    {t('howItWorks.solution.resultsTitle')}:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      t('howItWorks.solution.result1'),
                      t('howItWorks.solution.result2'),
                      t('howItWorks.solution.result3'),
                      t('howItWorks.solution.result4')
                    ].map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* BENEFITS Tab */}
          {activeTab === "benefits" && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  {t('howItWorks.benefits.title')}
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredBenefit(index)}
                      onMouseLeave={() => setHoveredBenefit(null)}
                      className={`p-4 sm:p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                        isDark ? "bg-dark-card" : "bg-white"
                      } shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg`}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-text-light-primary dark:text-text-dark-primary text-sm sm:text-base mb-1">
                        {t(`benefits.${benefit.key}`)}
                      </h4>
                      <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {t(`benefits.${benefit.key}Desc`)}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className={`mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl text-center ${isDark ? "bg-secondary-500/10" : "bg-secondary-50"}`}>
                <p className="text-secondary-600 dark:text-secondary-400 text-xs sm:text-sm font-medium">
                  {t('howItWorks.benefits.guarantee')}
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
          background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 35px 35px;
        }
        .bg-grid-dark {
          background-image: linear-gradient(rgba(28,230,201,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(28,230,201,0.04) 1px, transparent 1px);
          background-size: 35px 35px;
        }

        @media (max-width: 640px) {
          .bg-grid-light, .bg-grid-dark {
            background-size: 20px 20px;
          }
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

        .fade-up {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}