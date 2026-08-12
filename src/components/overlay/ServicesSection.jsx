import { useEffect, useRef } from 'react'
import { MonitorSmartphone, Database, Check } from 'lucide-react'
import { gsap } from '../../lib/gsap'

// ---------------------------------------------------------------------------
// Section 3 — SERVICES (FRONTEND / BACKEND).
// The camera flies past the two 3D "towers" (CapabilityStage) while these
// capability cards stagger in. One card is the frontend face, the other the
// backend core — mirroring the towers in the scene.
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    icon: MonitorSmartphone,
    title: 'FRONTEND',
    accent: '#C8FF3D',
    points: [
      'React / Next.js interfaces',
      'Tailwind CSS design systems',
      'WebGL · Three.js · motion',
      'PWA & performance tuning',
    ],
  },
  {
    icon: Database,
    title: 'BACKEND',
    accent: '#FF5C35',
    points: [
      'Node.js / Next.js API routes',
      'Prisma · PostgreSQL data models',
      'Auth with NextAuth & JWT',
      'Validation, security & REST',
    ],
  },
]

export default function ServicesSection() {
  const panel = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel.current, start: 'top top', end: '+=100%', scrub: true },
      })
      tl.fromTo(
        '[data-services-label]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'none' },
        0.02,
      )
        .fromTo(
          '[data-service-card]',
          { y: 80, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, ease: 'none', stagger: 0.08 },
          0.1,
        )
        .to('[data-services-wrap]', { yPercent: -8, opacity: 0, ease: 'none' }, 0.8)
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="services"
      className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-14"
    >
      <div data-services-wrap className="grid w-full gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left — statement */}
        <div className="lg:col-span-5">
          <p data-services-label className="mono-label mb-4 opacity-0">
            What I do
          </p>
          <h2
            data-services-label
            className="font-display text-display-sm font-bold leading-[1.02] tracking-tightest text-bone opacity-0"
          >
            FRONTEND
            <br />
            <span className="text-outline">TO</span>
            <br />
            <span className="text-signal">BACKEND</span>
          </h2>
          <p data-services-label className="mt-6 max-w-sm text-sm leading-relaxed text-ash opacity-0">
            I design, build and ship the whole stack — owning the interface on
            the way down and the database on the way back up.
          </p>
        </div>

        {/* Right — capability cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              data-service-card
              className={`glass rounded-2xl p-6 opacity-0 md:p-8 ${i % 2 ? 'md:mt-6' : ''}`}
            >
              <div
                className="mb-5 grid h-11 w-11 place-items-center rounded-xl border"
                style={{ borderColor: 'rgba(244,242,236,0.12)' }}
              >
                <service.icon className="h-5 w-5" style={{ color: service.accent }} />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-bone">
                {service.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-ash">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      style={{ color: service.accent }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
