import { gsap } from '../lib/gsap'

// ---------------------------------------------------------------------------
// Minimal fixed navbar. Logo (jump to top) + anchor links + CTA.
// Jumping uses GSAP ScrollToPlugin with power3 easing instead of native
// anchors, so the camera continues to follow the scroll-driven timeline.
// ---------------------------------------------------------------------------

const LINKS = [
  { label: 'WORK', index: 1 },
  { label: 'SERVICES', index: 2 },
  { label: 'STACK', index: 3 },
  { label: 'CONTACT', index: 5 },
]

const jumpTo = (index) => {
  gsap.to(window, {
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTo: { y: index * window.innerHeight, autoKill: false },
  })
}

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      {/* Logo */}
      <button onClick={() => jumpTo(0)} className="flex items-center gap-3" data-hover>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </span>
      <span className="font-display text-sm font-bold tracking-widest text-bone">
        RW<span className="text-signal">.</span>
      </span>
      </button>

      {/* Anchor links */}
      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => jumpTo(link.index)}
            className="mono-label transition-colors hover:text-bone"
            data-hover
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="mailto:rohanwaghmare532@gmail.com"
        className="mono-label hidden border border-line px-4 py-2 transition-colors hover:border-signal hover:text-signal sm:block"
        data-hover
      >
        LET'S TALK
      </a>
    </header>
  )
}
