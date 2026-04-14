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
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, isMobile]);

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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-lg' 
          : 'bg-white dark:bg-dark-bg shadow-sm'
      }`}>
        <div className="px-4 sm:px-6 md:px-8 lg:px-[60px] xl:px-[120px] py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Left Side */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')} 
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <img 
                src="/logo.jpeg" 
                alt="Sushiraj Enterprise Logo" 
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="font-poppins font-semibold text-base sm:text-lg md:text-xl lg:text-2xl tracking-[-0.5px] text-gray-800 dark:text-white">
                Sushiraj<span className="text-secondary-500">Enterprise</span>
              </div>
            </a>

            {/* Desktop Menu - Hidden on mobile */}
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

            {/* Desktop Right Side Buttons - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2 md:gap-3">
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
                className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-poppins font-medium text-xs sm:text-sm md:text-base rounded-lg transition-all shadow-lg hover:shadow-glow whitespace-nowrap"
              >
                {t('nav.getQuote')}
              </button>
            </div>

            {/* Mobile - Only Hamburger Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-800 dark:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel - Contains everything */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Content */}
          <div className={`fixed top-[60px] left-0 right-0 bottom-0 z-40 lg:hidden transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className={`h-full overflow-y-auto ${
              isScrolled 
                ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl' 
                : 'bg-white dark:bg-dark-bg'
            } shadow-xl border-t border-gray-200 dark:border-gray-800`}>
              <div className="flex flex-col py-4 px-4">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-poppins font-medium text-base py-3 px-4 rounded-xl transition-colors text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-secondary-500 active:bg-gray-200 dark:active:bg-gray-700"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
                
                {/* Divider */}
                <div className="my-3 border-t border-gray-200 dark:border-gray-700" />
                
                {/* Language Switcher */}
                <div className="py-2 px-4">
                  <p className="text-xs text-text-light-muted dark:text-text-dark-muted mb-2 font-poppins">Select Language</p>
                  <LanguageSwitcher />
                </div>
                
                {/* Theme Toggle */}
                <div className="py-2 px-4">
                  <p className="text-xs text-text-light-muted dark:text-text-dark-muted mb-2 font-poppins">Theme</p>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <span className="font-poppins text-sm">Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </button>
                </div>
                
                {/* Get Quote Button */}
                <div className="mt-4 pt-2 px-4">
                  <button 
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-poppins font-semibold text-base rounded-xl transition-all active:scale-95 shadow-md"
                  >
                    {t('nav.getQuote')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}