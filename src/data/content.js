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
  /* Core — Top Center */
  { name: 'JavaScript', category: 'core', level: 95, x: 48, y: 32, labelY: -3.8 },
  { name: 'TypeScript', category: 'core', level: 85, x: 68, y: 20, labelY: -3.8 },
  { name: 'HTML/CSS', category: 'core', level: 95, x: 26, y: 24, labelY: -3.8 },

  /* Frontend — Right & Upper Right */
  { name: 'React', category: 'frontend', level: 90, x: 74, y: 40, labelY: -3.8 },
  { name: 'Three.js', category: 'frontend', level: 70, x: 88, y: 28, labelY: -3.8 },
  { name: 'Next.js', category: 'frontend', level: 80, x: 86, y: 56, labelY: 5.2 },
  { name: 'GSAP', category: 'frontend', level: 85, x: 68, y: 64, labelY: 5.2 },

  /* Game Dev — Far Left */
  { name: 'Unity', category: 'gamedev', level: 70, x: 12, y: 42, labelY: -3.8 },
  { name: 'C#', category: 'gamedev', level: 70, x: 10, y: 60, labelY: 5.2 },

  /* Backend — Mid & Lower Left */
  { name: 'Node.js', category: 'backend', level: 80, x: 32, y: 48, labelY: -3.8 },
  { name: 'Python', category: 'backend', level: 75, x: 22, y: 74, labelY: 5.2 },
  { name: 'MongoDB', category: 'backend', level: 75, x: 38, y: 84, labelY: 5.2 },

  /* Tools — Lower Center */
  { name: 'Figma', category: 'tools', level: 75, x: 46, y: 68, labelY: -3.8 },
  { name: 'Git', category: 'tools', level: 90, x: 58, y: 82, labelY: 5.2 },
];

export const SKILL_CONNECTIONS = [
  ['JavaScript', 'TypeScript'],
  ['JavaScript', 'React'],
  ['JavaScript', 'Node.js'],
  ['JavaScript', 'Three.js'],
  ['JavaScript', 'Git'],
  ['HTML/CSS', 'JavaScript'],
  ['HTML/CSS', 'React'],
  ['HTML/CSS', 'Figma'],
  ['React', 'Next.js'],
  ['React', 'GSAP'],
  ['TypeScript', 'React'],
  ['Three.js', 'GSAP'],
  ['Node.js', 'MongoDB'],
  ['Node.js', 'Python'],
  ['Node.js', 'Unity'],
  ['Unity', 'C#'],
  ['Figma', 'Git'],
  ['Git', 'GSAP'],
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
