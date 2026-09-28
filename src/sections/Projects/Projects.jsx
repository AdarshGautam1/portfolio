/* ============================================
   Projects Section — Dossier-style cards
   ============================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/content';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          x: isEven ? -80 : 80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isEven]);

  /* Glitch effect on hover */
  const handleMouseEnter = () => {
    if (!imageRef.current) return;
    const el = imageRef.current;

    const tl = gsap.timeline();
    tl.to(el, { clipPath: 'inset(10% 0 20% 0)', duration: 0.05 })
      .to(el, { clipPath: 'inset(30% 0 5% 0)', duration: 0.05 })
      .to(el, { clipPath: 'inset(5% 0 40% 0)', duration: 0.05 })
      .to(el, { clipPath: 'inset(0 0 0 0)', duration: 0.05 })
      .to(el, { x: 3, duration: 0.03 })
      .to(el, { x: -3, duration: 0.03 })
      .to(el, { x: 0, duration: 0.03 });
  };

  /* generate procedural gradient for project placeholder */
  const hue = 15 + index * 8;
  const gradientStyle = {
    background: `linear-gradient(135deg, hsl(${hue}, 60%, 12%) 0%, hsl(${hue + 10}, 70%, 8%) 50%, hsl(${hue}, 50%, 5%) 100%)`,
  };

  return (
    <div
      ref={cardRef}
      className={`project-card ${isEven ? 'project-card--left' : 'project-card--right'}`}
    >
      {/* Big background number */}
      <span className="project-card__bg-num">{String(index + 1).padStart(2, '0')}</span>

      <div className="project-card__inner">
        {/* Image */}
        <div
          className="project-card__image-wrap"
          ref={imageRef}
          onMouseEnter={handleMouseEnter}
        >
          <div className="project-card__image" style={gradientStyle}>
            <div className="project-card__image-overlay">
              <span className="project-card__image-label">{project.title}</span>
              <div className="project-card__image-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="project-card__image-cell" style={{
                    background: `rgba(232, 101, 43, ${0.03 + Math.random() * 0.08})`,
                    animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>
          {/* Corner brackets */}
          <div className="project-card__corner project-card__corner--tl" />
          <div className="project-card__corner project-card__corner--br" />
        </div>

        {/* Info */}
        <div className="project-card__info">
          <span className="project-card__year">{project.year}</span>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.description}</p>

          <div className="project-card__tech">
            {project.tech.map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>

          <div className="project-card__actions">
            <a href={project.liveUrl} className="glow-btn" data-magnetic>
              <span>↗ Live</span>
            </a>
            <a href={project.codeUrl} className="glow-btn glow-btn--ghost" data-magnetic>
              <span>{'</>'} Code</span>
            </a>
          </div>
        </div>
      </div>

      {/* Connecting thread */}
      {index < PROJECTS.length - 1 && <div className="project-card__thread" />}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects .section-header',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects section">
      <div className="section-header">
        <span className="hud-label">02</span>
        <span className="hud-label--bracket">PROJECTS</span>
      </div>

      <div className="projects__list">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Orbital divider */}
      <div className="orbital-divider">
        <svg viewBox="0 0 1200 80">
          <path d="M0 40 Q300 80 600 40 Q900 0 1200 40" className="orbital-divider__line" />
          <circle cx="600" cy="40" className="orbital-divider__dot" />
        </svg>
      </div>
    </section>
  );
}
