import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { PROFILE } from '../../data/content'

// ---------------------------------------------------------------------------
// Section 5 — ABOUT / JOURNEY.
// Big statement lines rise from their masks over the twisting 3D milestone
// stack (JourneyStage). A short bio sits beside a highlight list.
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
          0.55,
        )
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="about"
      className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-14"
    >
      <div className="w-full">
        <p data-about-meta className="mono-label mb-4 opacity-0">
          About — {PROFILE.name}
        </p>

        <h2 className="font-display text-display font-extrabold leading-[0.92] tracking-tightest text-bone">
          <span className="block overflow-hidden">
            <span data-about-line className="block opacity-0">CODE THAT</span>
          </span>
          <span className="block overflow-hidden">
            <span data-about-line className="text-outline block opacity-0">LOOKS SHARP</span>
          </span>
          <span className="block overflow-hidden">
            <span data-about-line className="block text-signal opacity-0">& SHIPS FAST</span>
          </span>
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <p
            data-about-meta
            className="max-w-lg text-sm leading-relaxed text-ash opacity-0 lg:col-span-7"
          >
            I'm Rohan — a full-stack developer who enjoys owning a product from
            the first React component to the last database migration. I care
            about fast, secure and genuinely polished software, and I spend
            equal energy on the frontend craft and the backend reliability that
            keeps it honest.
          </p>
          <ul className="space-y-3 lg:col-span-5">
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
