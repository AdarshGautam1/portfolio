/* ============================================
   Experience Section — Orbital Timeline
   ============================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '../../data/content';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate section header */
      gsap.fromTo(
        '.experience .section-header',
        { y: 20, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* Draw the path on scroll */
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        });

        /* Move ember dot along path */
        if (dotRef.current) {
          const motionPath = {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
          };

          gsap.to(dotRef.current, {
            motionPath,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1.5,
            },
          });
        }
      }

      /* Animate experience entries */
      gsap.utils.toArray('.experience__entry').forEach((entry, i) => {
        gsap.fromTo(
          entry,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience section">
      <div className="section-header">
        <span className="hud-label">03</span>
        <span className="hud-label--bracket">JOURNEY</span>
      </div>

      <div className="experience__timeline">
        {/* SVG curved path */}
        <svg className="experience__svg" viewBox="0 0 100 600" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M50 0 C30 100, 70 150, 50 200 C30 250, 70 300, 50 350 C30 400, 70 450, 50 500 C30 550, 50 600, 50 600"
            stroke="var(--ember-dim)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>

        {/* Traveling dot */}
        <div ref={dotRef} className="experience__ember-dot" />

        {/* Experience entries */}
        <div className="experience__entries">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className={`experience__entry ${i % 2 === 0 ? 'experience__entry--left' : 'experience__entry--right'}`}
            >
              <div className="experience__node">
                <span className="experience__node-ring" />
              </div>

              <div className="experience__card">
                <span className="experience__year">{exp.year}</span>
                <h3 className="experience__role">{exp.role}</h3>
                <span className="experience__company">@ {exp.company}</span>
                <p className="experience__desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orbital divider */}
      <div className="orbital-divider">
        <svg viewBox="0 0 1200 80">
          <path d="M0 40 Q300 0 600 40 Q900 80 1200 40" className="orbital-divider__line" />
          <circle cx="600" cy="40" className="orbital-divider__dot" />
        </svg>
      </div>
    </section>
  );
}
