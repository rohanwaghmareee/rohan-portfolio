/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core minimalist palette -------------------------------------------------
        // ink        : deep charcoal background (the 3D canvas + page backdrop)
        // coal       : slightly lifted panel surface for glass cards
        // bone       : stark off-white for typography
        // signal     : industrial acid-lime accent (glows, active states, 3D rings)
        // ash        : muted grey for secondary text / meta labels
        // line       : faint hairline used on borders and dividers
        ink: '#0A0A0B',
        coal: '#141417',
        bone: '#F4F2EC',
        signal: '#C8FF3D',
        ash: '#8B8B93',
        line: 'rgba(244,242,236,0.12)',
      },
      fontFamily: {
        // Syne = wide industrial editorial display · Space Grotesk = body
        // Space Mono = technical meta / labels
        display: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        // Fluid, viewport-relative display sizes so the hero scales gracefully
        display: 'clamp(3rem, 11vw, 10.5rem)',
        'display-sm': 'clamp(2.25rem, 7vw, 6rem)',
      },
      letterSpacing: {
        tightest: '-0.05em',
        widest2: '0.35em',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(200,255,61,0.45)',
      },
    },
  },
  plugins: [],
}
