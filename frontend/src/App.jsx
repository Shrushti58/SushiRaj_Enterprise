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

const LOADING_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500&display=swap');

  .sl-root {
    position: fixed; inset: 0; z-index: 9999;
    background: #0a0a0a;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    overflow: hidden;
  }
  .sl-root.fade-out {
    animation: slFade 0.8s cubic-bezier(0.7,0,1,1) forwards;
  }
  @keyframes slFade {
    0%   { opacity: 1; }
    100% { opacity: 0; }
  }

  /* ── diagonal slash bg ── */
  .sl-slash {
    position: absolute;
    top: 0; left: -60%;
    width: 80%;
    height: 100%;
    background: #111111;
    transform: skewX(-12deg);
    transform-origin: top left;
    animation: slSlashIn 1s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes slSlashIn {
    from { transform: skewX(-12deg) translateX(-100%); }
    to   { transform: skewX(-12deg) translateX(0); }
  }

  /* ── teal accent line ── */
  .sl-accent-line {
    position: absolute;
    left: 0; top: 0;
    width: 3px;
    height: 100%;
    background: #1ABC9C;
    transform-origin: top;
    animation: slLineDown 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  }
  @keyframes slLineDown {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }

  /* ── logo ── */
  .sl-logo-wrap {
    position: relative;
    z-index: 2;
    animation: slLogoIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both;
  }
  @keyframes slLogoIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  .sl-logo-img {
    width: 72px; height: 72px;
    object-fit: contain;
    border-radius: 0;
    filter: brightness(1.05);
  }

  /* ── main title ── */
  .sl-title-block {
    position: relative; z-index: 2;
    text-align: left;
    margin-top: 28px;
    overflow: hidden;
  }
  .sl-brand {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 12vw, 8rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: #ffffff;
    animation: slTextReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both;
  }
  .sl-brand-sub {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 12vw, 8rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: #1ABC9C;
    animation: slTextReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s both;
  }
  @keyframes slTextReveal {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sl-tagline {
    font-family: 'Poppins', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-top: 16px;
    display: block;
    animation: slFadeUp 0.6s ease 1s both;
  }
  @keyframes slFadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── progress line ── */
  .sl-progress-wrap {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 3;
  }
  .sl-progress-track {
    width: 100%; height: 2px;
    background: rgba(255,255,255,0.06);
  }
  .sl-progress-fill {
    height: 100%;
    background: #1ABC9C;
    box-shadow: 0 0 12px rgba(26,188,156,0.8), 0 0 40px rgba(26,188,156,0.3);
    transition: width 0.3s ease;
    position: relative;
  }
  /* moving glow head */
  .sl-progress-fill::after {
    content: '';
    position: absolute;
    right: -1px; top: -4px;
    width: 3px; height: 10px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 8px #1ABC9C, 0 0 20px #1ABC9C;
    opacity: 0.9;
  }

  /* ── bottom status bar ── */
  .sl-status-bar {
    position: absolute;
    bottom: 12px; left: 0; right: 0;
    z-index: 3;
    padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
    animation: slFadeUp 0.5s ease 0.8s both;
  }
  .sl-status-text {
    font-family: 'Poppins', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .sl-pct {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.08em;
    color: #1ABC9C;
    font-variant-numeric: tabular-nums;
  }

  /* ── corner grid marks ── */
  .sl-corner {
    position: absolute;
    width: 20px; height: 20px;
    z-index: 2;
    opacity: 0.3;
    animation: slFadeUp 0.5s ease 1s both;
  }
  .sl-corner-tl { top: 20px;    left: 20px;   border-top: 1px solid #1ABC9C; border-left: 1px solid #1ABC9C; }
  .sl-corner-tr { top: 20px;    right: 20px;  border-top: 1px solid #1ABC9C; border-right: 1px solid #1ABC9C; }
  .sl-corner-bl { bottom: 28px; left: 20px;   border-bottom: 1px solid #1ABC9C; border-left: 1px solid #1ABC9C; }
  .sl-corner-br { bottom: 28px; right: 20px;  border-bottom: 1px solid #1ABC9C; border-right: 1px solid #1ABC9C; }

  /* ── large faded bg text ── */
  .sl-bg-text {
    position: absolute;
    bottom: -2%;
    right: -2%;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(120px, 22vw, 260px);
    line-height: 1;
    color: rgba(255,255,255,0.025);
    letter-spacing: 0.02em;
    pointer-events: none;
    user-select: none;
    z-index: 1;
    white-space: nowrap;
  }

  /* ── horizontal scan line ── */
  .sl-scanline {
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(26,188,156,0.4), transparent);
    animation: slScan 2.5s ease-in-out infinite;
    z-index: 2;
    pointer-events: none;
  }
  @keyframes slScan {
    0%   { top: 0%;   opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
`;

function NikeLoader({ progress, activeStep, fadeOut, loadingSteps }) {
  return (
    <div className={`sl-root${fadeOut ? ' fade-out' : ''}`}>
      {/* diagonal bg slash */}
      <div className="sl-slash" />
      {/* left accent line */}
      <div className="sl-accent-line" />
      {/* scan line */}
      <div className="sl-scanline" />
      {/* large faded bg text */}
      <div className="sl-bg-text">PURE</div>
      {/* corner marks */}
      <div className="sl-corner sl-corner-tl" />
      <div className="sl-corner sl-corner-tr" />
      <div className="sl-corner sl-corner-bl" />
      <div className="sl-corner sl-corner-br" />

      {/* center content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        padding: '0 10vw'
      }}>
        {/* logo */}
        <div className="sl-logo-wrap">
          <img src="/logo.jpeg" alt="Sushiraj Enterprise" className="sl-logo-img" />
        </div>

        {/* title */}
        <div className="sl-title-block">
          <span className="sl-brand">SUSHIRAJ</span>
          <span className="sl-brand-sub">ENTERPRISE</span>
          <span className="sl-tagline">Pure Water &nbsp;·&nbsp; Healthy Life</span>
        </div>
      </div>

      {/* bottom status */}
      <div className="sl-status-bar">
        <span className="sl-status-text">{loadingSteps[activeStep]?.text ?? 'Loading'}</span>
        <span className="sl-pct">{Math.round(progress)}%</span>
      </div>

      {/* progress bar at very bottom */}
      <div className="sl-progress-wrap">
        <div className="sl-progress-track">
          <div className="sl-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading]       = useState(true);
  const [progress, setProgress]     = useState(0);
  const [fadeOut, setFadeOut]       = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const loadingSteps = [
    { text: 'Initializing Systems',   progress: 20  },
    { text: 'Loading Resources',      progress: 40  },
    { text: 'Preparing Experience',   progress: 60  },
    { text: 'Optimizing Performance', progress: 80  },
    { text: 'Ready',                  progress: 100 },
  ];

  useEffect(() => {
    if (!document.getElementById('sl-styles')) {
      const style = document.createElement('style');
      style.id = 'sl-styles';
      style.textContent = LOADING_CSS;
      document.head.appendChild(style);
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        let inc = 5;
        if (prev > 80) inc = 2;
        else if (prev > 60) inc = 3;
        else if (prev > 40) inc = 4;
        return Math.min(prev + inc, 100);
      });
    }, 80);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 800);
    }, 2600);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const idx = loadingSteps.findIndex(s => s.progress > progress);
    setActiveStep(idx === -1 ? loadingSteps.length - 1 : idx);
  }, [progress]);

  if (loading) {
    return (
      <NikeLoader
        progress={progress}
        activeStep={activeStep}
        fadeOut={fadeOut}
        loadingSteps={loadingSteps}
      />
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