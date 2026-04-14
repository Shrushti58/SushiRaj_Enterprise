import { useTranslation } from 'react-i18next';
import { useTheme } from "../context/ThemeContext";
import { Phone, Mail, MapPin, Clock, Droplets, ChevronRight } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const quickLinks = [
    { name: t('footer.quickLinks.home'), href: "#home", key: "home" },
    { name: t('footer.quickLinks.about'), href: "#about", key: "about" },
    { name: t('footer.quickLinks.services'), href: "#services", key: "services" },
    { name: t('footer.quickLinks.products'), href: "#products", key: "products" },
    { name: t('footer.quickLinks.testimonials'), href: "#testimonials", key: "testimonials" },
    { name: t('footer.quickLinks.contact'), href: "#contact", key: "contact" },
  ];

  const services = [
    t('footer.services.roInstallation'),
    t('footer.services.waterFilter'),
    t('footer.services.amc'),
    t('footer.services.repair'),
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={`transition-colors duration-300 ${
      isDark ? "bg-dark-surface" : "bg-gray-900"
    }`}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo Image from public folder */}
              <img 
                src="/logo.jpeg" 
                alt="Sushiraj Enterprise Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              {/* Fallback icon if logo fails to load */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center hidden">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl text-white">
                  Sushiraj<span className="text-secondary-500">{t('footer.brand')}</span>
                </h3>
                <p className="text-xs text-gray-400">{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-lg mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-secondary-500 text-sm transition-colors duration-300 flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-lg mb-4">{t('footer.services.title')}</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, "#services")}
                    className="text-gray-400 hover:text-secondary-500 text-sm transition-colors duration-300 flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-lg mb-4">{t('footer.contactInfo.title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.contactInfo.callUs')}</p>
                  <a href="tel:918888800773" className="text-white text-sm hover:text-secondary-500 transition">8888800773</a>
                  <span className="text-gray-500 mx-1">|</span>
                  <a href="tel:919763473858" className="text-white text-sm hover:text-secondary-500 transition">97634 73858</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.contactInfo.emailUs')}</p>
                  <a href="mailto:Sushiraj.enterprises@gmail.com" className="text-white text-sm hover:text-secondary-500 transition break-all">
                    Sushiraj.enterprises@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.contactInfo.visitUs')}</p>
                  <p className="text-white text-sm">{t('footer.contactInfo.address')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">{t('footer.contactInfo.businessHours')}</p>
                  <p className="text-white text-sm">{t('footer.contactInfo.hours')}</p>
                  <p className="text-gray-500 text-xs">{t('footer.contactInfo.sundayClosed')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${
        isDark ? "border-gray-800" : "border-gray-800"
      } py-6`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Sushiraj Enterprise. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}