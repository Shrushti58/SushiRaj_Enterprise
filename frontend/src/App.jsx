import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import SushirajHero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import EducationalInfo from './components/EducationalInfo'; // New import
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <SushirajHero />
        <About />
        <Services />
        <Products />
        <EducationalInfo /> {/* New component */}
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;