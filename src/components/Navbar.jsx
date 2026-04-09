import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = ["Home", "About", "Services", "Products", "Contact"];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition ${
        scrolled ? "bg-white shadow-md" : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6">
        
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")}
          className="font-semibold text-lg">
          Sushiraj<span className="text-blue-600">Enterprise</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${l.toLowerCase()}`)}
              className="hover:text-blue-600"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}