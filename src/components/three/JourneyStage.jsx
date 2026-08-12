import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollStore } from '../../store/scrollStore'
import { fadeWindow } from '../../lib/easing'

// ---------------------------------------------------------------------------
// "ABOUT / JOURNEY" stage — a slow-twisting stack of milestone plates with a
// glowing cap. Reads as a growth timeline while the bio copy sits over it.
// Visible only during panel 5 (about), progress ≈ 0.667 → 0.833.
// ---------------------------------------------------------------------------

export default function JourneyStage() {
  const group = useRef()

  useFrame((state, delta) => {
    const { progress } = useScrollStore.getState()
    const t = state.clock.elapsedTime
    const opacity = fadeWindow(progress, 0.65, 0.7, 0.81, 0.85)

    const g = group.current
    g.visible = opacity > 0.001
    g.traverse((o) => {
      if (o.isMesh) {
        o.material.opacity = opacity
        o.material.transparent = true
      }
    })

    g.rotation.y += delta * 0.2
    g.position.y = Math.sin(t * 0.4) * 0.1
  })

  return (
    <group ref={group} rotation={[0.15, 0, 0.1]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, (i - 2.5) * 0.55, 0]} rotation={[0, i * 0.6, 0]}>
          <boxGeometry args={[1.6 - i * 0.12, 0.1, 1.6 - i * 0.12]} />
          <meshStandardMaterial
            color={i % 2 ? '#24242b' : '#1b1b21'}
            metalness={0.7}
            roughness={0.35}
          />
        </mesh>
      ))}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#C8FF3D" emissive="#C8FF3D" emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}
