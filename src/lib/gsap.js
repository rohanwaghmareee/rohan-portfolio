import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// ---------------------------------------------------------------------------
// Central GSAP registration.
// Import { gsap, ScrollTrigger } from this module anywhere instead of "gsap"
// directly so plugins are guaranteed to be registered exactly once.
//
// ADJUSTING THE SCROLL TIMELINES
// ------------------------------
// Each sticky <section> owns a small scrubbed timeline (see
// components/overlay/HeroSection.jsx etc.). To retune a section:
//   1. Open the section component.
//   2. The timeline positions are fractions of that panel's own scroll range
//      (0 = panel pins at top of viewport, 1 = next panel takes over).
//   3. Change e.g. tl.to(el, { ... }, 0.35) -> a later start position, or add
//      a second `.to()` call to layer more animations.
// If you instead want ONE master timeline scrubbing the whole page, use the
// pattern in App.jsx (global ScrollTrigger + store.progress) and drive both
// the camera and the DOM from it.
// ---------------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export { gsap, ScrollTrigger, ScrollToPlugin }
