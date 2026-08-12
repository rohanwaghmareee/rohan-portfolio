import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '../../store/scrollStore'

// ---------------------------------------------------------------------------
// Cinematic camera controller.
//
// The camera travels along a Catmull-Rom curve whose parameter is the GLOBAL
// scroll progress (0 → 1). Because the DOM panels are 100vh each, progress
// is perfectly aligned with panel boundaries (see scrollStore).
//
// ADJUSTING CAMERA MOVES
// ----------------------
// WAYPOINTS = [pos (camera), t (look-at)]. A curve through 7 keyframes mapped
// to the 6 sticky panels (progress: 0, .167, .333, .5, .667, .833, 1):
//   0.0   hero       → straight-on, sculpture centre
//   0.167 work       → dolly right, low, looking back at the project stage
//   0.333 services   → dolly left & high, across the dual towers
//   0.5   metrics    → push up, looking down onto the rings
//   0.667 about      → drift right, level, past the milestone stack
//   0.833 contact    → pull back centre for the final CTA
//   1.0   outtro     → settle even further back
// Change an entry and the whole motion re-smooths itself — the curve type is
// 'centripetal' which avoids overshoot/loops between keyframes.
//
// WEIGHT: every value (position, target AND mouse) is damped with
// THREE.MathUtils.damp — this is the "premium, fluid, heavy" feel. Lower the
// lambda (3.0 → 1.5) for floatier motion, raise it for snappier response.
// ---------------------------------------------------------------------------

const WAYPOINTS = [
  { p: [0, 0.9, 8.0], t: [0, 0, 0] },
  { p: [3.4, 1.2, 6.6], t: [-0.4, 0.1, 0] },
  { p: [-4.4, 2.0, 5.4], t: [0.6, 0.2, -0.6] },
  { p: [0, 2.5, 4.0], t: [0, 0.05, 0] },
  { p: [2.8, 1.4, 6.2], t: [-0.6, 0, -0.4] },
  { p: [0, 0.9, 8.0], t: [0, 0, 0] },
  { p: [0, 0.9, 10.5], t: [0, 0, 0] },
]

export default function CameraRig() {
  const posCurve = useMemo(
    () => new THREE.CatmullRomCurve3(WAYPOINTS.map((w) => new THREE.Vector3(...w.p))),
    [],
  )
  const targetCurve = useMemo(
    () => new THREE.CatmullRomCurve3(WAYPOINTS.map((w) => new THREE.Vector3(...w.t))),
    [],
  )
  const smooth = useRef({
    pos: new THREE.Vector3(...WAYPOINTS[0].p),
    target: new THREE.Vector3(...WAYPOINTS[0].t),
  })
  const mouseSmooth = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const { progress, mouse } = useScrollStore.getState()
    const damp = THREE.MathUtils.damp

    // Damp the cursor first so parallax trails with weight.
    mouseSmooth.current.x = damp(mouseSmooth.current.x, mouse.x, 4, delta)
    mouseSmooth.current.y = damp(mouseSmooth.current.y, mouse.y, 4, delta)
    const { x: mx, y: my } = mouseSmooth.current

    // Sample the cinematic path + look-at for this scroll position.
    const desiredPos = posCurve.getPoint(progress)
    const desiredTarget = targetCurve.getPoint(progress)

    // Mouse parallax layered on top of the scroll path.
    desiredPos.x += mx * 0.4
    desiredPos.y += -my * 0.25
    desiredTarget.x += mx * 0.25
    desiredTarget.y += -my * 0.15

    // Ease current position/target toward the desired values.
    const s = smooth.current
    s.pos.x = damp(s.pos.x, desiredPos.x, 2.2, delta)
    s.pos.y = damp(s.pos.y, desiredPos.y, 2.2, delta)
    s.pos.z = damp(s.pos.z, desiredPos.z, 2.2, delta)
    s.target.x = damp(s.target.x, desiredTarget.x, 2.8, delta)
    s.target.y = damp(s.target.y, desiredTarget.y, 2.8, delta)
    s.target.z = damp(s.target.z, desiredTarget.z, 2.8, delta)

    state.camera.position.copy(s.pos)
    state.camera.lookAt(s.target)
  })

  return null
}
