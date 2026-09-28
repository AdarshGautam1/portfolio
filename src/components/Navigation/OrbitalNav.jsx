/* ============================================
   Navigation — Floating orbital nav
   ============================================ */
import { useState, useEffect } from 'react';
import './OrbitalNav.css';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', num: '00' },
  { id: 'about', label: 'About', num: '01' },
  { id: 'projects', label: 'Projects', num: '02' },
  { id: 'experience', label: 'Journey', num: '03' },
  { id: 'contact', label: 'Contact', num: '04' },
];

export default function OrbitalNav() {
  const [active, setActive] = useState('hero');
  const [hidden, setHidden] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);

      /* show nav after scrolling past hero */
      setHidden(scrollY < 200);

      /* detect active section */
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0 };
        return { id: item.id, top: el.offsetTop - 300 };
      });

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollY >= sections[i].top) {
          setActive(sections[i].id);
          break;
        }
      }

      lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`orbital-nav ${hidden ? 'orbital-nav--hidden' : ''}`}>
      {/* Progress bar */}
      <div className="orbital-nav__progress">
        <div
          className="orbital-nav__progress-fill"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      <ul className="orbital-nav__list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id} className="orbital-nav__item">
            <button
              className={`orbital-nav__link ${active === item.id ? 'orbital-nav__link--active' : ''}`}
              onClick={() => scrollTo(item.id)}
              data-magnetic
            >
              <span className="orbital-nav__num">{item.num}</span>
              <span className="orbital-nav__label">{item.label}</span>
              <span className="orbital-nav__dot" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
