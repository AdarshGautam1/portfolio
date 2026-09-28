/* ============================================
   Hero Section — Photo + Code Overlay
   ============================================ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PROFILE } from '../../data/content';
import './Hero.css';

const CODE_LINES = [
  { indent: 0, text: 'const developer = {', delay: 0 },
  { indent: 1, text: `name: "${PROFILE.name}",`, delay: 0.4 },
  { indent: 1, text: `role: "${PROFILE.role}",`, delay: 0.8 },
  { indent: 1, text: 'focus: ["Build", "Learn", "Create"],', delay: 1.2 },
  { indent: 1, text: 'always: "Curious"', delay: 1.6 },
  { indent: 0, text: '}', delay: 2.0 },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const codeRef = useRef(null);
  const orbitalRef = useRef(null);
  const [typedLines, setTypedLines] = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });

  /* Typewriter effect for code block */
  useEffect(() => {
    setTypedLines([]);
    const timeouts = CODE_LINES.map((line) =>
      setTimeout(() => {
        setTypedLines((prev) => {
          if (prev.length >= CODE_LINES.length) return prev;
          return [...prev, line];
        });
      }, line.delay * 1000 + 500)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  /* Parallax on mouse move */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mousePos.current = { x, y };

      if (photoRef.current) {
        gsap.to(photoRef.current, {
          x: x * 20,
          y: y * 20,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      if (codeRef.current) {
        gsap.to(codeRef.current, {
          x: x * -15,
          y: y * -15,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      if (orbitalRef.current) {
        gsap.to(orbitalRef.current, {
          rotation: x * 5,
          duration: 1,
          ease: 'power2.out',
        });
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* Entrance animation */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    tl.fromTo(
      '.hero__photo-container',
      { scale: 0.8, opacity: 0, clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
      {
        scale: 1,
        opacity: 1,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        duration: 1.2,
        ease: 'power3.inOut',
      }
    );

    tl.fromTo(
      '.hero__code',
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      '.hero__tagline',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    tl.fromTo(
      '.hero__cta-row',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    tl.fromTo(
      '.hero__scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    return () => tl.kill();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero section-full">
      {/* Orbital rings behind photo */}
      <div className="hero__orbitals" ref={orbitalRef}>
        <div className="hero__orbital hero__orbital--1" />
        <div className="hero__orbital hero__orbital--2" />
        <div className="hero__orbital hero__orbital--3" />
      </div>

      <div className="hero__content">
        {/* Code block — left side */}
        <div className="hero__code" ref={codeRef}>
          <div className="hero__code-window">
            <div className="hero__code-dots">
              <span /><span /><span />
            </div>
            <pre className="hero__code-body">
              {typedLines.map((line, i) => (
                <div key={i} className="hero__code-line" style={{ paddingLeft: `${line.indent * 1.5}em` }}>
                  <span className="hero__line-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="hero__line-text">{line.text}</span>
                  {i === typedLines.length - 1 && <span className="hero__cursor-blink">|</span>}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Photo — center-right */}
        <div className="hero__photo-container" ref={photoRef}>
          <img src={PROFILE.photo} alt={PROFILE.name} className="hero__photo" />
          <div className="hero__photo-glow" />
        </div>

        {/* Info overlay — right side */}
        <div className="hero__info-panel">
          <div className="hero__hud-item">
            <span className="hud-label">BUILD</span>
          </div>
          <div className="hero__hud-item">
            <span className="hud-label">LEARN</span>
          </div>
          <div className="hero__hud-item">
            <span className="hud-label">CREATE</span>
          </div>
          <div className="hero__hud-item">
            <span className="hud-label">REPEAT</span>
          </div>
        </div>
      </div>

      {/* Bottom area */}
      <div className="hero__bottom">
        <p className="hero__tagline">{PROFILE.tagline}</p>
        <div className="hero__cta-row">
          <span className="hero__domain">WEB DEV</span>
          <span className="hero__domain-sep">/</span>
          <span className="hero__domain">GAME DEV</span>
          <span className="hero__domain-sep">/</span>
          <span className="hero__domain">AND MORE...</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
