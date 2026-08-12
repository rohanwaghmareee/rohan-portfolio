import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { PROFILE, SOCIALS } from '../../data/content'

// ---------------------------------------------------------------------------
// Section 6 — CONTACT. Final CTA panel over the pulsing 3D ring
// (ContactStage). Big type, an email CTA and the social links.
// ---------------------------------------------------------------------------

export default function ContactSection() {
  const panel = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel.current, start: 'top top', end: '+=100%', scrub: true },
      })
      tl.fromTo(
        '[data-contact-line]',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: 'none', stagger: 0.1 },
        0.05,
      )
        .fromTo(
          '[data-contact-meta]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'none', stagger: 0.06 },
          0.55,
        )
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="contact"
      className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-28 md:px-14"
    >
      <div>
        <p data-contact-meta className="mono-label mb-6 opacity-0">
          Contact — available for work
        </p>

        <h2 className="font-display text-display font-extrabold leading-[0.92] tracking-tightest text-bone">
          <span className="block overflow-hidden">
            <span data-contact-line className="block opacity-0">LET'S BUILD</span>
          </span>
          <span className="block overflow-hidden">
            <span data-contact-line className="text-outline block opacity-0">SOMETHING</span>
          </span>
          <span className="block overflow-hidden">
            <span data-contact-line className="block text-signal opacity-0">REMARKABLE.</span>
          </span>
        </h2>

        <p data-contact-meta className="mt-8 max-w-lg text-sm leading-relaxed text-ash opacity-0">
          Have a project, a team opening, or just an idea worth exploring?
          I'm based in {PROFILE.location} and love a good challenge.
        </p>

        <a
          data-contact-meta
          href={`mailto:${PROFILE.email}`}
          className="mono-label pointer-events-auto mt-8 inline-flex items-center gap-2 border border-line px-5 py-3 text-bone opacity-0 transition-colors hover:border-signal hover:text-signal"
          data-hover
        >
          {PROFILE.email} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <footer className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
        <p className="mono-label">
          © 2026 {PROFILE.name} — Frontend + Backend Developer
        </p>
        <div className="flex gap-6">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              data-contact-meta
              data-hover
              className="mono-label pointer-events-auto opacity-0 transition-colors hover:text-signal"
            >
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  )
}
