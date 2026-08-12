import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// "Force field" — two counter-rotating wireframe energy shells that encase
// the whole experience. Additive + very faint, they give the scene a bounded,
// high-tech perimeter without stealing attention from the DOM content.
// ---------------------------------------------------------------------------

export default function ForceField() {
  const outer = useRef()
  const inner = useRef()

  useFrame((_, delta) => {
    outer.current.rotation.y += delta * 0.04
    outer.current.rotation.z += delta * 0.015
    inner.current.rotation.y -= delta * 0.06
    inner.current.rotation.x += delta * 0.025
  })

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[7.2, 1]} />
        <meshBasicMaterial
          color="#3a3a46"
          wireframe
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[5.4, 1]} />
        <meshBasicMaterial
          color="#4D9DE0"
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}