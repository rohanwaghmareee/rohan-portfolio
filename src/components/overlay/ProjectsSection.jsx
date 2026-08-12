import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { PROJECTS } from '../../data/content'

// ---------------------------------------------------------------------------
// Section 2 — SELECTED WORK.
//
// Scrubbed timeline for this panel only (see HeroSection for the exact
// trigger math). Project cards stagger up out of their glass panels while
// the 3D camera dollies past the matching floating slabs in the scene.
//
// Cards render straight from PROJECTS in src/data/content.js — add your own
// project (with a live URL in `href`) and it appears here automatically.
//
// ADJUSTING
//   - Change stagger (0.06 → 0.12) to make cards cascade slower.
//   - Cards enter during timeline positions 0.1–0.5; move the numbers to
//     sync card reveals with the camera path in CameraRig.jsx WAYPOINTS[1].
// ---------------------------------------------------------------------------

export default function ProjectsSection() {
  const panel = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel.current, start: 'top top', end: '+=100%', scrub: true },
      })
      tl.fromTo(
        '[data-project-label]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'none' },
        0.02,
      )
        .fromTo(
          '[data-project-card]',
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.06 },
          0.1,
        )
        .to('[data-project-wrap]', { yPercent: -8, opacity: 0, ease: 'none' }, 0.78)
    }, panel)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={panel}
      id="work"
      className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-14"
    >
      <div data-project-wrap className="w-full">
        <div data-project-label className="mb-8 flex items-end justify-between opacity-0">
          <h2 className="font-display text-display-sm font-bold tracking-tightest text-bone">
            SELECTED <span className="text-outline">WORK</span>
          </h2>
          <p className="mono-label hidden sm:block">Live projects — open the case</p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {PROJECTS.map((project) => {
            const inner = (
              <>
                <div className="flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl font-bold text-outline transition-colors duration-300 group-hover:text-bone">
                      {project.index}
                    </span>
                    <span className="mono-label">{project.year}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-bone">
                      {project.title}
                    </h3>
                    <p className="mono-label mt-1">{project.category}</p>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ash">
                      {project.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest2 text-ash"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-bone">
                      {project.href ? 'OPEN CASE' : 'EXPLORING LIVE'}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* accent hairline that wakes up on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: project.accent }}
                />
              </>
            )

            const cardClass = `glass pointer-events-auto group relative col-span-12 overflow-hidden rounded-2xl p-6 opacity-0 transition-shadow duration-300 hover:shadow-glow md:p-8 ${project.grid}`

            return project.href ? (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                data-project-card
                data-hover
                className={cardClass}
              >
                {inner}
              </a>
            ) : (
              <article
                key={project.id}
                data-project-card
                data-hover
                className={cardClass}
              >
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
