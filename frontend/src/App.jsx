import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import SushirajHero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import EducationalInfo from './components/EducationalInfo';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const loadingSteps = [
    { text: "Initializing Core Systems", progress: 20 },
    { text: "Loading Resources", progress: 40 },
    { text: "Preparing Experience", progress: 60 },
    { text: "Optimizing Performance", progress: 80 },
    { text: "Ready", progress: 100 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        let increment = 5;
        if (prev > 80) increment = 2;
        else if (prev > 60) increment = 3;
        else if (prev > 40) increment = 4;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    const stepInterval = setInterval(() => {
      setActiveStep(prev => {
        const nextStep = loadingSteps.findIndex(step => step.progress > progress);
        return nextStep === -1 ? loadingSteps.length - 1 : nextStep;
      });
    }, 100);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 1000);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [progress]);

  if (loading) {
    return (
      <div className={`fixed inset-0 z-50 transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg" />
        
        {/* Animated Particle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-secondary-500/8 animate-float-particle"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 12 + 6}s`
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary-500/8 blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-500/8 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary-500/4 blur-3xl animate-pulse-slow" />
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
          
          {/* Logo with Premium Animation */}
          <div className="relative mb-12">
            {/* Outer Rings */}
            <div className="absolute -inset-4 rounded-full border border-secondary-500/20 animate-pulse-ring" />
            <div className="absolute -inset-8 rounded-full border border-secondary-500/10 animate-pulse-ring" style={{ animationDelay: '0.8s' }} />
            
            {/* Rotating Rings */}
            <div className="absolute -inset-2 rounded-full border border-secondary-500/30 animate-spin-slow" />
            <div className="absolute -inset-10 rounded-full border border-dashed border-secondary-500/15 animate-spin-reverse" />
            
            {/* Logo Container */}
            <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-dark-card dark:to-dark-surface rounded-2xl shadow-2xl p-5 backdrop-blur-sm">
              <img 
                src="/logo.jpeg" 
                alt="Sushiraj Enterprise" 
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl"
              />
            </div>
          </div>
          
          {/* Company Name */}
          <div className="text-center">
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-text-light-primary dark:text-text-dark-primary tracking-tight">
              Sushiraj
              <span className="relative inline-block">
                <span className="text-secondary-500">Enterprise</span>
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
              </span>
            </h1>
            <p className="font-poppins text-sm text-text-light-secondary dark:text-text-dark-secondary mt-4 tracking-wide">
              Pure Water | Healthy Life
            </p>
          </div>
          
          {/* Premium Progress Section */}
          <div className="w-80 sm:w-96 mt-12">
            {/* Progress Bar Container */}
            <div className="relative">
              {/* Background Track */}
              <div className="h-0.5 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Progress Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-secondary-500 via-teal-500 to-secondary-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 blur-md bg-secondary-500/30" style={{ width: '100%' }} />
                </div>
              </div>
              
              {/* Progress Nodes */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                {[20, 40, 60, 80, 100].map((nodeProgress) => (
                  <div
                    key={nodeProgress}
                    className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${
                      progress >= nodeProgress
                        ? 'bg-secondary-500 shadow-lg shadow-secondary-500/50'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    style={{ left: `${nodeProgress}%`, transform: 'translateX(-50%)' }}
                  />
                ))}
              </div>
            </div>
            
            {/* Status Text */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                <span className="text-xs font-medium text-text-light-muted dark:text-text-dark-muted font-poppins tracking-wide uppercase">
                  {loadingSteps[activeStep]?.text}
                </span>
              </div>
              <span className="text-sm font-light text-secondary-500 font-poppins tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          {/* Elegant Loading Indicator */}
          <div className="mt-10">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-loading-dot" style={{ animationDelay: '0s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-500/60 animate-loading-dot" style={{ animationDelay: '0.15s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-500/30 animate-loading-dot" style={{ animationDelay: '0.3s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-500/15 animate-loading-dot" style={{ animationDelay: '0.45s' }} />
            </div>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none opacity-30">
            <svg className="absolute bottom-0 w-full" preserveAspectRatio="none" viewBox="0 0 1440 120">
              <path 
                fill="url(#waveGradient)" 
                d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,69.3C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              />
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1ABC9C" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#1ABC9C" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1ABC9C" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <SushirajHero />
        <About />
        <Services />
        <EducationalInfo /> 
        <Products />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;