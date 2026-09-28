/* ============================================
   Ember Cursor — Custom cursor with particle trail
   ============================================ */
import { useEffect, useRef, useCallback } from 'react';

export default function EmberCursor() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const particles = useRef([]);
  const isHovering = useRef(false);
  const rafId = useRef(null);

  const createParticle = useCallback((x, y) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 + 1,
      life: 1,
      decay: 0.02 + Math.random() * 0.03,
      size: 1 + Math.random() * 2,
      hue: 20 + Math.random() * 20,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      /* spawn particles on movement */
      if (Math.random() > 0.5) {
        particles.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    const onMouseDown = () => {
      /* burst of particles on click */
      for (let i = 0; i < 12; i++) {
        const p = createParticle(mouse.current.x, mouse.current.y);
        p.vx = (Math.random() - 0.5) * 6;
        p.vy = (Math.random() - 0.5) * 6;
        p.size = 2 + Math.random() * 3;
        particles.current.push(p);
      }
    };

    /* detect hoverable elements */
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-magnetic], .hoverable');
      isHovering.current = !!target;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseover', onMouseOver);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      /* lerp cursor position */
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      /* update & draw particles */
      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; /* gravity */
        p.life -= p.decay;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 55%, ${p.life * 0.6})`;
        ctx.fill();
        return true;
      });

      /* draw main cursor */
      const cursorEl = cursorRef.current;
      const dotEl = cursorDotRef.current;
      if (cursorEl && dotEl) {
        const size = isHovering.current ? 48 : 16;
        cursorEl.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
        cursorEl.style.width = `${size}px`;
        cursorEl.style.height = `${size}px`;
        cursorEl.style.opacity = isHovering.current ? '1' : '0.6';
        cursorEl.style.borderColor = isHovering.current
          ? 'rgba(232,101,43,0.8)'
          : 'rgba(232,101,43,0.4)';

        dotEl.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [createParticle]);

  /* don't render on touch devices */
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10001,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          border: '1.5px solid rgba(232,101,43,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10002,
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, border-color 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: '#E8652B',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10003,
        }}
      />
    </>
  );
}
