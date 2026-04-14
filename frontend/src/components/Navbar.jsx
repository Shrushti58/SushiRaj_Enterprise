// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../context/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const SunIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "howItWorks", href: "#how-it-works" },
    { key: "products", href: "#products" },
    { key: "contact", href: "#contact" }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-lg' 
        : 'bg-white dark:bg-dark-bg shadow-sm'
    }`}>
      <div className="px-4 sm:px-6 md:px-8 lg:px-[60px] xl:px-[120px] py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')} 
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <img 
              src="/logo.jpeg" 
              alt="Sushiraj Enterprise Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
            />
            <div className="font-poppins font-semibold text-lg sm:text-xl md:text-2xl tracking-[-0.5px] text-gray-800 dark:text-white">
              Sushiraj<span className="text-secondary-500">Enterprise</span>
            </div>
          </a>

          {/* Desktop Menu Items */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative px-1 py-2"
              >
                <span className="font-poppins font-medium text-sm xl:text-base tracking-[-0.2px] text-gray-700 dark:text-gray-200 hover:text-secondary-500 transition-colors duration-300">
                  {t(`nav.${item.key}`)}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop Right Side Buttons */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            <LanguageSwitcher />
            
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 flex items-center justify-center ${
                isScrolled 
                  ? 'bg-white/50 dark:bg-dark-card/50 border-gray-200 dark:border-gray-700 hover:border-secondary-500 text-gray-700 dark:text-white backdrop-blur-sm' 
                  : 'bg-gray-100 dark:bg-dark-card border-gray-200 dark:border-gray-700 hover:border-secondary-500 text-gray-700 dark:text-white'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            
            <button 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-poppins font-medium text-sm sm:text-base rounded-lg transition-all shadow-lg hover:shadow-glow whitespace-nowrap"
            >
              {t('nav.getQuote')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-800 dark:text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden mt-3 py-3 rounded-2xl overflow-hidden transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl shadow-lg border border-gray-200 dark:border-gray-700' 
              : 'bg-white dark:bg-dark-bg shadow-lg border border-gray-200 dark:border-gray-700'
          }`}>
            <div className="flex flex-col gap-1 px-3">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-poppins font-medium text-base py-3 px-4 rounded-xl transition-colors text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-secondary-500"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
                <LanguageSwitcher />
                
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-white"
                  aria-label="Toggle theme"
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </button>
                
                <button 
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex-1 py-2.5 bg-secondary-500 hover:bg-secondary-600 text-white font-poppins font-medium text-base rounded-lg transition-all"
                >
                  {t('nav.getQuote')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}