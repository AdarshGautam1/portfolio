/* ============================================
   App — Root Component
   ============================================ */
import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SpaceBackground from './components/Background/SpaceBackground';
import EmberCursor from './components/Cursor/EmberCursor';
import OrbitalNav from './components/Navigation/OrbitalNav';
import EntryLoader from './components/Loader/EntryLoader';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import Contact from './sections/Contact/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  /* Initialize smooth scrolling */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {!loaded && <EntryLoader onComplete={handleLoadComplete} />}

      {/* Dynamic Deep Space & Nebula Background */}
      <SpaceBackground />

      {/* Custom cursor */}
      <EmberCursor />

      {/* Navigation */}
      <OrbitalNav />

      {/* Subtle Noise Texture */}
      <div className="noise-overlay" />

      {/* Sections */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
