import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Droplets, Settings, Truck, Phone, ArrowRight, Star, Shield, Zap, TrendingUp, CheckCircle } from "lucide-react";

export default function Products() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

    const section = document.getElementById("products");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const waterConditioners = [
    { size: '1"', price: "27,800", model: "5810", flow: "Up to 500 LPH", tag: "Popular", bg: "from-blue-500 to-cyan-500" },
    { size: '1.1/4" - 1.1/2"', price: "33,500", model: "5815", flow: "Up to 800 LPH", tag: "Best Value", bg: "from-emerald-500 to-teal-500" },
    { size: '2"', price: "38,700", model: "5820", flow: "Up to 1200 LPH", tag: "", bg: "from-amber-500 to-orange-500" },
    { size: '2.1/2"', price: "43,500", model: "5825", flow: "Up to 1500 LPH", tag: "", bg: "from-rose-500 to-pink-500" },
    { size: '3"', price: "48,700", model: "5830", flow: "Up to 2000 LPH", tag: "", bg: "from-purple-500 to-indigo-500" },
    { size: '4"', price: "56,500", model: "5840", flow: "Up to 3000 LPH", tag: "Commercial", bg: "from-cyan-500 to-blue-500" },
    { size: '5"', price: "98,000", model: "5850", flow: "Up to 5000 LPH", tag: "Industrial", bg: "from-indigo-500 to-purple-500" },
    { size: '6"', price: "1,45,000", model: "5860", flow: "Up to 8000 LPH", tag: "Heavy Duty", bg: "from-red-500 to-rose-500" },
  ];

  const roPlants = [
    { name: "RO Purifier Basic", price: "7,999", capacity: "12 LPH", type: "Domestic", features: ["3 Stage Filtration", "TDS Control", "Free Installation"] },
    { name: "Advanced RO System", price: "12,999", capacity: "20 LPH", type: "Domestic", features: ["5 Stage Filtration", "UV + UF", "Digital Display"] },
    { name: "Commercial RO Plant", price: "25,000", capacity: "25 LPH", type: "Commercial", features: ["Heavy Duty", "Auto Flush", "Low Maintenance"] },
    { name: "Industrial RO Plant", price: "45,000", capacity: "100 LPH", type: "Industrial", features: ["SS Body", "High Flow", "Energy Efficient"] },
  ];

  return (
    <section
      id="products"
      className={`py-20 sm:py-28 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-dark-bg" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-secondary-500/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary-500/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6 fade-up ${visible ? "visible" : ""}`}>
            <Droplets className="w-4 h-4 text-secondary-500" />
            <span className="text-secondary-500 font-poppins text-sm font-medium">Premium Quality Since 2020</span>
          </div>

          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl text-text-light-primary dark:text-text-dark-primary mb-6 fade-up ${visible ? "visible" : ""}`}>
            UB'CAL <span className="text-secondary-500">Water Conditioner</span>
          </h1>

          <p className={`font-poppins text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto fade-up ${visible ? "visible" : ""}`}>
            Advanced water conditioning technology for every pipe size
          </p>
        </div>

        {/* Featured Banner */}
        <div className={`mb-16 fade-up ${visible ? "visible" : ""}`}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-secondary-600 to-secondary-500 p-8 text-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580310614729-ccd696524c1d?w=800&q=80')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10">
              <Shield className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">5 Year Complete Warranty</h3>
              <p className="text-white/90 mb-4">Free installation • Free repair & replacement • 24/7 support</p>
              <button className="inline-flex items-center gap-2 px-6 py-2 bg-white text-secondary-600 rounded-full font-semibold hover:shadow-lg transition">
                Claim Warranty <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Water Conditioner Products - Extraordinary Grid */}
        <div className={`mb-20 fade-up ${visible ? "visible" : ""}`}>
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-3xl text-text-light-primary dark:text-text-dark-primary">
              Choose by <span className="text-secondary-500">Pipe Size</span>
            </h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Find the perfect match for your home or business</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {waterConditioners.map((item, index) => (
              <div
                key={item.model}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 ${
                  isDark ? "bg-dark-card" : "bg-white"
                } shadow-lg hover:shadow-2xl cursor-pointer`}
                onMouseEnter={() => setSelectedProduct(item.model)}
                onMouseLeave={() => setSelectedProduct(null)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Tag */}
                {item.tag && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${item.bg} text-white font-semibold shadow-lg`}>
                      {item.tag}
                    </span>
                  </div>
                )}
                
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Droplets className={`w-20 h-20 text-secondary-500/20 group-hover:scale-110 transition-transform duration-500`} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 left-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Model {item.model}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 text-center">
                  <div className="text-sm text-secondary-500 font-medium mb-1">Model {item.model}</div>
                  <div className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">
                    {item.size}
                  </div>
                  <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-3">
                    Flow: {item.flow}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-secondary-500">₹{item.price}</span>
                    <span className="text-xs text-text-light-muted">+</span>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-1 mb-4 text-left">
                    <div className="flex items-center gap-2 text-xs text-text-light-secondary">
                      <CheckCircle className="w-3 h-3 text-secondary-500" />
                      <span>Scale prevention</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-light-secondary">
                      <CheckCircle className="w-3 h-3 text-secondary-500" />
                      <span>Energy efficient</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Get Quote 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Decorative Border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* RO Plants Section - Premium */}
        <div className={`mb-16 fade-up ${visible ? "visible" : ""}`}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
              <Settings className="w-4 h-4 text-secondary-500" />
              <span className="text-secondary-500 font-poppins text-sm font-medium">RO Solutions</span>
            </div>
            <h2 className="font-poppins font-bold text-3xl text-text-light-primary dark:text-text-dark-primary">
              Purifiers for <span className="text-secondary-500">Home & Industry</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roPlants.map((product, index) => (
              <div
                key={product.name}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 ${
                  isDark ? "bg-dark-card" : "bg-white"
                } shadow-lg hover:shadow-2xl`}
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Settings className="w-20 h-20 text-secondary-500/30 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.type === "Domestic" ? "bg-blue-500 text-white" : 
                    product.type === "Commercial" ? "bg-purple-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {product.type}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-poppins font-bold text-lg text-text-light-primary dark:text-text-dark-primary mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-3 h-3 text-secondary-500" />
                    <span className="text-xs text-text-light-secondary">Capacity: {product.capacity}</span>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-text-light-secondary">
                        <CheckCircle className="w-3 h-3 text-secondary-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-secondary-500">₹{product.price}</span>
                    <span className="text-xs text-text-light-muted">+</span>
                  </div>
                  
                  <button
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-2.5 rounded-xl bg-secondary-500/10 text-secondary-500 font-semibold text-sm hover:bg-secondary-500 hover:text-white transition-all duration-300"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
              <Star className="w-10 h-10 text-secondary-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">5000+</div>
              <div className="text-sm text-text-light-secondary">Happy Customers</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-secondary-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">5 Years</div>
              <div className="text-sm text-text-light-secondary">Warranty</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
              <Zap className="w-10 h-10 text-secondary-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">24/7</div>
              <div className="text-sm text-text-light-secondary">Support Available</div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className={`mt-16 text-center fade-up ${visible ? "visible" : ""}`}>
          <div className="rounded-3xl bg-gradient-to-r from-secondary-600 to-secondary-500 p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Need Expert Advice?</h3>
            <p className="text-white/90 mb-6">Call us for free consultation and site visit</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:8888800773" className="flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white font-semibold hover:bg-white/30 transition">
                <Phone className="w-4 h-4" /> 8888800773
              </a>
              <a href="tel:9763473858" className="flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white font-semibold hover:bg-white/30 transition">
                <Phone className="w-4 h-4" /> 97634 73858
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; transform: translateY(28px); }
        .fade-up.visible { animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </section>
  );
}