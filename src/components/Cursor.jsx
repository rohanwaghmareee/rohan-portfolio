import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Custom cursor: a crisp 4px dot + a trailing ring that lerps toward it.
// The ring expands into an accent "target" over any [data-hover] element,
// link or button. Disabled automatically on touch devices.
// ---------------------------------------------------------------------------

export default function Cursor() {
  const dot = useRef()
  const ring = useRef()

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.body.classList.add('has-cursor')
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) ring.current?.classList.add('is-active')
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) ring.current?.classList.remove('is-active')
    }

    // The ring chases the dot with a fixed-lerp factor → soft, weighted trail.
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </div>
  )
}
