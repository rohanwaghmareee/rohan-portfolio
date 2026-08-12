import { useEffect, useRef } from 'react'
import { Sparkles, GraduationCap, MapPin, Mail, Github } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { PROFILE, EDUCATION, SOCIALS } from '../../data/content'

// ---------------------------------------------------------------------------
// Section 5 — ABOUT / JOURNEY.
// Big statement lines rise from their masks, then a bio, an education card
// (college / degree / timeline) and a highlight list fade in over the 3D
// milestone stack (JourneyStage).
//
// Edit the education fields in src/data/content.js (EDUCATION) — they render
// here automatically.
// ---------------------------------------------------------------------------

const HIGHLIGHTS = [
  'Own the full lifecycle: UI → API → database → deploy',
  'Private-by-design thinking — build trust into products',
  'Motion & 3D polish on top of solid engineering',
  'Deployed production apps on Next.js + Firebase/Vercel',
]

export default function AboutSection() {
  const panel = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel.current, start: 'top top', end: '+=100%', scrub: true },
      })
      tl.fromTo(
        '[data-about-line]',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: 'none', stagger: 0.1 },
        0.05,
      )
        .fromTo(
          '[data-about-meta]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: 'none', stagger: 0.08 },
          0.5,
        )
        .fromTo(
          '[data-about-card]',
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0.5,
        )
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="about"
      className="sticky top-0 flex h-screen items-center overflow-hidden px-6 pt-20 md:px-14"
    >
      <div className="w-full">
        <p data-about-meta className="mono-label mb-4 opacity-0">
          About — {PROFILE.name}
        </p>

        <h2 className="font-display text-display-sm font-extrabold leading-[1.15] tracking-tightest text-bone">
          <span className="block overflow-hidden py-1">
            <span data-about-line className="block opacity-0">CODE THAT</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span data-about-line className="text-outline block opacity-0">LOOKS SHARP</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span data-about-line className="block text-signal opacity-0">& SHIPS FAST</span>
          </span>
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Bio + contact meta */}
          <div className="lg:col-span-4">
            <p data-about-meta className="text-sm leading-relaxed text-ash opacity-0">
              I'm Rohan — a full-stack developer who enjoys owning a product
              from the first React component to the last database migration. I
              care about fast, secure and genuinely polished software, and I
              spend equal energy on the frontend craft and the backend
              reliability that keeps it honest.
            </p>
            <div data-about-meta className="mt-5 space-y-2 opacity-0">
              <p className="mono-label flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-signal" /> {PROFILE.location}
              </p>
              <p className="mono-label flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-signal" /> {PROFILE.email}
              </p>
              <a
                href={SOCIALS[0].href}
                target="_blank"
                rel="noreferrer"
                className="mono-label pointer-events-auto flex items-center gap-2 transition-colors hover:text-signal"
                data-hover
              >
                <Github className="h-3.5 w-3.5 text-signal" /> @rohanwaghmareee
              </a>
            </div>
          </div>

          {/* Education card */}
          <div data-about-card className="glass rounded-2xl p-6 opacity-0 lg:col-span-4">
            <p className="mono-label mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-signal" /> Education
            </p>
            <h3 className="font-display text-lg font-bold leading-tight text-bone">
              {EDUCATION.college}
            </h3>
            <p className="mono-label mt-2">{EDUCATION.degree}</p>
            <p className="mono-label mt-1 text-signal">{EDUCATION.period}</p>
            <p className="mt-4 text-sm leading-relaxed text-ash">{EDUCATION.note}</p>
          </div>

          {/* Highlights */}
          <ul className="space-y-2.5 lg:col-span-4">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                data-about-meta
                className="flex items-start gap-2.5 text-sm text-ash opacity-0"
              >
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}