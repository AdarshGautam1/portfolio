/* ============================================
   SpaceBackground — Atmospheric Deep-Space Nebula & Particle Web
   ============================================ */
import { useEffect, useRef } from 'react';
import './SpaceBackground.css';

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star count
    const numStars = Math.min(Math.floor((width * height) / 14000), 85);

    // Initialize stars with depth layers
    const stars = Array.from({ length: numStars }, () => {
      const depth = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        vx: (Math.random() - 0.5) * 0.35 * depth,
        vy: (Math.random() - 0.5) * 0.35 * depth,
        radius: (Math.random() * 1.5 + 0.6) * depth,
        alpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        isEmber: Math.random() < 0.35, // 35% ember colored, 65% starlight white
      };
    });

    // Shooting star manager
    let shootingStar = null;
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      const startX = Math.random() * (width * 0.75);
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // ~45 deg downward
      const speed = Math.random() * 10 + 12;
      const length = Math.random() * 120 + 80;

      shootingStar = {
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 1.0,
        decay: Math.random() * 0.025 + 0.018,
      };
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Check shooting star trigger (every 5-9 seconds)
      const now = Date.now();
      if (!shootingStar && now - lastShootingStarTime > 5500 + Math.random() * 3500) {
        spawnShootingStar();
        lastShootingStarTime = now;
      }

      // Draw and update shooting star if active
      if (shootingStar) {
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.life -= shootingStar.decay;

        if (
          shootingStar.life <= 0 ||
          shootingStar.x > width + 200 ||
          shootingStar.y > height + 200
        ) {
          shootingStar = null;
        } else {
          const tailX = shootingStar.x - shootingStar.dx * (shootingStar.length / 18);
          const tailY = shootingStar.y - shootingStar.dy * (shootingStar.length / 18);

          const grad = ctx.createLinearGradient(
            tailX,
            tailY,
            shootingStar.x,
            shootingStar.y
          );
          grad.addColorStop(0, 'rgba(232, 101, 43, 0)');
          grad.addColorStop(0.7, `rgba(255, 140, 66, ${shootingStar.life * 0.6})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.life * 0.95})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Head glow
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.life})`;
          ctx.fill();
        }
      }

      const mouse = mouseRef.current;
      const connectionDist = 110;
      const mouseInfluenceDist = 140;

      // Update positions & draw connection filaments
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Subtle mouse reaction
        const dxMouse = star.x - mouse.x;
        const dyMouse = star.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseInfluenceDist) {
          const force = (1 - distMouse / mouseInfluenceDist) * 0.08;
          star.x += dxMouse * force;
          star.y += dyMouse * force;

          // Mouse connection line
          const mouseAlpha = (1 - distMouse / mouseInfluenceDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(232, 101, 43, ${mouseAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Inter-star constellation lines
        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          const dx = star.x - star2.x;
          const dy = star.y - star2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.strokeStyle = star.isEmber || star2.isEmber
              ? `rgba(232, 101, 43, ${lineAlpha})`
              : `rgba(200, 210, 225, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw the star particle
        const currentAlpha =
          star.alpha + Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.18;
        const clampedAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (star.isEmber) {
          ctx.fillStyle = `rgba(255, 140, 66, ${clampedAlpha})`;
          ctx.shadowColor = 'rgba(232, 101, 43, 0.6)';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = `rgba(230, 235, 245, ${clampedAlpha})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.shadowBlur = 2;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="space-bg" aria-hidden="true">
      {/* Dynamic Ambient Nebula Clouds */}
      <div className="space-bg__nebula space-bg__nebula--ember" />
      <div className="space-bg__nebula space-bg__nebula--violet" />
      <div className="space-bg__nebula space-bg__nebula--cyan" />
      <div className="space-bg__nebula space-bg__nebula--core" />

      {/* Cybernetic Subtle Perspective Coordinate Grid */}
      <div className="space-bg__grid" />

      {/* Atmospheric Radial Vignette */}
      <div className="space-bg__vignette" />

      {/* HTML5 Particle & Constellation Canvas */}
      <canvas ref={canvasRef} className="space-bg__canvas" />
    </div>
  );
}
