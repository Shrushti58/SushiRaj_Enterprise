import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

export default function SushirajHero() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);
  const fadingOutRef = useRef(false);
  const currentOpacityRef = useRef(1);
  const [videoOpacity, setVideoOpacity] = useState(1);

  // Custom fade animation function
  const animateFade = useCallback((targetOpacity, duration, onComplete) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const startOpacity = currentOpacityRef.current;
    const startTime = performance.now();
    const endTime = startTime + duration;

    const updateOpacity = (currentTime) => {
      const elapsed = currentTime - startTime;
      let progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      const newOpacity = startOpacity + (targetOpacity - startOpacity) * easeProgress;
      
      currentOpacityRef.current = newOpacity;
      setVideoOpacity(newOpacity);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateOpacity);
      } else {
        animationFrameRef.current = null;
        if (onComplete) onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateOpacity);
  }, []);

  // Handle video fade-out before end
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current || videoError) return;
    
    const video = videoRef.current;
    const timeRemaining = video.duration - video.currentTime;
    
    if (timeRemaining <= 0.55 && !fadingOutRef.current && currentOpacityRef.current > 0) {
      fadingOutRef.current = true;
      animateFade(0, 250, null);
    }
  }, [animateFade, videoError]);

  // Handle video end and restart
  const handleVideoEnded = useCallback(() => {
    if (!videoRef.current || videoError) return;
    
    setVideoOpacity(0);
    currentOpacityRef.current = 0;
    
    videoRef.current.currentTime = 0;
    
    setTimeout(() => {
      if (videoRef.current && !videoError) {
        videoRef.current.play().then(() => {
          fadingOutRef.current = false;
          animateFade(1, 250, null);
        }).catch(error => {
          console.log("Video replay failed:", error);
          setVideoError(true);
        });
      }
    }, 100);
  }, [animateFade, videoError]);

  // Handle video load and start playing
  const handleVideoLoaded = useCallback(() => {
    if (!videoRef.current || videoError) return;
    
    videoRef.current.play().catch(error => {
      console.log("Video autoplay failed:", error);
      setVideoError(true);
    });
    animateFade(1, 250, null);
  }, [animateFade, videoError]);

  // Handle video error
  const handleVideoError = useCallback(() => {
    console.log("Video failed to load");
    setVideoError(true);
    setVideoOpacity(1);
  }, []);

  // Initialize video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnded);
    video.addEventListener("loadeddata", handleVideoLoaded);
    video.addEventListener("error", handleVideoError);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnded);
      video.removeEventListener("loadeddata", handleVideoLoaded);
      video.removeEventListener("error", handleVideoError);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleTimeUpdate, handleVideoEnded, handleVideoLoaded, handleVideoError]);

  // Animation on load
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Smooth scroll to section
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // SVG Icons
  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.352 21.4019C21.1467 21.5901 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0968 21.945 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77381 17.3147 6.72533 15.2662 5.19 12.85C3.49907 10.2413 2.44609 7.27167 2.12 4.18C2.09508 3.90347 2.12813 3.62372 2.21719 3.36004C2.30626 3.09636 2.44949 2.85444 2.63757 2.64927C2.82565 2.4441 3.05459 2.2806 3.30958 2.16905C3.56456 2.0575 3.84005 2.00048 4.1185 2.001H7.1185C7.64552 1.99588 8.15963 2.16311 8.58498 2.47479C9.01034 2.78647 9.32116 3.2234 9.4685 3.721C9.64329 4.33465 9.88631 4.92606 10.1915 5.482C10.4556 5.97488 10.5669 6.53628 10.5115 7.093C10.456 7.64971 10.2365 8.1764 9.8865 8.604L8.9965 9.695C9.56367 10.8568 10.3559 11.8944 11.3275 12.744C12.1774 13.6982 13.2081 14.4754 14.3535 15.03L15.4415 14.129C15.8199 13.8189 16.2855 13.6242 16.778 13.5716C17.2704 13.5191 17.7673 13.6107 18.2075 13.835C18.7854 14.1279 19.3959 14.3562 20.0275 14.515C20.5256 14.6599 20.9637 14.9674 21.2777 15.3886C21.5916 15.8098 21.7626 16.3198 21.7655 16.843L21.7655 16.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const MessageIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21L4.65 17.5C3.874 16.188 3.5 14.682 3.5 13.125C3.5 8.062 7.562 4 12.625 4C17.688 4 21.75 8.062 21.75 13.125C21.75 18.188 17.688 22.25 12.625 22.25C11.1 22.25 9.612 21.887 8.25 21.2L3 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 9.5C9.5 9.5 10.5 8.5 11.5 10C12.5 11.5 13 12 14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="relative min-h-screen overflow-hidden font-poppins">
      {/* Video Background - Only for Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* Fallback Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500"></div>
        
        {/* Fallback Image */}
        {videoError && (
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1580310614729-ccd696524c1d?w=1920&q=80&auto=format&fit=crop"
              alt="Water purification background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
        
        {/* Video Element */}
        <video
          ref={videoRef}
          className="absolute w-[115%] h-[115%] object-cover object-top"
          style={{
            left: "50%",
            top: "0",
            transform: "translateX(-50%)",
            opacity: videoError ? 0 : videoOpacity,
            display: videoError ? 'none' : 'block',
          }}
          src="/sushiraj-bg.mp4"
          loop={false}
          muted
          playsInline
          preload="auto"
        />
        
        {/* Overlay - Darker for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="px-4 sm:px-8 md:px-[60px] lg:px-[120px] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full py-12 sm:py-16">
          
          {/* Badge Component */}
          <div className={`fade-up ${visible ? "visible" : ""}`} style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 sm:mb-[34px]">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0e1311] rounded-full shadow-sm">
                <div className="text-white">
                  <StarIcon />
                </div>
                <span className="font-poppins font-regular text-sm text-white">Premium Quality</span>
              </div>
              <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full shadow-sm border border-white/20">
                <span className="font-poppins font-regular text-sm text-white">Since 2020 | Trusted Brand</span>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`fade-up text-center font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-3px] text-white mb-4 sm:mb-6 lg:mb-[34px] ${visible ? "visible" : ""}`} style={{ animationDelay: "0.2s" }}>
            Pure Water
            <br />
            <span className="text-secondary-500">Healthy Life</span>
          </h1>

          {/* Subtitle */}
          <p className={`fade-up text-center font-poppins font-medium text-base sm:text-lg lg:text-[20px] tracking-[-0.2px] lg:tracking-[-0.3px] text-white/90 max-w-[90%] sm:max-w-[80%] lg:max-w-[736px] mb-8 sm:mb-10 lg:mb-12 ${visible ? "visible" : ""}`} style={{ animationDelay: "0.3s" }}>
            Premium RO water purifiers, water conditioners, and professional AMC services for your home and business.
          </p>

          {/* CTA Buttons */}
          <div className={`fade-up flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[600px] ${visible ? "visible" : ""}`} style={{ animationDelay: "0.4s" }}>
            <button 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group w-full sm:w-auto px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-poppins font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-glow flex items-center justify-center gap-3"
            >
              <MessageIcon />
              Get Free Quote
              <ArrowRightIcon />
            </button>

            <button 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:border-secondary-500 text-white font-poppins font-medium text-base sm:text-lg rounded-xl transition-all duration-300 hover:bg-white/20 flex items-center justify-center gap-3"
            >
              <PhoneIcon />
              Call: 8888800773
            </button>
          </div>

          {/* Additional CTA - WhatsApp */}
          <div className={`fade-up mt-6 ${visible ? "visible" : ""}`} style={{ animationDelay: "0.45s" }}>
            <a 
              href="https://wa.me/918888800773"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2 bg-[#25D366]/20 backdrop-blur-sm border border-[#25D366]/40 hover:border-[#25D366] rounded-full transition-all duration-300"
            >
              <WhatsAppIcon />
              <span className="font-poppins text-sm text-white/80 group-hover:text-white">Chat on WhatsApp</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12 lg:mt-14">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span className="font-poppins text-xs sm:text-sm text-white/80">5000+ Happy Families</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span className="font-poppins text-xs sm:text-sm text-white/80">1000+ Installations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span className="font-poppins text-xs sm:text-sm text-white/80">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span className="font-poppins text-xs sm:text-sm text-white/80">5 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
        }
        
        .fade-up.visible {
          animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}