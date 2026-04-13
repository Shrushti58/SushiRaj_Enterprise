import { useTheme } from "../context/ThemeContext";
import { Phone, Mail, MapPin, Clock, Droplets, ChevronRight } from "lucide-react";

export default function Footer() {
  const { isDark } = useTheme();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "RO Installation",
    "Water Filter Service",
    "AMC Maintenance",
    "Repair & Support",
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
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl text-white">
                  Sushiraj<span className="text-secondary-500">Enterprise</span>
                </h3>
                <p className="text-xs text-gray-400">Pure Water | Healthy Life</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium RO water purifiers, filtration systems, and professional AMC services for your home and business since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
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
            <h4 className="font-poppins font-semibold text-white text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
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
            <h4 className="font-poppins font-semibold text-white text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <a href="tel:918888800773" className="text-white text-sm hover:text-secondary-500 transition">8888800773</a>
                  <span className="text-gray-500 mx-1">|</span>
                  <a href="tel:919763473858" className="text-white text-sm hover:text-secondary-500 transition">97634 73858</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email Us</p>
                  <a href="mailto:Sushiraj.enterprises@gmail.com" className="text-white text-sm hover:text-secondary-500 transition break-all">
                    Sushiraj.enterprises@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Visit Us</p>
                  <p className="text-white text-sm">Sangli, Maharashtra, India</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Business Hours</p>
                  <p className="text-white text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-500 text-xs">Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Simplified */}
      <div className={`border-t ${
        isDark ? "border-gray-800" : "border-gray-800"
      } py-6`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Sushiraj Enterprise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}