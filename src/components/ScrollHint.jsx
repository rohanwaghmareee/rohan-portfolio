// ---------------------------------------------------------------------------
// "Scroll to explore" hint pinned to the bottom of the hero panel.
// The `data-scroll-hint` attribute is a hook for the hero's GSAP timelines
// (fades in on entrance, fades out as you scroll away).
// ---------------------------------------------------------------------------

export default function ScrollHint() {
  return (
    <div
      data-scroll-hint
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="mono-label">Scroll to explore</span>
      <span className="relative block h-10 w-px overflow-hidden bg-line">
        <span
          className="absolute left-0 top-0 h-3 w-full bg-signal"
          style={{ animation: 'scroll-hint 1.8s ease-in-out infinite' }}
        />
      </span>
    </div>
  )
}
