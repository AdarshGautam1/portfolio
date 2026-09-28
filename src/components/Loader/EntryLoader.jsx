/* ============================================
   Entry Loader — Cinematic "A" trace animation
   ============================================ */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function EntryLoader({ onComplete }) {
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [loadingText, setLoadingText] = useState('INITIALIZING');

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        /* wipe away the loader */
        gsap.to(containerRef.current, {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    /* step 1: draw the A logo path */
    const paths = svgRef.current?.querySelectorAll('path');
    if (paths) {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        stagger: 0.3,
      });
    }

    /* step 2: pulse the logo */
    tl.to(svgRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    }).to(svgRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    });

    /* step 3: flicker the text */
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.1,
    }, '-=0.5')
      .to(textRef.current, { opacity: 0, duration: 0.05 })
      .to(textRef.current, { opacity: 1, duration: 0.05 })
      .to(textRef.current, { opacity: 0, duration: 0.05 })
      .to(textRef.current, { opacity: 0.7, duration: 0.1 });

    /* Update text during load */
    const textSteps = ['INITIALIZING', 'LOADING ASSETS', 'BUILDING UNIVERSE', 'READY'];
    let step = 0;
    const textInterval = setInterval(() => {
      step++;
      if (step < textSteps.length) {
        setLoadingText(textSteps[step]);
      } else {
        clearInterval(textInterval);
      }
    }, 600);

    return () => {
      tl.kill();
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loader" style={{ clipPath: 'circle(100% at 50% 50%)' }}>
      <svg
        ref={svgRef}
        className="loader__logo"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 4L56 56H40L36 46H28L24 56H8L32 4Z"
          stroke="#E8652B"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M26 38h12L32 20 26 38Z"
          stroke="#E8652B"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <span ref={textRef} className="loader__text" style={{ opacity: 0 }}>
        {loadingText}...
      </span>
    </div>
  );
}
