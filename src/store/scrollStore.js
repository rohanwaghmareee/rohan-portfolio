import { create } from 'zustand'

// ---------------------------------------------------------------------------
// Shared scroll / interaction state.
//
// This single store is the bridge between the DOM world (GSAP ScrollTrigger)
// and the WebGL world (react-three-fiber). The scroll progress written here
// is read inside useFrame() by the CameraRig every frame, so the 3D camera
// stays perfectly in sync with the DOM sections — no prop-drilling, no
// re-renders, no tearing.
//
// progress : 0 → 1 across the entire page (6 × 100vh sticky panels).
// section  : derived active panel index (0 = hero, 1 = work, 2 = services,
//            3 = metrics, 4 = about, 5 = contact) used by the right-hand
//            section indicators.
// mouse    : normalized cursor position in [-1, 1] for parallax. The raw
//            value is damped inside the 3D scene for weight (see CameraRig).
// started  : flipped by the Preloader when the intro reveal may play.
// ---------------------------------------------------------------------------

const PANELS = 6

export const useScrollStore = create((set) => ({
  progress: 0,
  section: 0,
  mouse: { x: 0, y: 0 },
  started: false,

  setProgress: (progress) =>
    set({
      progress,
      section: Math.min(PANELS - 1, Math.floor(progress * PANELS)),
    }),

  setMouse: (mouse) => set({ mouse }),
  setStarted: () => set({ started: true }),
}))
