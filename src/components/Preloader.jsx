import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useScrollStore } from '../store/scrollStore'

// ---------------------------------------------------------------------------
// Minimalist preloader. Counts 0→100, fills a hairline bar, then wipes the
// overlay up and reveals the experience. Scroll is locked until it finishes.
//
// If you hook up a real GLTF model, drei's useProgress() already reports the
// model/loader progress — merge it here so the counter reflects actual asset
// loading instead of the simulated countdown, e.g.:
//
//   const { progress } = useProgress()          // 0..100, updates as assets load
//   const target = progress || counter.v         // simulated until real data arrives
// ---------------------------------------------------------------------------

export default function Preloader({ onFinish }) {
  const root = useRef()
  const bar = useRef()
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        useScrollStore.getState().setStarted() // release the hero entrance
        onFinish()                              // unmount the preloader
      },
    })

    tl.to(counter, {
      v: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.v)),
    })
      .to(bar.current, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(root.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        delay: 0.15,
      })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onFinish])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <p className="mono-label">Loading experience</p>

      <div className="mt-8 flex items-baseline gap-2">
        <span className="font-display text-7xl font-extrabold tabular-nums text-bone">
          {count}
        </span>
        <span className="font-mono text-sm text-ash">%</span>
      </div>

      <div className="mt-8 h-px w-56 overflow-hidden bg-line">
        <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-signal" />
      </div>
    </div>
  )
}
