import { useScrollStore } from '../store/scrollStore'
import { gsap } from '../lib/gsap'

// ---------------------------------------------------------------------------
// Right-hand active-section indicator. Reads `section` straight from the
// zustand store (updated by the global ScrollTrigger in App.jsx), so the dots
// always stay in sync with both the DOM panels and the 3D camera.
// Clicking a dot scrubs smoothly to that panel.
// ---------------------------------------------------------------------------

const SECTIONS = ['01 HERO', '02 WORK', '03 SERVICES', '04 STACK', '05 ABOUT', '06 CONTACT']

const jumpTo = (index) => {
  gsap.to(window, {
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTo: { y: index * window.innerHeight, autoKill: false },
  })
}

export default function SectionIndicators() {
  const section = useScrollStore((s) => s.section)

  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex">
      {SECTIONS.map((label, i) => {
        const active = section === i
        return (
          <button
            key={label}
            onClick={() => jumpTo(i)}
            className="group flex items-center gap-3"
            data-hover
          >
            <span
              className={`font-mono text-[9px] uppercase tracking-widest2 transition-all duration-300 ${
                active ? 'text-bone opacity-100' : 'text-ash opacity-0 group-hover:opacity-60'
              }`}
            >
              {label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                active ? 'w-10 bg-signal' : 'w-4 bg-line group-hover:bg-ash'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
