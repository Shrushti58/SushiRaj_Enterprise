import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'mr', name: 'मराठी' }
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 ${
          isDark 
            ? "bg-dark-card/80 text-text-dark-secondary hover:bg-secondary-500/20" 
            : "bg-gray-100 text-text-light-secondary hover:bg-secondary-500/10"
        } border border-gray-200 dark:border-gray-700`}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">
          {currentLanguage?.name || "English"}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-32 rounded-xl shadow-lg overflow-hidden z-50 ${
            isDark ? "bg-dark-card" : "bg-white"
          } border border-gray-200 dark:border-gray-700`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-300 hover:bg-secondary-500/10 ${
                  currentLang === lang.code 
                    ? "text-secondary-500 bg-secondary-500/5" 
                    : "text-text-light-secondary dark:text-text-dark-secondary"
                }`}
              >
                <span>{lang.name}</span>
                {currentLang === lang.code && (
                  <Check className="w-3.5 h-3.5 text-secondary-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}