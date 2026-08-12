import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { METRICS, STACK } from '../../data/content'

// ---------------------------------------------------------------------------
// Section 3 — METRICS / STACK.
//
// Glassmorphism stat cards float in while the camera rises above the 3D
// rings. Numbers count up with GSAP's `innerText` + `snap` (driven by the
// scrubbed timeline, so they count as you scroll — not on a timer).
//
// ADJUSTING
//   - METRICS lives in src/data/content.js — change values/labels there.
//   - The counter tween starts at timeline position 0.35; move it earlier
//     to start counting sooner within the panel.
// ---------------------------------------------------------------------------

export default function MetricsSection() {
  const panel = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel.current, start: 'top top', end: '+=100%', scrub: true },
      })

      tl.fromTo(
        '[data-metric-card]',
        { y: 80, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, ease: 'none', stagger: 0.07 },
        0.05,
      )
        .fromTo(
          '[data-metric-value]',
          { innerText: 0 },
          {
            innerText: (i) => METRICS[i].value,
            snap: { innerText: 1 },
            duration: 0.45,
            ease: 'power1.inOut',
          },
          0.35,
        )
        .fromTo(
          '[data-stack-chip]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: 'none', stagger: 0.04 },
          0.55,
        )
        .to('[data-metrics-wrap]', { yPercent: -8, opacity: 0, ease: 'none' }, 0.8)
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="stack"
      className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-14"
    >
      <div data-metrics-wrap className="grid w-full gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left column — statement + stack chips */}
        <div className="lg:col-span-5">
          <p className="mono-label mb-4">Capabilities</p>
          <h2 className="font-display text-display-sm font-bold leading-[1.02] tracking-tightest text-bone">
            PRECISION
            <br />
            <span className="text-signal">ENGINEERED</span>
            <br />
            EXPERIENCES
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash">
            From GPU-driven shaders to buttery-smooth scroll choreography —
            every layer is measured, every frame accounted for.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {STACK.map((tool) => (
              <span
                key={tool}
                data-stack-chip
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-ash opacity-0"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              data-metric-card
              className={`glass rounded-2xl p-6 opacity-0 md:p-8 ${i % 2 ? 'md:mt-6' : ''}`}
            >
              <p className="font-display text-5xl font-extrabold text-bone md:text-6xl">
                <span data-metric-value>0</span>
                <span className="text-signal">{metric.suffix}</span>
              </p>
              <p className="mono-label mt-3">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
