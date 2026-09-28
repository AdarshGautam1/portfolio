/* ============================================
   Portfolio Content Data
   ============================================ */

export const PROFILE = {
  name: 'Adarsh',
  role: 'Web Developer',
  tagline: 'Build. Learn. Create. Repeat.',
  bio: `I craft digital experiences that live at the intersection of design and engineering. From interactive web applications to immersive game worlds, I'm always exploring the edge of what's possible — driven by curiosity and fueled by code.`,
  photo: '/images/hero-photo.jpg',
  email: 'hello@adarsh.dev',
  location: 'India',
  availability: 'Open to opportunities',
};

export const SKILLS = [
  /* Core */
  { name: 'JavaScript', category: 'core', level: 95, x: 50, y: 30 },
  { name: 'TypeScript', category: 'core', level: 85, x: 60, y: 25 },
  { name: 'HTML/CSS', category: 'core', level: 95, x: 40, y: 35 },

  /* Frontend */
  { name: 'React', category: 'frontend', level: 90, x: 70, y: 40 },
  { name: 'Next.js', category: 'frontend', level: 80, x: 75, y: 50 },
  { name: 'Three.js', category: 'frontend', level: 70, x: 80, y: 35 },
  { name: 'GSAP', category: 'frontend', level: 85, x: 65, y: 55 },

  /* Backend */
  { name: 'Node.js', category: 'backend', level: 80, x: 30, y: 50 },
  { name: 'Python', category: 'backend', level: 75, x: 25, y: 60 },
  { name: 'MongoDB', category: 'backend', level: 75, x: 35, y: 65 },

  /* Game Dev */
  { name: 'Unity', category: 'gamedev', level: 70, x: 20, y: 40 },
  { name: 'C#', category: 'gamedev', level: 70, x: 15, y: 50 },

  /* Tools */
  { name: 'Git', category: 'tools', level: 90, x: 55, y: 70 },
  { name: 'Figma', category: 'tools', level: 75, x: 45, y: 75 },
];

export const SKILL_CONNECTIONS = [
  ['JavaScript', 'TypeScript'],
  ['JavaScript', 'React'],
  ['JavaScript', 'Node.js'],
  ['JavaScript', 'Three.js'],
  ['React', 'Next.js'],
  ['React', 'GSAP'],
  ['TypeScript', 'React'],
  ['HTML/CSS', 'JavaScript'],
  ['HTML/CSS', 'React'],
  ['Node.js', 'MongoDB'],
  ['Node.js', 'Python'],
  ['Unity', 'C#'],
  ['Three.js', 'GSAP'],
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    description: 'A real-time analytics dashboard with dynamic data visualizations, dark-themed UI, and WebSocket-driven live updates. Built for monitoring complex systems at scale.',
    tech: ['React', 'D3.js', 'WebSocket', 'Node.js'],
    image: null, /* will be generated */
    liveUrl: '#',
    codeUrl: '#',
    year: '2024',
  },
  {
    id: 2,
    title: 'Voxel Engine',
    description: 'A browser-based voxel rendering engine with procedural terrain generation, custom shaders, and real-time lighting. Pushing the limits of WebGL performance.',
    tech: ['Three.js', 'WebGL', 'GLSL', 'JavaScript'],
    image: null,
    liveUrl: '#',
    codeUrl: '#',
    year: '2024',
  },
  {
    id: 3,
    title: 'Drift — Chat Platform',
    description: 'An end-to-end encrypted messaging platform with voice channels, file sharing, and a custom emoji system. Focused on privacy without sacrificing UX.',
    tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    image: null,
    liveUrl: '#',
    codeUrl: '#',
    year: '2023',
  },
  {
    id: 4,
    title: 'Synthwave Portfolio',
    description: 'An earlier iteration of my portfolio featuring retro-futuristic aesthetics, CRT shader effects, and a custom audio-reactive background visualization.',
    tech: ['HTML/CSS', 'Canvas API', 'Web Audio', 'GSAP'],
    image: null,
    liveUrl: '#',
    codeUrl: '#',
    year: '2023',
  },
];

export const EXPERIENCE = [
  {
    year: '2024',
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    description: 'Building custom web solutions for clients — from landing pages to full-stack applications. Focus on performance, animation, and memorable user experiences.',
  },
  {
    year: '2023',
    role: 'Frontend Developer',
    company: 'Creative Studio',
    description: 'Developed interactive web experiences for brands. Specialized in animation-heavy sites using GSAP and Three.js.',
  },
  {
    year: '2022',
    role: 'Learning & Building',
    company: 'Self-taught',
    description: 'Deep-dived into web development, game development, and creative coding. Built dozens of projects to sharpen skills.',
  },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { name: 'Email', url: 'mailto:hello@adarsh.dev', icon: 'email' },
];
