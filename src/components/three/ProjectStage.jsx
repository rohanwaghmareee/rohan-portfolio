import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useScrollStore } from '../../store/scrollStore'
import { fadeWindow } from '../../lib/easing'

// Floating "project cards" rendered in 3D during the work panel.
// They mirror the DOM project cards stylistically, living in the world so
// the camera can dolly past them as the section scrolls.
//
// Each card = a rounded metal slab + a small emissive accent plate. Tune
// `CARDS` (position/rotation/size/colour) to layout your own stage.
// ---------------------------------------------------------------------------

const CARDS = [
  { pos: [-1.7, 0.2, -0.5], rot: [0.1, 0.5, -0.05], size: [1.5, 1.0, 0.08], color: '#232329' },
  { pos: [0.2, -0.35, 0.3], rot: [-0.08, -0.3, 0.06], size: [1.3, 1.6, 0.08], color: '#1c1c20' },
  { pos: [1.8, 0.45, -1.1], rot: [0.15, 0.1, -0.1], size: [1.4, 1.1, 0.08], color: '#25252c' },
  { pos: [-0.3, 0.95, -1.5], rot: [-0.05, 0.4, 0.08], size: [1.2, 0.8, 0.08], color: '#1e1e22' },
]

export default function ProjectStage() {
  const group = useRef()

  useFrame((state, delta) => {
    const { progress } = useScrollStore.getState()
    const t = state.clock.elapsedTime
    const opacity = fadeWindow(progress, 0.18, 0.3, 0.45, 0.53)

    const g = group.current
    g.visible = opacity > 0.001
    g.traverse((o) => {
      if (o.isMesh) {
        o.material.opacity = opacity
        o.material.transparent = true
      }
    })

    // Slow, weightless bob so cards feel alive rather than static props.
    g.rotation.y = Math.sin(t * 0.2) * 0.06
    g.position.y = Math.sin(t * 0.4) * 0.08
  })

  return (
    <group ref={group}>
      {CARDS.map((card, i) => (
        <group key={i} position={card.pos} rotation={card.rot}>
          <RoundedBox args={card.size} radius={0.025} smoothness={4}>
            <meshStandardMaterial color={card.color} metalness={0.7} roughness={0.35} />
          </RoundedBox>
          {/* emissive accent plate on the card face */}
          <mesh position={[0, 0, card.size[2] / 2 + 0.002]}>
            <planeGeometry args={[card.size[0] * 0.55, card.size[1] * 0.16]} />
            <meshStandardMaterial
              color="#C8FF3D"
              emissive="#C8FF3D"
              emissiveIntensity={0.6}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
