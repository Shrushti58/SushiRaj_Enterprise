import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Droplets, Settings, Filter, Phone, ArrowRight,
  Shield, FileText, ChevronLeft, ChevronRight, Star,
  Zap, Clock, Sparkles, Gem, CheckCircle, Leaf, Heart, Wrench, AlertCircle, TrendingUp
} from "lucide-react";

export default function Products() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("waterConditioner");
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const isHoveredRef = useRef(false);
  const [imgError, setImgError] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState("problem");
  const sectionRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const autoPlayRef = useRef(null);

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
    const section = document.getElementById("products");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: "waterConditioner", name: "Water Conditioner", icon: Droplets, color: "from-teal-500 to-cyan-500" },
    { id: "tankHanger", name: "Tank Hanger", icon: Filter, color: "from-teal-500 to-cyan-500" },
    { id: "purifier", name: "Water Purifiers", icon: Settings, color: "from-teal-500 to-cyan-500" },
  ];

  const infoTabs = [
    { id: "problem", name: "The Problem", icon: AlertCircle },
    { id: "science", name: "The Science", icon: TrendingUp },
    { id: "solution", name: "The Solution", icon: Sparkles },
    { id: "benefits", name: "Benefits", icon: Heart },
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

  // Tank Hanger - Single image (no carousel)
  const tankHangerProducts = useMemo(() => [
    { id: 1, name: "UB'CAL Tank Hanger", capacity: "Standard", price: "32,000", tag: "Standard", image: "/products/tank-hanger/standard.jpeg" }
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
      setImageIndex(0);
      setImgError(false);
    }
  }, [activeCategory]);

  // Get image count based on category
  const imageCount = useMemo(() => {
    if (activeCategory === "waterConditioner") return waterConditionerImages.length;
    if (activeCategory === "tankHanger") return 1; // Single image for tank hanger
    return selectedItem?.images?.length ?? 0;
  }, [activeCategory, selectedItem?.id]);

  // Auto-play for water conditioner and purifiers (multiple images)
  useEffect(() => {
    clearInterval(autoPlayRef.current);
    if (imageCount <= 1) return;

    autoPlayRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        setImageIndex((prev) => (prev + 1) % imageCount);
      }
    }, 3000);

    return () => clearInterval(autoPlayRef.current);
  }, [imageCount, activeCategory]);

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
    setImageIndex(0);
    setImgError(false);
  };

  const currentCategory = categories.find(c => c.id === activeCategory);

  const getCurrentImage = () => {
    if (activeCategory === "waterConditioner") {
      return waterConditionerImages[imageIndex] ?? "/products/placeholder.jpg";
    }
    if (activeCategory === "tankHanger") {
      return tankHangerProducts[0]?.image ?? "/products/placeholder.jpg";
    }
    return selectedItem?.images?.[imageIndex] ?? "/products/placeholder.jpg";
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 10,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 10,
    duration: 5 + Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <section
      id="products"
      ref={sectionRef}
      className={`py-20 sm:py-28 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-bg" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div ref={cursorGlowRef} className="cursor-glow" style={{ opacity: 0 }} />
      <div className={`bg-grid-dots ${isDark ? 'bg-grid-dark' : 'bg-grid-light'}`} />
      <div className={`bg-vignette ${isDark ? 'vignette-dark' : 'vignette-light'}`} />

      {particles.map((p) => (
        <span key={p.id} className="particle" style={{ width: p.size, height: p.size, left: `${p.left}%`, opacity: p.opacity, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <Sparkles className="w-4 h-4 text-secondary-500" />
            <span className="text-secondary-500 font-poppins text-sm font-medium">Premium Quality Since 2020</span>
          </div>
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl text-text-light-primary dark:text-text-dark-primary mb-4 fade-up ${visible ? "visible" : ""}`}>
            UB'CAL <span className="text-secondary-500">Water Conditioner</span>
          </h1>
          <p className={`font-poppins text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto fade-up ${visible ? "visible" : ""}`}>
            Electronic Water Conditioning Technology • No Salt • No Chemicals • No Maintenance
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 fade-up ${visible ? "visible" : ""}`}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-poppins font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-md scale-105`
                    : isDark
                      ? "bg-dark-card text-text-dark-secondary hover:bg-secondary-500/20"
                      : "bg-white text-text-light-secondary hover:bg-secondary-500/10 shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Main Product Display */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-12 fade-up ${visible ? "visible" : ""}`}>

          {/* Left Side - Image Carousel */}
          <div className="relative group" onMouseEnter={() => { isHoveredRef.current = true; }} onMouseLeave={() => { isHoveredRef.current = false; }}>
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
              {imgError ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800">
                  <div className="w-16 h-16 rounded-full bg-secondary-500/20 flex items-center justify-center">
                    {activeCategory === "purifier" ? <Settings className="w-8 h-8 text-secondary-500" /> :
                     activeCategory === "tankHanger" ? <Filter className="w-8 h-8 text-secondary-500" /> :
                     <Droplets className="w-8 h-8 text-secondary-500" />}
                  </div>
                  <div className="text-center px-4">
                    <p className="font-semibold text-text-light-primary dark:text-text-dark-primary text-sm">
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
                />
              )}

              {/* Navigation Arrows - Only show for multiple images */}
              {imageCount > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Dots - Only show for multiple images */}
              {imageCount > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {[...Array(imageCount)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setImgError(false); setImageIndex(idx); }}
                      className={`transition-all duration-300 rounded-full ${
                        imageIndex === idx
                          ? "w-6 h-1.5 bg-white"
                          : "w-1.5 h-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Tag Badge */}
              {selectedItem?.tag && activeCategory !== "waterConditioner" && (
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-lg ${
                    selectedItem.tag === "Popular" ? "bg-amber-500" :
                    selectedItem.tag === "Best Value" ? "bg-emerald-500" :
                    selectedItem.tag === "Commercial" ? "bg-blue-500" :
                    selectedItem.tag === "Industrial" ? "bg-orange-500" :
                    selectedItem.tag === "Heavy Duty" ? "bg-red-500" :
                    selectedItem.tag === "Premium" ? "bg-purple-500" :
                    "bg-secondary-500"
                  } text-white`}>
                    {selectedItem.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Selector & Price */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                {activeCategory === "waterConditioner" ? "UB'CAL Electronic Water Conditioner" :
                 activeCategory === "tankHanger" ? "Tank Hanger Conditioner" :
                 "Water Purifiers"}
              </h2>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                {activeCategory === "waterConditioner" ? "Select your pipe size to see the price" :
                 activeCategory === "tankHanger" ? "Select your model" :
                 "Select your brand"}
              </p>
            </div>

            {/* Size/Model Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
                Select {activeCategory === "waterConditioner" ? "Pipe Size" : activeCategory === "tankHanger" ? "Model" : "Brand"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`px-4 py-3 rounded-xl text-center transition-all duration-300 ${
                      selectedItem?.id === item.id
                        ? `bg-gradient-to-r ${currentCategory?.color} text-white shadow-md scale-105`
                        : isDark
                          ? "bg-dark-card text-text-dark-secondary hover:bg-secondary-500/20 border border-gray-700"
                          : "bg-white text-text-light-secondary hover:bg-secondary-500/10 border border-gray-200"
                    }`}
                  >
                    {activeCategory === "waterConditioner" && (
                      <>
                        <div className="font-bold">{item.size}</div>
                        <div className="text-xs opacity-80">Model {item.model}</div>
                      </>
                    )}
                    {activeCategory === "tankHanger" && (
                      <>
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className="text-xs opacity-80">{item.capacity}</div>
                      </>
                    )}
                    {activeCategory === "purifier" && (
                      <>
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className="text-xs opacity-80">{item.model}</div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className={`rounded-2xl p-6 ${
              isDark ? "bg-dark-card" : "bg-white"
            } shadow-lg border border-secondary-500/20`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-text-light-secondary">Your Price</p>
                  <div className="text-4xl font-bold text-secondary-500">
                    {selectedItem?.price ? `₹${selectedItem.price}` : "Contact Us"}
                  </div>
                  {selectedItem?.price && <p className="text-xs text-text-light-muted mt-1">+ 18% GST</p>}
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center">
                  <Gem className="w-6 h-6 text-secondary-500" />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No Salt or Chemicals</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No Maintenance Required</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Easy Installation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Negligible Power Consumption</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${currentCategory?.color} text-white font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2`}
              >
                Get Quote <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:8888800773"
                className="flex-1 py-3 rounded-xl border border-secondary-500 text-secondary-500 font-semibold hover:bg-secondary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Educational Section - How It Works */}
        <div className={`mt-12 fade-up ${visible ? "visible" : ""}`}>
          <div className={`rounded-2xl p-6 ${
            isDark ? "bg-dark-card" : "bg-white"
          } shadow-md border border-secondary-500/20`}>

            {/* Info Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {infoTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeInfoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveInfoTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-secondary-500 text-white"
                        : isDark
                          ? "bg-dark-surface text-text-dark-secondary hover:bg-secondary-500/20"
                          : "bg-gray-100 text-text-light-secondary hover:bg-secondary-500/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* The Problem Tab */}
            {activeInfoTab === "problem" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-8 h-8 text-amber-500" />
                  <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Understanding Hard Water Problem</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      Rain water is naturally slightly acidic as it combines with carbon dioxide in the air to form carbonic acid:
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm text-center">
                      H₂O + CO₂ = H₂CO₃
                    </div>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      This slightly acidic water dissolves calcium and magnesium salts from rocks, creating hard water. When hard water is heated or evaporates, these salts precipitate as hard, white scale (limescale).
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">The Impact of Hard Water:</h4>
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
                    <strong>Scale Fact:</strong> Just 1/8 inch of scale reduces heating efficiency by 25%! At 80°C, water containing 145 ppm of calcite produces 29.9 kg of scale per year.
                  </p>
                </div>
              </div>
            )}

            {/* The Science Tab */}
            {activeInfoTab === "science" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-secondary-500" />
                  <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">The Science Behind UB'CAL</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      Research has shown that calcium and magnesium salts combine to form crystals that attach to surfaces as scale. Scientists discovered that rapidly changing electronic waveforms can neutralize these bonds.
                    </p>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      UB'CAL uses a series of controlled, complex modulating high-frequency waveforms that neutralize the bonding ability of minerals in water.
                    </p>
                  </div>
                  <div className="bg-secondary-500/10 p-4 rounded-xl">
                    <h4 className="font-semibold text-secondary-500 mb-2">Key Scientific Principles:</h4>
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
            {activeInfoTab === "solution" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-secondary-500" />
                  <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">The UB'CAL Solution</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4">
                      Two coiled antennas wrap around the water pipe, broadcasting a controlled complex modulated signal field into the water. As water passes through this field, it changes the behavior of mineral particles.
                    </p>
                    <div className="bg-secondary-500/10 p-4 rounded-xl">
                      <h4 className="font-semibold text-secondary-500 mb-2">How It Works:</h4>
                      <ul className="space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        <li className="flex items-start gap-2">1️⃣ Antennas wrap around existing pipe</li>
                        <li className="flex items-start gap-2">2️⃣ Signal field agitates mineral molecules</li>
                        <li className="flex items-start gap-2">3️⃣ Large crystals break into tiny particles</li>
                        <li className="flex items-start gap-2">4️⃣ Existing scale breaks down over time</li>
                        <li className="flex items-start gap-2">5️⃣ Water becomes scale-free and non-corrosive</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">The Result:</h4>
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
            {activeInfoTab === "benefits" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-secondary-500" />
                  <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Key Benefits of UB'CAL</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <Leaf className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">No Salt or Chemicals</h4>
                      <p className="text-xs text-text-light-secondary">Environmentally friendly solution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <Wrench className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">No Maintenance</h4>
                      <p className="text-xs text-text-light-secondary">Set it and forget it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <Zap className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Negligible Power Consumption</h4>
                      <p className="text-xs text-text-light-secondary">Low running cost</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Retains Healthy Minerals</h4>
                      <p className="text-xs text-text-light-secondary">Only changes crystal structure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <Clock className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Long-lasting Effect</h4>
                      <p className="text-xs text-text-light-secondary">Existing scale removed over time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <Droplets className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">No Waste Water</h4>
                      <p className="text-xs text-text-light-secondary">100% water-efficient</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-secondary-500/10 rounded-xl text-center">
                  <p className="text-secondary-600 dark:text-secondary-400 font-medium">
                    💯 Money Back Guarantee • Easy to Install • Works on PVC, HDPE, Copper & Steel Pipes
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cursor-glow { position: absolute; width: 400px; height: 400px; border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 1; background: radial-gradient(circle, rgba(26,188,156,0.08) 0%, transparent 70%); transition: opacity 0.3s ease; }
        .bg-grid-dots { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .bg-grid-light { background-image: linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px); background-size: 35px 35px; }
        .bg-grid-dark { background-image: linear-gradient(rgba(28,230,201,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(28,230,201,0.06) 1px, transparent 1px); background-size: 35px 35px; }
        .bg-vignette { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .vignette-light { background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(249,250,251,0.9) 100%); }
        .vignette-dark { background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(12,20,34,0.95) 100%); }
        .particle { position: absolute; bottom: -20px; border-radius: 50%; background: linear-gradient(135deg, rgba(26,188,156,0.4), rgba(26,188,156,0.2)); animation: floatUp linear infinite; pointer-events: none; z-index: 0; }
        .dark .particle { background: linear-gradient(135deg, rgba(28,230,201,0.3), rgba(28,230,201,0.1)); }
        @keyframes floatUp { 0% { transform: translateY(0) translateX(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-90vh) translateX(20px); opacity: 0; } }
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .aspect-square { aspect-ratio: 1 / 1; }
      `}</style>
    </section>
  );
}