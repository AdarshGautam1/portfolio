/* ============================================
   About Section — Bio + Skill Constellation
   ============================================ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE, SKILLS, SKILL_CONNECTIONS } from '../../data/content';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

/* category colors */
const CAT_COLORS = {
  core: '#E8652B',
  frontend: '#FF8C42',
  backend: '#C75B39',
  gamedev: '#A84520',
  tools: '#6B6660',
};

export default function About() {
  const sectionRef = useRef(null);
  const constellationRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate bio text */
      gsap.fromTo(
        '.about__bio-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      /* Animate section header */
      gsap.fromTo(
        '.about .section-header',
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

      /* Animate skill nodes */
      ScrollTrigger.create({
        trigger: constellationRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => setAnimated(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about section">
      <div className="section-header">
        <span className="hud-label">01</span>
        <span className="hud-label--bracket">ABOUT</span>
      </div>

      <div className="about__grid">
        {/* Bio */}
        <div className="about__bio">
          <p className="about__bio-text">{PROFILE.bio}</p>

          <div className="about__details">
            <div className="about__detail-item">
              <span className="about__detail-label">Location</span>
              <span className="about__detail-value">{PROFILE.location}</span>
            </div>
            <div className="about__detail-item">
              <span className="about__detail-label">Status</span>
              <span className="about__detail-value about__detail-value--ember">{PROFILE.availability}</span>
            </div>
          </div>
        </div>

        {/* Skill Constellation */}
        <div className="about__constellation" ref={constellationRef}>
          <svg className="about__constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Connection lines */}
            {SKILL_CONNECTIONS.map(([from, to], i) => {
              const fromSkill = SKILLS.find((s) => s.name === from);
              const toSkill = SKILLS.find((s) => s.name === to);
              if (!fromSkill || !toSkill) return null;

              const isHighlighted =
                hoveredSkill && (hoveredSkill === from || hoveredSkill === to);

              return (
                <line
                  key={i}
                  className={`constellation__line ${animated ? 'constellation__line--visible' : ''} ${isHighlighted ? 'constellation__line--highlight' : ''}`}
                  x1={fromSkill.x}
                  y1={fromSkill.y}
                  x2={toSkill.x}
                  y2={toSkill.y}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                />
              );
            })}

            {/* Skill nodes */}
            {SKILLS.map((skill, i) => {
              const isHovered = hoveredSkill === skill.name;
              const isConnected =
                hoveredSkill &&
                SKILL_CONNECTIONS.some(
                  ([a, b]) =>
                    (a === hoveredSkill && b === skill.name) ||
                    (b === hoveredSkill && a === skill.name)
                );
              const dimmed = hoveredSkill && !isHovered && !isConnected;

              return (
                <g
                  key={skill.name}
                  className={`constellation__node ${animated ? 'constellation__node--visible' : ''} ${dimmed ? 'constellation__node--dimmed' : ''}`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Glow ring */}
                  {isHovered && (
                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={5}
                      fill="none"
                      stroke={CAT_COLORS[skill.category]}
                      strokeWidth="0.3"
                      opacity="0.4"
                      className="constellation__glow"
                    />
                  )}
                  <circle
                    cx={skill.x}
                    cy={skill.y}
                    r={isHovered ? 3 : 2}
                    fill={CAT_COLORS[skill.category]}
                    opacity={dimmed ? 0.2 : isHovered ? 1 : 0.7}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <text
                    x={skill.x}
                    y={skill.y - 4}
                    textAnchor="middle"
                    className={`constellation__label ${isHovered ? 'constellation__label--active' : ''}`}
                    fill={dimmed ? 'var(--ash-dark)' : 'var(--bone-dim)'}
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hovered skill tooltip */}
          {hoveredSkill && (
            <div className="constellation__tooltip">
              <span className="constellation__tooltip-name">{hoveredSkill}</span>
              <div className="constellation__tooltip-bar">
                <div
                  className="constellation__tooltip-fill"
                  style={{ width: `${SKILLS.find((s) => s.name === hoveredSkill)?.level || 0}%` }}
                />
              </div>
            </div>
          )}
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
