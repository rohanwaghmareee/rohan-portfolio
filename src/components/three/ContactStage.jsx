import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollStore } from '../../store/scrollStore'
import { fadeWindow } from '../../lib/easing'

// ---------------------------------------------------------------------------
// "CONTACT" stage — an emissive ring + core that gently pulses behind the
// final CTA. Appears at the very end and never fades out (out-window is set
// beyond 1 so the fade-down never triggers).
// ---------------------------------------------------------------------------

export default function ContactStage() {
  const group = useRef()
  const core = useRef()

  useFrame((state, delta) => {
    const { progress } = useScrollStore.getState()
    const t = state.clock.elapsedTime
    const opacity = fadeWindow(progress, 0.815, 0.87, 2, 3)

    const g = group.current
    g.visible = opacity > 0.001
    g.traverse((o) => {
      if (o.isMesh) {
        o.material.opacity = opacity
        o.material.transparent = true
      }
    })

    core.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.06)
    g.rotation.z += delta * 0.15
  })

  return (
    <group ref={group}>
      <mesh ref={core} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[1.4, 0.05, 16, 128]} />
        <meshStandardMaterial color="#C8FF3D" emissive="#C8FF3D" emissiveIntensity={1.1} />
      </mesh>
      <mesh rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 128]} />
        <meshStandardMaterial color="#F4F2EC" emissive="#F4F2EC" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#141419" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}
