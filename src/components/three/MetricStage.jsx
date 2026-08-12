import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollStore } from '../../store/scrollStore'
import { fadeWindow } from '../../lib/easing'

// Layered, glowing rings + orbs that the camera looks "down" onto during the
// metrics panel. Adds depth behind the glassmorphism stat cards.
// ---------------------------------------------------------------------------

const RINGS = [
  { r: 1.6, color: '#C8FF3D', tube: 0.012 },
  { r: 2.4, color: '#F4F2EC', tube: 0.008 },
  { r: 3.2, color: '#FF5C35', tube: 0.008 },
]

const ORBS = [
  [0.8, 0.2, 0],
  [-1.1, -0.3, 0.4],
  [0.2, -0.8, -0.6],
  [-0.5, 0.7, 0.8],
]

export default function MetricStage() {
  const group = useRef()
  const ringRefs = useRef([])

  useFrame((state, delta) => {
    const { progress } = useScrollStore.getState()
    const t = state.clock.elapsedTime
    const opacity = fadeWindow(progress, 0.48, 0.58, 0.78, 0.86)

    const g = group.current
    g.visible = opacity > 0.001
    g.traverse((o) => {
      if (o.isMesh) {
        o.material.opacity = opacity
        o.material.transparent = true
      }
    })

    ringRefs.current.forEach((ring, i) => {
      if (!ring) return
      ring.rotation.x += delta * (0.15 + i * 0.05)
      ring.rotation.y += delta * 0.1
    })

    g.position.y = Math.sin(t * 0.3) * 0.1
  })

  return (
    <group ref={group}>
      {RINGS.map((ring, i) => (
        <mesh key={i} ref={(el) => (ringRefs.current[i] = el)} rotation={[0.6, 0, i * 0.4]}>
          <torusGeometry args={[ring.r, ring.tube, 16, 128]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {ORBS.map((p, i) => (
        <mesh key={`orb-${i}`} position={p}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#C8FF3D" emissive="#C8FF3D" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  )
}
