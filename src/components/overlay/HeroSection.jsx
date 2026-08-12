import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useScrollStore } from '../../store/scrollStore'
import { PROFILE } from '../../data/content'
import ScrollHint from '../ScrollHint'

// ---------------------------------------------------------------------------
// Section 1 — HERO.
//
// TIMELINE ARCHITECTURE
// ---------------------
//  * ENTRANCE: a one-shot timeline that plays after the preloader flips
//    `started` in the store. Big type rises out of its clipped masks,
//    meta lines fade in. Not scrubbed — it runs on its own clock.
//  * EXIT: a scrubbed timeline tied to THIS panel's own scroll range.
//    `trigger: panel` + `start: 'top top'` + `end: '+=100%'` means progress
//    0 = the panel pins at the top of the viewport, and progress 1 = the
//    next panel has slid over it (exactly one viewport of scroll).
//
// ADJUSTING
//    - Change durations/staggers in the entrance timeline.
//    - Move `tl.to(content, …, 0.55)` earlier/later to fade the hero out
//      sooner/later while scrolling.
// ---------------------------------------------------------------------------

export default function HeroSection() {
  const panel = useRef()
  const content = useRef()
  const started = useScrollStore((s) => s.started)

  // Entrance — plays once, gated by the preloader.
  useEffect(() => {
    if (!started) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(
        '[data-hero-line]',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.12 },
      )
        .fromTo(
          '[data-hero-meta]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 },
          '-=0.7',
        )
        .fromTo(
          '[data-scroll-hint]',
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.4',
        )
    }, panel)

    return () => ctx.revert()
  }, [started])

  // Exit — scrubbed to scroll. The whole hero content rises + fades as the
  // camera dollies away toward the project stage.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel.current, start: 'top top', end: '+=100%', scrub: true },
      })
      tl.to(content.current, { yPercent: -12, opacity: 0, ease: 'none' }, 0.55).to(
        '[data-scroll-hint]',
        { opacity: 0 },
        0.45,
      )
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="hero"
      className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-14"
    >
      <div ref={content} className="w-full">
        <p data-hero-meta className="mono-label mb-6 opacity-0">
          {PROFILE.name} — {PROFILE.role}
        </p>

        <h1 className="font-display text-display font-extrabold leading-[0.95] tracking-tightest text-bone">
          <span className="block overflow-hidden">
            <span data-hero-line className="block opacity-0">{PROFILE.firstName}</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="text-outline block opacity-0">{PROFILE.lastName}</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-signal opacity-0">/ {PROFILE.roleShort}</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p data-hero-meta className="max-w-md text-sm leading-relaxed text-ash opacity-0">
            {PROFILE.tagline}
          </p>
          <p data-hero-meta className="mono-label opacity-0">{PROFILE.location} ↓</p>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
