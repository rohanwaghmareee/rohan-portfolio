import { useEffect, useState } from 'react'
import Experience from './components/three/Experience'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import SectionIndicators from './components/SectionIndicators'
import HeroSection from './components/overlay/HeroSection'
import ProjectsSection from './components/overlay/ProjectsSection'
import ServicesSection from './components/overlay/ServicesSection'
import MetricsSection from './components/overlay/MetricsSection'
import AboutSection from './components/overlay/AboutSection'
import ContactSection from './components/overlay/ContactSection'
import { ScrollTrigger } from './lib/gsap'
import { useScrollStore } from './store/scrollStore'

// ---------------------------------------------------------------------------
// App — orchestration layer.
//
// LAYOUT STACK
//   z-0   <Experience />   fixed full-screen WebGL canvas (Three.js)
//   z-10  <main>           four sticky 100vh panels (DOM overlay). The main
//                          is `pointer-events-none`; interactive pieces opt
//                          back in with `pointer-events-auto`.
//   z-50  nav / indicators / cursor / preloader (on top)
//
// SCROLL ARCHITECTURE
//   `#scroll-root` (this <main>) is 700vh tall = 6 sticky panels + a trailing
//   spacer. A single global ScrollTrigger maps that range to `progress` 0→1
//   in the zustand store. The 3D camera (CameraRig) reads `progress` every
//   frame, so scroll = scrubbing the camera. The DOM panels run their own
//   per-panel scrubbed timelines (see HeroSection.jsx).
//
//   If you'd rather drive EVERYTHING from ONE master timeline, add the
//   per-panel tweens to this ScrollTrigger instead of inside the sections —
//   use the fractional positions like `tl.to('.card', {...}, 0.3)`.
// ---------------------------------------------------------------------------

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Global scroll → store.progress bridge. Only active once the preloader
  // has finished so the user always starts at the exact top of the story.
  useEffect(() => {
    if (!loaded) return

    const st = ScrollTrigger.create({
      trigger: '#scroll-root',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => useScrollStore.getState().setProgress(self.progress),
    })

    return () => st.kill()
  }, [loaded])

  // Normalized mouse → store, read by the 3D camera + sculpture for parallax.
  useEffect(() => {
    const onMove = (e) => {
      useScrollStore.getState().setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <SectionIndicators />

      {/* Preloader sits on top until the reveal; the canvas keeps loading
          its assets in the background behind it. */}
      {!loaded && <Preloader onFinish={() => setLoaded(true)} />}

      <Experience />

      <main id="scroll-root" className="pointer-events-none relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <MetricsSection />
        <AboutSection />
        <ContactSection />
        {/* Trailing spacer gives the last panel room to pin and settle. */}
        <div className="h-screen" aria-hidden="true" />
      </main>
    </>
  )
}
