import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useScrollStore } from '../../store/scrollStore'
import { fadeWindow } from '../../lib/easing'

// ---------------------------------------------------------------------------
// "SERVICES" stage — two server-rack towers wired together by a glowing
// beam. The left tower is the frontend face, the right tower the backend
// core; the beam is the API between them.
// Visible only during panel 3 (services), progress ≈ 0.333 → 0.5.
// ---------------------------------------------------------------------------

export default function CapabilityStage() {
  const group = useRef()
  const beam = useRef()

  useFrame((state, delta) => {
    const { progress } = useScrollStore.getState()
    const t = state.clock.elapsedTime
    const opacity = fadeWindow(progress, 0.315, 0.365, 0.475, 0.515)

    const g = group.current
    g.visible = opacity > 0.001
    g.traverse((o) => {
      if (o.isMesh) {
        o.material.opacity = opacity
        o.material.transparent = true
      }
    })

    beam.current.scale.x = 1 + Math.sin(t * 2.2) * 0.08
    g.rotation.y = Math.sin(t * 0.25) * 0.1
    g.position.y = Math.sin(t * 0.4) * 0.08
  })

  return (
    <group ref={group}>
      {/* frontend tower */}
      <group position={[-1.5, 0, 0]}>
        <RoundedBox args={[1.0, 2.3, 1.0]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#1c1c22" metalness={0.8} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.7, 0.51]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="#C8FF3D" emissive="#C8FF3D" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* backend tower */}
      <group position={[1.5, 0, 0]}>
        <RoundedBox args={[1.0, 2.3, 1.0]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#22222a" metalness={0.8} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, -0.7, 0.51]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="#FF5C35" emissive="#FF5C35" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* the API beam between them */}
      <mesh ref={beam} position={[0, 0, 0.52]}>
        <boxGeometry args={[2.2, 0.05, 0.05]} />
        <meshStandardMaterial color="#F4F2EC" emissive="#F4F2EC" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
