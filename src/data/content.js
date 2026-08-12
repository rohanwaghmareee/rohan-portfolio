// ---------------------------------------------------------------------------
// Content source of truth. Swap anything here and the whole site updates —
// the profile drives the hero, about and contact sections; PROJECTS drives
// the work grid; METRICS/STACK drive the stats panel.
// ---------------------------------------------------------------------------

export const PROFILE = {
  firstName: 'Rohan',
  lastName: 'Waghmare',
  name: 'ROHAN WAGHMARE',
  role: 'FULL-STACK DEVELOPER',
  roleShort: 'FULL-STACK',
  email: 'rohanwaghmare532@gmail.com',
  location: 'India — working worldwide',
  tagline:
    'Frontend & backend developer crafting fast, secure and immersive web experiences — from pixel-perfect UI to database-driven APIs.',
}

export const SOCIALS = [
  // TODO: swap in your real handles
  { label: 'GitHub', href: 'https://github.com/rohanwaghmare' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rohan-waghmare' },
  { label: 'Email', href: 'mailto:rohanwaghmare532@gmail.com' },
]

export const PROJECTS = [
  {
    id: 'scamshield',
    index: '01',
    title: 'SCAMSHIELD',
    category: 'SECURITY · PWA',
    year: '2025',
    tagline:
      'A real-time, private-by-design scam detector. Suspicious messages, links and emails are scored by a 30+ signal rule engine — entirely in the browser, with a plain-language 0–100 risk verdict.',
    accent: '#4D9DE0',
    grid: 'col-span-12 md:col-span-7',
    href: 'https://scamshield-detector.web.app/',
    tech: ['Next.js', 'TypeScript', 'Rule Engine', 'PWA', 'Firebase'],
  },
  {
    id: 'studybuddy',
    index: '02',
    title: 'STUDYBUDDY',
    category: 'FULL-STACK · SAAS',
    year: '2025',
    tagline:
      'A full-stack student platform with role-based dashboards, complaint management, real-time status tracking and email verification.',
    accent: '#C8FF3D',
    grid: 'col-span-12 md:col-span-5',
    href: 'https://studybuddy-ai-7695.web.app/',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth'],
  },
  {
    id: 'immerse',
    index: '03',
    title: 'IMMERSE — THIS SITE',
    category: 'WEBGL · EXPERIENCE',
    year: '2026',
    tagline:
      'This very portfolio: a scroll-scrubbed WebGL experience where the camera flies between six sections, powered by Three.js, react-three-fiber and GSAP.',
    accent: '#FF5C35',
    grid: 'col-span-12',
    href: '',
    tech: ['React', 'Three.js · R3F', 'GSAP', 'Tailwind'],
  },
]

export const METRICS = [
  { value: 30, suffix: '+', label: 'Rule-engine signals powering ScamShield' },
  { value: 3, suffix: '', label: 'Production apps, shipped & deployed live' },
  { value: 100, suffix: '%', label: 'Local-first analysis — zero data collected' },
  { value: 12, suffix: 'ms', label: 'Median API response on the student platform' },
]

export const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Prisma · PostgreSQL',
  'NextAuth',
  'REST APIs',
  'Tailwind CSS',
  'Three.js · R3F',
  'GSAP ScrollTrigger',
  'PWA · Service Workers',
  'Firebase Hosting',
]
