import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '../../store/scrollStore'
import { fadeWindow } from '../../lib/easing'

// Shared material presets — tune these for the whole sculpture at once.
const MATERIALS = {
  metal: { color: '#1b1b1f', metalness: 0.9, roughness: 0.25 },
  wire:  { color: '#3a3a42', metalness: 0.2, roughness: 0.7 },
  accent: { color: '#C8FF3D', metalness: 0.4, roughness: 0.3, emissive: '#C8FF3D', emissiveIntensity: 0.35 },
}

// ---------------------------------------------------------------------------
// Hero centrepiece: a stylized "kinetic engine" built from primitives.
// No external assets → loads instantly and cannot break the build.
//
// It reacts to mouse (core tilt + group sway), breathes on its own clock,
// and fades out as the camera leaves the hero panel.
//
// TO SWAP IN A REAL GLTF MODEL: see components/three/ModelLoader.jsx.
// ---------------------------------------------------------------------------

export default function KineticSculpture() {
  const group = useRef()
  const core = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const satellites = useRef()
  const mouseSmooth = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const { progress, mouse } = useScrollStore.getState()
    const damp = THREE.MathUtils.damp
    const t = state.clock.elapsedTime

    // Fade in immediately, fade out as we leave the hero panel (≈0.12–0.17,
    // hero is panel 0 of 6). The "up" window uses a negative start so the
    // sculpture is at full opacity at progress 0 (page load).
    const opacity = fadeWindow(progress, -0.1, 0, 0.12, 0.17) * 0.96
    const scale = Math.max(opacity * (1 - progress * 0.12), 0.0001)

    group.current.scale.setScalar(scale)
    group.current.traverse((o) => {
      if (o.isMesh) {
        o.material.opacity = opacity
        o.material.transparent = true
      }
    })

    // Damped mouse tracking → weighted parallax.
    mouseSmooth.current.x = damp(mouseSmooth.current.x, mouse.x, 3, delta)
    mouseSmooth.current.y = damp(mouseSmooth.current.y, mouse.y, 3, delta)

    // Core slowly self-rotates + tilts toward the cursor.
    core.current.rotation.y = mouseSmooth.current.x * 0.5 + t * 0.1
    core.current.rotation.x = -mouseSmooth.current.y * 0.35

    // Rings counter-rotate on independent axes for a mechanical feel.
    ringA.current.rotation.z += delta * 0.4
    ringA.current.rotation.x = 1.35 + Math.sin(t * 0.3) * 0.15
    ringB.current.rotation.y += delta * 0.28
    ringB.current.rotation.z = 0.6 + Math.cos(t * 0.4) * 0.2

    // Satellites orbit the core on a tilted plane.
    satellites.current.rotation.y += delta * 0.5

    // Float + sway the whole assembly.
    group.current.position.y = Math.sin(t * 0.5) * 0.12
    group.current.rotation.y = mouseSmooth.current.x * 0.2
  })

  return (
    <group ref={group}>
      {/* ---- core cage --------------------------------------------------- */}
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial {...MATERIALS.metal} flatShading />
        </mesh>
        <mesh scale={1.02}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial {...MATERIALS.wire} wireframe />
        </mesh>
      </group>

      {/* ---- orbit rings -------------------------------------------------- */}
      <mesh ref={ringA}>
        <torusGeometry args={[2.1, 0.03, 16, 128]} />
        <meshStandardMaterial {...MATERIALS.accent} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.7, 0.015, 16, 128]} />
        <meshStandardMaterial {...MATERIALS.wire} />
      </mesh>

      {/* ---- orbiting satellites ----------------------------------------- */}
      <group ref={satellites} rotation={[0.35, 0, 0.1]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.4, 0, Math.sin(angle) * 2.4]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial {...MATERIALS.accent} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
