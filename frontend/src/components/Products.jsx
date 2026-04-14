import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Droplets, Settings, Filter, Phone, ArrowRight,
  Shield, FileText, ChevronLeft, ChevronRight, Star,
  Zap, Clock, Sparkles, Gem, CheckCircle, Leaf, Heart, Wrench, AlertCircle, TrendingUp, Ruler, Weight, Package, Award
} from "lucide-react";

export default function Products() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("waterConditioner");
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Cursor light-spot effect (disabled on mobile for better performance)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Check if device is mobile
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
      { threshold: 0.1 } // Lower threshold for mobile
    );
    const section = document.getElementById("products");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: "waterConditioner", name: "Water Conditioner", icon: Droplets, color: "from-teal-500 to-cyan-500" },
    { id: "tankHanger", name: "Tank Hanger", icon: Filter, color: "from-emerald-500 to-teal-500" },
    { id: "purifier", name: "Water Purifiers", icon: Settings, color: "from-purple-500 to-indigo-500" },
  ];

  // Common carousel images for Water Conditioner
  const waterConditionerImages = [
    "/products/water-conditioner/UB1.png",
    "/products/water-conditioner/P1.jpg",
    "/products/water-conditioner/UB2.jpg",
    "/products/water-conditioner/P2.jpg",
    "/products/water-conditioner/UB3.jpg",
    "/products/water-conditioner/P3.jpg",
    "/products/water-conditioner/UB4.jpg",
    "/products/water-conditioner/P4.jpg",
    "/products/water-conditioner/UB5.jpg",
    "/products/water-conditioner/P5.jpg",
    "/products/water-conditioner/UB6.jpg",
    "/products/water-conditioner/P6.jpg",
    "/products/water-conditioner/UB7.jpg",
    "/products/water-conditioner/P7.jpg",
    "/products/water-conditioner/UB8.jpg",
    "/products/water-conditioner/P9.jpg",
    "/products/water-conditioner/UB9.jpg",
  ];

  const waterConditioners = useMemo(() => [
    { id: 1, model: "5810", size: '1"', price: "27,800", tag: "Popular", flow: "500 LPH" },
    { id: 2, model: "5815", size: '1.1/4" - 1.1/2"', price: "33,500", tag: "Best Value", flow: "800 LPH" },
    { id: 3, model: "5820", size: '2"', price: "38,700", tag: "", flow: "1200 LPH" },
    { id: 4, model: "5825", size: '2.1/2"', price: "43,500", tag: "", flow: "1500 LPH" },
    { id: 5, model: "5830", size: '3"', price: "48,700", tag: "", flow: "2000 LPH" },
    { id: 6, model: "5840", size: '4"', price: "56,500", tag: "Commercial", flow: "3000 LPH" },
    { id: 7, model: "5850", size: '5"', price: "98,000", tag: "Industrial", flow: "5000 LPH" },
    { id: 8, model: "5860", size: '6"', price: "1,45,000", tag: "Heavy Duty", flow: "8000 LPH" },
  ], []);

  // Tank Hanger - Single product (simplified)
  const tankHangerProducts = useMemo(() => [
    { 
      id: 1, 
      name: "UB'CAL Tank Hanger", 
      price: "32,000", 
      tag: "Premium Quality", 
      image: "/products/tank-hanger/standard.jpeg",
      images: ["/products/tank-hanger/standard.jpeg"],
      features: [
        "Heavy duty stainless steel construction",
        "Corrosion & rust resistant",
        "Easy installation on any tank",
        "Secure grip & stable support",
        "Long lasting durability"
      ]
    }
  ], []);

  // Purifiers - Multiple images with carousel
  const purifierBrands = useMemo(() => [
    { id: 1, name: "Kent RO", model: "Grand Plus", price: "12,999", capacity: "12 LPH", type: "Domestic", rating: 4.5, images: ["/products/purifiers/kent.jpg", "/products/purifiers/kent-2.jpg"] },
    { id: 2, name: "Aquaguard", model: "Enhance", price: "14,500", capacity: "15 LPH", type: "Domestic", rating: 4.3, images: ["/products/purifiers/aquaguard.jpg", "/products/purifiers/aquaguard-2.jpg"] },
    { id: 3, name: "Pureit", model: "Ultima", price: "10,999", capacity: "10 LPH", type: "Domestic", rating: 4.2, images: ["/products/purifiers/pureit.png", "/products/purifiers/pureit-2.png"] },
    { id: 4, name: "Livpure", model: "Smart", price: "11,500", capacity: "12 LPH", type: "Domestic", rating: 4.4, images: ["/products/purifiers/livpure.jpg", "/products/purifiers/livpure-2.jpg"] },
    { id: 5, name: "Eureka Forbes", model: "Aquasure", price: "13,999", capacity: "14 LPH", type: "Domestic", rating: 4.6, images: ["/products/purifiers/eureka.jpg", "/products/purifiers/eureka-2.jpg"] },
    { id: 6, name: "Custom Order", model: "As per requirement", price: null, capacity: "Custom", type: "Commercial", rating: 5, images: ["/products/purifiers/custom.jpg", "/products/purifiers/custom-2.jpg"] },
  ], []);

  const getItems = useCallback(() => {
    if (activeCategory === "waterConditioner") return waterConditioners;
    if (activeCategory === "tankHanger") return tankHangerProducts;
    return purifierBrands;
  }, [activeCategory, waterConditioners, tankHangerProducts, purifierBrands]);

  const items = getItems();

  // Reset selected item when category changes
  useEffect(() => {
    if (items && items.length > 0) {
      setSelectedItem(items[0]);
      setImgError(false);
      if (activeCategory !== "waterConditioner") {
        setImageIndex(0);
      }
    }
  }, [activeCategory, items]);

  // Get image count based on category
  const imageCount = useMemo(() => {
    if (activeCategory === "waterConditioner") return waterConditionerImages.length;
    if (activeCategory === "tankHanger") return selectedItem?.images?.length ?? 1;
    return selectedItem?.images?.length ?? 0;
  }, [activeCategory, selectedItem?.id, selectedItem?.images]);

  // Auto-play for water conditioner and purifiers
  useEffect(() => {
    clearInterval(autoPlayRef.current);
    if (imageCount <= 1) return;

    autoPlayRef.current = setInterval(() => {
      if (!isHovered) {
        setImageIndex((prev) => (prev + 1) % imageCount);
      }
    }, 4000);

    return () => clearInterval(autoPlayRef.current);
  }, [imageCount, activeCategory, isHovered]);

  const nextImage = () => {
    if (imageCount <= 1) return;
    setImgError(false);
    setImageIndex((prev) => (prev + 1) % imageCount);
  };

  const prevImage = () => {
    if (imageCount <= 1) return;
    setImgError(false);
    setImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setImgError(false);
    if (activeCategory !== "waterConditioner") {
      setImageIndex(0);
    }
  };

  const currentCategory = categories.find(c => c.id === activeCategory);

  const getCurrentImage = () => {
    if (activeCategory === "waterConditioner") {
      return waterConditionerImages[imageIndex] ?? "/products/placeholder.jpg";
    }
    if (activeCategory === "tankHanger") {
      return selectedItem?.images?.[imageIndex] ?? selectedItem?.image ?? "/products/placeholder.jpg";
    }
    return selectedItem?.images?.[imageIndex] ?? "/products/placeholder.jpg";
  };

  // Reduce number of particles on mobile for better performance
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
      id="products"
      ref={sectionRef}
      className={`transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-bg" : "bg-gray-50"
      }`}
    >
      {/* Animated Background - Reduced opacity on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-secondary-500/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-secondary-500/5 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <div ref={cursorGlowRef} className="cursor-glow hidden md:block" style={{ opacity: 0 }} />
      <div className={`bg-grid-dots ${isDark ? 'bg-grid-dark' : 'bg-grid-light'}`} />
      <div className={`bg-vignette ${isDark ? 'vignette-dark' : 'vignette-light'}`} />

      {particles.map((p) => (
        <span key={p.id} className="particle hidden sm:block" style={{ width: p.size, height: p.size, left: `${p.left}%`, opacity: p.opacity, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">

        {/* Header - Mobile optimized */}
        <div className="text-center mb-8 sm:mb-10">
          <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-3 sm:mb-4 fade-up ${visible ? "visible" : ""}`}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-500" />
            <span className="text-secondary-500 font-poppins text-xs sm:text-sm font-medium">Premium Quality Since 2020</span>
          </div>
          <h1 className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-light-primary dark:text-text-dark-primary mb-2 sm:mb-3 fade-up ${visible ? "visible" : ""}`}>
            UB'CAL <span className="text-secondary-500">Water Conditioner</span>
          </h1>
          <p className={`font-poppins text-sm sm:text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto px-2 sm:px-0 fade-up ${visible ? "visible" : ""}`}>
            Electronic Water Conditioning Technology • No Salt • No Chemicals • No Maintenance
          </p>
        </div>

        {/* Category Tabs - Scrollable on mobile */}
        <div className={`flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 sm:pb-0 fade-up ${visible ? "visible" : ""}`}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-poppins font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  isActive
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-md`
                    : isDark
                      ? "bg-dark-card text-text-dark-secondary hover:bg-secondary-500/20"
                      : "bg-white text-text-light-secondary hover:bg-secondary-500/10 shadow-sm"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{cat.name}</span>
                <span className="xs:hidden">{cat.name === "Water Conditioner" ? "Conditioner" : cat.name === "Water Purifiers" ? "Purifiers" : cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Product Display - Stack on mobile */}
        <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 fade-up ${visible ? "visible" : ""}`}>

          {/* Left Side - Image Carousel */}
          <div 
            className="relative group" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square shadow-lg">
              {/* Animated Border Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${currentCategory?.color} rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}></div>
              
              {imgError ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800 z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary-500/20 flex items-center justify-center">
                    {activeCategory === "purifier" ? <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-500" /> :
                     activeCategory === "tankHanger" ? <Filter className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-500" /> :
                     <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-500" />}
                  </div>
                  <div className="text-center px-4">
                    <p className="font-semibold text-text-light-primary dark:text-text-dark-primary text-xs sm:text-sm">
                      {activeCategory === "purifier" ? selectedItem?.name :
                       activeCategory === "tankHanger" ? selectedItem?.name :
                       `Model ${selectedItem?.model}`}
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={getCurrentImage()}
                  alt={activeCategory === "purifier" ? `${selectedItem?.name} ${selectedItem?.model}` :
                       activeCategory === "tankHanger" ? selectedItem?.name :
                       `UB'CAL Model ${selectedItem?.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              )}

              {/* Navigation Arrows - Larger touch targets on mobile */}
              {imageCount > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary-500 active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary-500 active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}

              {/* Dots Indicator - Mobile optimized */}
              {imageCount > 1 && (
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                  {[...Array(Math.min(imageCount, 8))].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setImgError(false); setImageIndex(idx); }}
                      className={`transition-all duration-300 rounded-full ${
                        imageIndex === idx
                          ? "w-4 sm:w-6 h-1 sm:h-1.5 bg-white"
                          : "w-1.5 sm:w-1.5 h-1 sm:h-1.5 bg-white/50"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Tag Badge - Mobile optimized */}
              {selectedItem?.tag && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold shadow-lg ${
                    selectedItem.tag === "Popular" ? "bg-amber-500" :
                    selectedItem.tag === "Best Value" ? "bg-emerald-500" :
                    selectedItem.tag === "Commercial" ? "bg-blue-500" :
                    selectedItem.tag === "Industrial" ? "bg-orange-500" :
                    selectedItem.tag === "Heavy Duty" ? "bg-red-500" :
                    selectedItem.tag === "Premium Quality" ? "bg-purple-500" :
                    "bg-secondary-500"
                  } text-white`}>
                    {selectedItem.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Selector & Details */}
          <div className="space-y-4 sm:space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1 sm:mb-2">
                {activeCategory === "waterConditioner" ? "UB'CAL Electronic Water Conditioner" :
                 activeCategory === "tankHanger" ? "UB'CAL Tank Hanger" :
                 "Water Purifiers"}
              </h2>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs sm:text-sm">
                {activeCategory === "waterConditioner" ? "Select your pipe size to see the price" :
                 activeCategory === "tankHanger" ? "Premium quality tank mounting solution" :
                 "Select your brand"}
              </p>
            </div>

            {/* Size/Model Selector - Responsive grid */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
                Select {activeCategory === "waterConditioner" ? "Pipe Size" : activeCategory === "tankHanger" ? "Model" : "Brand"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setHoveredButton(item.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-center transition-all duration-300 ${
                      selectedItem?.id === item.id
                        ? `bg-gradient-to-r ${currentCategory?.color} text-white shadow-md`
                        : isDark
                          ? "bg-dark-card text-text-dark-secondary hover:bg-secondary-500/20 border border-gray-700"
                          : "bg-white text-text-light-secondary hover:bg-secondary-500/10 border border-gray-200"
                    } ${hoveredButton === item.id && selectedItem?.id !== item.id ? 'ring-2 ring-secondary-500/50' : ''}`}
                  >
                    {activeCategory === "waterConditioner" && (
                      <>
                        <div className="font-bold text-sm sm:text-base">{item.size}</div>
                        <div className="text-[10px] sm:text-xs opacity-80">Model {item.model}</div>
                      </>
                    )}
                    {activeCategory === "tankHanger" && (
                      <>
                        <div className="font-bold text-xs sm:text-sm">{item.name}</div>
                      </>
                    )}
                    {activeCategory === "purifier" && (
                      <>
                        <div className="font-bold text-xs sm:text-sm">{item.name}</div>
                        <div className="text-[10px] sm:text-xs opacity-80">{item.model}</div>
                        <div className="flex items-center justify-center gap-0.5 mt-1">
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-[10px] sm:text-xs">{item.rating}</span>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display - Mobile optimized */}
            <div className={`rounded-2xl p-4 sm:p-6 ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-lg border border-secondary-500/20`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-text-light-secondary">Your Price</p>
                  <div className="text-3xl sm:text-4xl font-bold text-secondary-500">
                    {selectedItem?.price ? `₹${selectedItem.price}` : "Contact Us"}
                  </div>
                  {selectedItem?.price && <p className="text-[10px] sm:text-xs text-text-light-muted mt-0.5 sm:mt-1">+ 18% GST</p>}
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary-500/20 flex items-center justify-center">
                  <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-500" />
                </div>
              </div>
            </div>

            {/* Tank Hanger Additional Details - Mobile optimized */}
            {activeCategory === "tankHanger" && selectedItem && (
              <div className={`rounded-2xl p-4 sm:p-5 ${
                isDark ? "bg-dark-card/80" : "bg-gray-50"
              } border border-secondary-500/10 space-y-3 sm:space-y-4`}>
                <h3 className="font-semibold text-sm sm:text-base text-text-light-primary dark:text-text-dark-primary flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                  {selectedItem.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-text-light-secondary dark:text-text-dark-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons - Stack on very small screens */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full xs:flex-1 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r ${currentCategory?.color} text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 active:scale-98`}
              >
                Get Quote
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <a
                href="tel:8888800773"
                className="w-full xs:flex-1 py-2.5 sm:py-3 rounded-xl border border-secondary-500 text-secondary-500 font-semibold text-xs sm:text-sm hover:bg-secondary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

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

        /* Mobile grid size adjustment */
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
        .aspect-square { aspect-ratio: 1 / 1; }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:flex-1 {
            flex: 1;
          }
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:hidden {
            display: none;
          }
          .xs\\:inline {
            display: inline;
          }
        }
        
        /* Active scale effect for touch devices */
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}